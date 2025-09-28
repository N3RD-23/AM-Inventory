// app/api/logs/export/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";

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

// fields we *want* to export (we’ll intersect with what exists)
const DESIRED_FIELDS = ["id", "action", "entity", "entityId", "actorEmail", "details"] as const;

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

async function pickLogsDelegate() {
    const keys = Object.keys(prisma as any).filter(
        (k) => typeof (prisma as any)[k]?.findMany === "function"
    );
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

    let best:
        | {
            name: string;
            client: AnyClient;
            count: number;
            sample: any | null;
            keys: string[];
            score: number;
            dateField?: string;
            searchFields: string[];
        }
        | undefined;

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
            const score =
                DESIRED_FIELDS.filter((f) => keys.includes(f)).length * 2 +
                searchFields.length +
                (dateField ? 2 : 0);

            const cand = { name, client, count, sample, keys, score, dateField, searchFields };
            if (!best || cand.score > best.score || (cand.score === best.score && cand.count > best.count)) {
                best = cand;
            }
        } catch {
            // ignore bad candidates
        }
    }
    if (!best) throw new Error("No logs-like Prisma delegates found.");
    return best;
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const format = (searchParams.get("format") ?? "csv").toLowerCase();
    const q = searchParams.get("q") ?? "";
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const picked = await pickLogsDelegate();
    const { client, name: modelName, keys: available, dateField, searchFields } = picked;

    const orderByField = dateField ?? (available.includes("createdAt") ? "createdAt" : undefined);

    // where (only on existing fields)
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

    // select only existing fields (avoid Prisma validation errors)
    const select: Record<string, true> = {};
    for (const f of DESIRED_FIELDS) if (available.includes(f)) select[f] = true;
    if (orderByField && !select[orderByField]) select[orderByField] = true;
    if (!select.id && available.includes("id")) select.id = true;

    // pull rows (cap high for export)
    const rows = await client.findMany({
        where,
        ...(orderByField ? { orderBy: { [orderByField]: "desc" } } : {}),
        take: 10000,
        select,
    });

    // normalize + map to export columns in the order you want
    const records = rows.map((r: any) => {
        const created = orderByField && r[orderByField] ? new Date(r[orderByField]) : undefined;
        const fmt = created && !isNaN(created.getTime()) ? created.toISOString() : "";

        const val = (x: any) =>
            x == null ? "" : typeof x === "object" ? JSON.stringify(x) : String(x);

        return {
            Time: fmt,
            Action: val(r.action),
            Entity: val(r.entity),
            "Entity ID": val(r.entityId), // will be "" if not present on model
            "Actor Email": val(r.actorEmail),
            ID: val(r.id),
            Details: val(r.details),
        };
    });

    // Always build with XLSX so CSV & XLSX stay consistent
    const ws = XLSX.utils.json_to_sheet(records, {
        header: ["Time", "Action", "Entity", "Entity ID", "Actor Email", "ID", "Details"],
        skipHeader: false,
    });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Logs");

    if (format === "xlsx") {
        const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
        return new NextResponse(buf, {
            headers: {
                "Content-Type":
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "Content-Disposition": `attachment; filename="logs.xlsx"`,
            },
        });
    }

    // CSV
    const csv = XLSX.utils.sheet_to_csv(ws);
    return new NextResponse(csv, {
        headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="logs.csv"`,
        },
    });
}
