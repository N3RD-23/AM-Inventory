// app/api/inventory/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

function json(data: any, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "content-type": "application/json" },
    });
}
function jsonError(msg: string, status = 400) {
    return json({ error: msg }, status);
}

// GET /api/inventory?q=...
// Returns a summary list grouped by (category, model)
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const q = (searchParams.get("q") ?? "").trim();

        // Filter by category/model/tag (string columns on Asset)
        const where =
            q.length > 0
                ? {
                    OR: [
                        { category: { contains: q } },
                        { model: { contains: q } },
                        { tag: { contains: q } },
                    ],
                }
                : undefined;

        const rows = await prisma.asset.findMany({
            where,
            select: {
                id: true,
                category: true,
                model: true,
                status: true,
                staffId: true,
            },
            orderBy: [{ category: "asc" }, { model: "asc" }],
        });

        // group & count
        type Summary = {
            key: string;
            category: string;
            model: string;
            total: number;
            assigned: number;
            unassigned: number;
            inStock: number;
            damaged: number;
        };

        const map = new Map<string, Summary>();
        for (const a of rows) {
            const category = a.category ?? "Unknown";
            const model = a.model ?? "";
            const key = `${category}|||${model}`;
            const entry =
                map.get(key) ??
                {
                    key,
                    category,
                    model,
                    total: 0,
                    assigned: 0,
                    unassigned: 0,
                    inStock: 0,
                    damaged: 0,
                };

            entry.total += 1;

            // assignment
            if (a.staffId) entry.assigned += 1;
            else entry.unassigned += 1;

            // status buckets (case-insensitive)
            const st = (a.status ?? "").toLowerCase();
            if (["in stock", "stock", "available"].includes(st)) entry.inStock += 1;
            if (["damaged", "unusable", "scrap", "broken"].includes(st))
                entry.damaged += 1;

            map.set(key, entry);
        }

        const list = Array.from(map.values()).sort(
            (a, b) =>
                a.category.localeCompare(b.category) ||
                a.model.localeCompare(b.model)
        );

        return json(list);
    } catch (e: any) {
        return jsonError(e?.message ?? "Failed to load inventory", 500);
    }
}
