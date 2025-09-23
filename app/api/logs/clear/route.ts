// app/api/logs/clear/route.ts
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

async function requireAdminEmail() {
    const session = await getServerSession(authOptions);
    if (!session) throw json({ error: "Unauthorized" }, 401);
    const role = (session.user as any)?.role;
    if (role !== "ADMIN") throw json({ error: "Forbidden" }, 403);
    return session.user?.email ?? null;
}

/**
 * POST /api/logs/clear
 * Optional filters (either in JSON body or query string):
 *  - q: string
 *  - from: YYYY-MM-DD
 *  - to:   YYYY-MM-DD
 */
export async function POST(req: Request) {
    try {
        await requireAdminEmail();

        const url = new URL(req.url);
        let body: any = {};
        try { body = await req.json(); } catch { /* no body */ }

        const q = (body.q ?? url.searchParams.get("q") ?? "").trim();
        const from = (body.from ?? url.searchParams.get("from")) || "";
        const to = (body.to ?? url.searchParams.get("to")) || "";

        const where: any = {};
        if (q) {
            where.OR = [
                { action: { contains: q } },
                { entity: { contains: q } },
                { entityId: { contains: q } },
                { actorEmail: { contains: q } },
                { details: { contains: q } },
            ];
        }
        if (from || to) {
            where.createdAt = {};
            if (from) where.createdAt.gte = new Date(`${from}T00:00:00.000Z`);
            if (to) where.createdAt.lte = new Date(`${to}T23:59:59.999Z`);
        }

        const count = await prisma.log.count({ where });
        const res = await prisma.log.deleteMany({ where });
        
        // keep an audit on the logs cleared
        const actorEmail = await requireAdminEmail();
        await prisma.log.create({
          data: {
            action: "CLEAR_LOGS",
            entity: "LOG",
            entityId: "-",
            actorEmail,
            details: `Deleted ${count} log entries`,
          },
        });

        return json({ ok: true, deleted: res.count, matched: count });
    } catch (e: any) {
        if (e instanceof Response) return e;
        console.error("[/api/logs/clear] error:", e);
        return json({ error: "Failed to clear logs", detail: String(e?.message ?? e) }, 500);
    }
}
