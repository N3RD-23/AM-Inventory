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

// POST { ids: string[] }
export async function POST(req: Request) {
    const user = await requireUser();
    if (!user) return jsonError("Unauthorized", 401);

    const body = await req.json().catch(() => null);
    if (!body || !Array.isArray(body.ids) || body.ids.length === 0) return jsonError("ids[] is required", 400);

    const ids: string[] = body.ids;

    try {
        await prisma.$transaction(async (tx) => {
            // remove custom values first (if your FK uses different name, adjust here)
            await tx.customValue.deleteMany({ where: { assetId: { in: ids } } }).catch(() => { });

            // delete assets
            await tx.asset.deleteMany({ where: { id: { in: ids } } });

            // logs (one bulk + individual entries)
            const rows = ids.map((id) => ({
                action: "DELETE",
                entity: "Asset",
                entityId: id,
                actorEmail: user.email,
                details: null as string | null,
            }));
            if (rows.length) await tx.log.createMany({ data: rows });

            await tx.log.create({
                data: {
                    action: "BULK_DELETE",
                    entity: "Asset",
                    entityId: "bulk",
                    actorEmail: user.email,
                    details: `deleted=${ids.length}`,
                },
            });
        }, { timeout: 20000, maxWait: 5000 });

        return json({ ok: true, deleted: ids.length });
    } catch (e: any) {
        return jsonError(e?.message ?? "Failed to delete assets", 500);
    }
}
