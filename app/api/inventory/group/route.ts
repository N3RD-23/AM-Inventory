export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

function json(data: any, status = 200) {
    return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });
}
function jsonError(msg: string, status = 400) {
    return json({ error: msg }, status);
}

// GET /api/inventory/group?category=...&model=...
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category") ?? "";
        const model = searchParams.get("model") ?? "";

        if (!category) return jsonError("category is required", 400);

        const where: any = { category };
        if (model) where.model = model;

        const rows = await prisma.asset.findMany({
            where,
            select: {
                id: true,
                tag: true,
                status: true,
                staff: { select: { firstName: true, lastName: true, staffCode: true } },
                department: { select: { name: true } },
                location: { select: { name: true } },
            },
            orderBy: [{ tag: "asc" }],
        });

        return json(rows);
    } catch (e: any) {
        return jsonError(e?.message ?? "Failed to load group", 500);
    }
}
