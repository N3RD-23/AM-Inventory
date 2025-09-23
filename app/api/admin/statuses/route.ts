export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function jsonError(msg: string, status = 500) {
    return new Response(JSON.stringify({ error: msg }), {
        status,
        headers: { "content-type": "application/json" },
    });
}

async function requireAdmin() {
    const session = await getServerSession(authOptions);
    const role = (session?.user as any)?.role;
    if (!session || role !== "ADMIN") return jsonError("Forbidden", 403);
    return session;
}

export async function GET() {
    const g = await requireAdmin(); if (g instanceof Response) return g;
    const list = await prisma.status.findMany({ orderBy: { name: "asc" } });
    return Response.json(list);
}

export async function POST(req: Request) {
    const g = await requireAdmin(); if (g instanceof Response) return g;
    const { name } = await req.json();
    if (!name?.trim()) return jsonError("Name is required", 400);
    const created = await prisma.status.create({ data: { name: name.trim() } });
    await prisma.log.create({ data: { action: "CREATE", entity: "Status", entityId: created.id, actorEmail: g.user?.email ?? undefined, details: `name=${name}` } });
    return Response.json({ ok: true, id: created.id });
}

export async function PATCH(req: Request) {
    const g = await requireAdmin(); if (g instanceof Response) return g;
    const { id, name } = await req.json();
    if (!id) return jsonError("id is required", 400);
    if (!name?.trim()) return jsonError("name is required", 400);
    const updated = await prisma.status.update({ where: { id }, data: { name: name.trim() } });
    await prisma.log.create({ data: { action: "UPDATE", entity: "Status", entityId: updated.id, actorEmail: g.user?.email ?? undefined, details: `name=${name}` } });
    return Response.json({ ok: true });
}

export async function DELETE(req: Request) {
    const g = await requireAdmin(); if (g instanceof Response) return g;
    const id = new URL(req.url).searchParams.get("id");
    if (!id) return jsonError("id is required", 400);
    const deleted = await prisma.status.delete({ where: { id } });
    await prisma.log.create({ data: { action: "DELETE", entity: "Status", entityId: id, actorEmail: g.user?.email ?? undefined, details: `name=${deleted.name}` } });
    return Response.json({ ok: true });
}
