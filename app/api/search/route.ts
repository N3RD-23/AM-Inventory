// app/api/search/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function bad(msg: string, status = 400) {
    return new Response(JSON.stringify({ error: msg }), {
        status,
        headers: { "content-type": "application/json" },
    });
}

// normalize
function normalizeId(s: string) {
    return s.replace(/[^a-zA-Z0-9]/g, "");
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return bad("Unauthorized", 401);
        const role = (session.user as any)?.role as "ADMIN" | "TECH" | undefined;

        const { searchParams } = new URL(req.url);
        const raw = (searchParams.get("q") || "").trim();
        if (!raw) return bad("q is required");

        const q = raw;
        const qNorm = normalizeId(raw);

        // ---------- STAFF ----------
        const staff = await prisma.staff.findMany({
            where: {
                OR: [
                    { firstName: { contains: q } },
                    { lastName: { contains: q } },
                    { staffCode: { contains: q } },
                    ...(qNorm !== q ? [{ staffCode: { contains: qNorm } }] : []),
                ],
            },
            take: 20,
            include: {
                designation: { select: { id: true, name: true } },
                department: { select: { id: true, name: true } },
            },
        });

        const staffIds = staff.map((s) => s.id);

        const staffAssetsRaw = staffIds.length
            ? await prisma.asset.findMany({
                where: { staffId: { in: staffIds } },
                orderBy: { updatedAt: "desc" },
                include: { brand: true, location: true },
            })
            : [];

        const staffAssets: Record<string, any[]> = {};
        for (const a of staffAssetsRaw) {
            const key = a.staffId ?? "unknown";
            (staffAssets[key] ||= []).push({
                id: a.id,
                tag: a.tag,
                model: a.model,
                category: a.category,
                status: a.status,
                brand: a.brand?.name ?? null,
                location: a.location?.name ?? null,
                updatedAt: a.updatedAt,
            });
        }

        // ---------- USERS (ADMIN only) ----------
        let users: Array<{ id: string; email: string; name?: string | null; role?: string | null }> = [];
        let userLogs: Record<string, any[]> | undefined;

        if (role === "ADMIN") {
            users = await prisma.user.findMany({
                where: {
                    OR: [{ email: { contains: q } }, { name: { contains: q } }],
                },
                take: 20,
                select: { id: true, email: true, name: true, role: true },
            });

            const emails = users.map((u) => u.email).filter(Boolean) as string[];
            if (emails.length) {
                const logs = await prisma.log.findMany({
                    where: { actorEmail: { in: emails } },
                    orderBy: { createdAt: "desc" },
                    take: 100,
                });
                userLogs = {};
                for (const l of logs) {
                    const key = l.actorEmail ?? "unknown";
                    (userLogs[key] ||= []).push({
                        id: l.id,
                        action: l.action,
                        entity: l.entity,
                        entityId: l.entityId,
                        details: l.details,
                        createdAt: l.createdAt,
                    });
                }
            }
        }

        return Response.json({
            q,
            role,
            staff: staff.map((s) => ({
                id: s.id,
                firstName: s.firstName,
                lastName: s.lastName,
                staffCode: s.staffCode,
                designation: s.designation,
                department: s.department,
                assetCount: staffAssets[s.id]?.length ?? 0,
            })),
            staffAssets,
            users,
            userLogs,
        });
    } catch (err: any) {
        console.error("[/api/search] error:", err);
        return new Response(
            JSON.stringify({ error: "Search failed", detail: String(err?.message ?? err) }),
            { status: 500, headers: { "content-type": "application/json" } }
        );
    }
}
