export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

export async function GET() {
    const list = await prisma.category.findMany({
        orderBy: { name: "asc" },
        select: { id: true, name: true, code: true },
    });
    return Response.json(list);
}