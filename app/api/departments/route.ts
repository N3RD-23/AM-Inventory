export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function json(data: any, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "content-type": "application/json" },
    });
}
function jsonError(msg: string, status = 400) {
    return json({ error: msg }, status);
}

async function requireUser() {
    const session = await getServerSession(authOptions);
    const role = (session?.user as any)?.role as "ADMIN" | "TECH" | undefined;
    if (!session || !role) return null;
    return { email: session.user?.email ?? "system@local", role };
}

export async function GET(req: Request) {
    // Require signed-in user (ADMIN or TECH)
    const user = await requireUser();
    if (!user) return jsonError("Unauthorized", 401);

    const sp = new URL(req.url).searchParams;
    const q = (sp.get("q") ?? "").trim();

    // IMPORTANT: if there's no keyword, return nothing (prevents dumping full list)
    if (!q) return json([]);

    // Filter by keyword; case-insensitive WITHOUT using `mode`
    // (avoids Prisma `mode` error on older clients/SQLite)
    const rows = await prisma.department.findMany({
        where: { name: { contains: q } },
        orderBy: { name: "asc" },
        take: 50,
        select: { id: true, name: true },
    });

    return json(rows);
}
