export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function json(data: any, status = 200) {
    return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });
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

export async function GET(_: Request, { params }: { params: { id: string } }) {
    const u = await requireUser();
    if (!u) return jsonError("Unauthorized", 401);

    const events = await prisma.log.findMany({
        where: { entity: "Asset", entityId: params.id },
        orderBy: { createdAt: "asc" },
        select: { id: true, action: true, details: true, actorEmail: true, createdAt: true },
    });

    return json({ events });
}
