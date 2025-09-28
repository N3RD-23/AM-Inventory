// app/api/logs/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type AnyClient = {
    findMany: (args?: any) => Promise<any[]>;
    findFirst: (args?: any) => Promise<any | null>;
    count: (args?: any) => Promise<number>;
};

const DATE_FIELDS = [
    "createdAt",
    "timestamp",
    "ts",
    "date",
    "time",
    "loggedAt",
    "occurredAt",
    "at",
    "when",
];

// the columns you want to see (we'll intersect with what's available)
const DESIRED_FIELDS = [
    "id",
    "action",
    "entity",
    "entityId",
    "actorEmail",
    "details",
] as const;

const SEARCH_PREF = [
    "action",
    "entity",
    "entityId",
    "actorEmail",
    "details",
    "message",
    "category",
    "actorName",
    "ip",
    "before",
    "after",
];

function parseYmd(s?: string | null): Date | undefined {
    if (!s) return undefined;
    const d = new Date(`${s}T00:00:00Z`);
    return isNaN(d.getTime()) ? undefined : d;
}

async function enumerateDelegates() {
    const keys = Object.keys(prisma as any).filter(
        (k) => typeof (prisma as any)[k]?.findMany === "function"
    );
    // prefer likely names first
    const preferred = [
        "auditLog",
        "log",
        "logs",
        "auditTrail",
        "systemLog",
        "activityLog",
        "historyLog",
        "changeLog",
    ];
    const dynamic = keys
        .filter((k) => !preferred.includes(k))
        .filter((k) => /log|audit|history|activity/i.test(k));
    const ordered = [...preferred, ...dynamic].filter((k) => keys.includes(k));

    const candidates: Array<{
        name: string;
        client: AnyClient;
        count: number;
        sample: any | null;
        keys: string[];
        score: number; // how well it matches the columns we expect
        dateField?: string;
        searchFields: string[];
    }> = [];

    for (const name of ordered) {
        const client = (prisma as any)[name] as AnyClient;
        try {
            const [count, sample] = await Promise.all([
                client.count({}),
                client.findFirst({ orderBy: { id: "asc" } }).catch(() => null),
            ]);
            const keys = sample ? Object.keys(sample) : [];

            const dateField = DATE_FIELDS.find((f) => keys.includes(f));
            const searchFields = SEARCH_PREF.filter((f) => keys.includes(f));

            // score by how many desired/search/date fields are present
            const score =
                DESIRED_FIELDS.filter((f) => keys.includes(f)).length * 2 +
                searchFields.length +
                (dateField ? 2 : 0);

            candidates.push({
                name,
                client,
                count,
                sample,
                keys,
                score,
                dateField,
                searchFields,
            });
        } catch {
            // ignore broken delegate
        }
    }

    if (!candidates.length) {
        throw new Error("No logs-like Prisma delegates found on prisma client.");
    }

    // choose highest score; tie-breaker by count
    candidates.sort((a, b) => b.score - a.score || b.count - a.count);
    return candidates[0];
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") ?? "";
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const take = Math.min(Math.max(1, Number(searchParams.get("take") ?? "10")), 200);
    const skip = (page - 1) * take;

    const picked = await enumerateDelegates();
    const { client, name: modelName, keys: available, dateField, searchFields } = picked;

    // safe date field
    const orderByField = dateField ?? (available.includes("createdAt") ? "createdAt" : undefined);

    // build where safely (use only existing fields)
    const where: any = {};
    const fromD = parseYmd(from);
    const toD = parseYmd(to);
    if (orderByField && (fromD || toD)) {
        where[orderByField] = {};
        if (fromD) where[orderByField].gte = fromD;
        if (toD) {
            const end = new Date(toD);
            end.setUTCHours(23, 59, 59, 999);
            where[orderByField].lte = end;
        }
    }

    const qTrim = q.trim();
    if (qTrim && searchFields.length) {
        const tokens = qTrim.split(/\s+/).filter(Boolean);
        if (tokens.length) {
            where.AND = tokens.map((t) => ({
                OR: searchFields.map((f) => ({ [f]: { contains: t } })),
            }));
        }
    }

    // select only fields that exist to avoid Prisma validation errors
    const select: Record<string, true> = {};
    for (const f of DESIRED_FIELDS) {
        if (available.includes(f)) select[f] = true;
    }
    if (orderByField && !select[orderByField]) select[orderByField] = true;
    if (!select.id && available.includes("id")) select.id = true;

    let items: any[] = [];
    let total = 0;

    try {
        [items, total] = await Promise.all([
            client.findMany({
                where,
                ...(orderByField ? { orderBy: { [orderByField]: "desc" } } : {}),
                skip,
                take,
                select,
            }),
            client.count({ where }),
        ]);
    } catch {
        // retry without select/order just in case
        [items, total] = await Promise.all([
            client.findMany({ where, skip, take }),
            client.count({ where }),
        ]);
    }

    // normalize date field to "createdAt" for the UI
    const normalized = items.map((row: any) => {
        if (orderByField && row[orderByField] && !row.createdAt) {
            return { ...row, createdAt: row[orderByField] };
        }
        return row;
    });

    return NextResponse.json({
        items: normalized,
        page,
        take,
        total,
        pages: Math.ceil(total / take),
        __debug: {
            modelName,
            orderByField: orderByField ?? null,
            selected: Object.keys(select),
            searchFields,
            received: { q, from, to },
        },
    });
}
