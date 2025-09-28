export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

function jsonError(msg: string, status = 500) {
    return new Response(JSON.stringify({ error: msg }), {
        status,
        headers: { "content-type": "application/json" },
    });
}

export async function GET() {
    const list = await prisma.department.findMany({
        orderBy: { name: "asc" },
        select: { id: true, name: true },
    });
    return Response.json(list);
}
