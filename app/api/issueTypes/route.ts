export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

function jsonError(msg: string, status = 500) {
    return new Response(JSON.stringify({ error: msg }), {
        status,
        headers: { "content-type": "application/json" },
    });
}

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const q = (url.searchParams.get("q") ?? "").trim();
        const take = Math.min(Number(url.searchParams.get("take") ?? 50), 200);

        if (!q) return Response.json([]);

        const rows = await prisma.issueType.findMany({
            where: { name: { contains: q } },
            orderBy: { name: "asc" },
            take,
            select: { id: true, name: true },
        });

        return Response.json(rows);
    } catch (e: any) {
        return jsonError(e?.message ?? "Failed to search issue types", 500);
    }
}
