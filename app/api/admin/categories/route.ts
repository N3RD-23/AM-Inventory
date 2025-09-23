// app/api/admin/categories/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function jsonError(message: string, status = 500) {
    return new Response(JSON.stringify({ error: message }), {
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
    const list = await prisma.category.findMany({ orderBy: { name: "asc" } });
    return Response.json(list);
}

// Body: { name: string; code?: string }
export async function POST(req: Request) {
    const g = await requireAdmin(); if (g instanceof Response) return g;
    const { name, code } = await req.json();
    if (!name?.trim()) return jsonError("Name is required", 400);

    const created = await prisma.category.create({ data: { name: name.trim(), code: code?.trim() || null } });
    await prisma.log.create({
        data: { action: "CREATE", entity: "Category", entityId: created.id, actorEmail: g.user?.email ?? undefined, details: `name=${created.name}, code=${created.code ?? ""}` },
    });
    return Response.json({ ok: true, id: created.id });
}

// Body: { id: string; name: string; code?: string }
export async function PATCH(req: Request) {
    const g = await requireAdmin(); if (g instanceof Response) return g;
    const { id, name, code } = await req.json();
    if (!id) return jsonError("id is required", 400);
    if (!name?.trim()) return jsonError("name is required", 400);

    const updated = await prisma.category.update({ where: { id }, data: { name: name.trim(), code: code?.trim() || null } });
    await prisma.log.create({
        data: { action: "UPDATE", entity: "Category", entityId: updated.id, actorEmail: g.user?.email ?? undefined, details: `name=${updated.name}, code=${updated.code ?? ""}` },
    });
    return Response.json({ ok: true });
}

// DELETE /api/admin/categories?id=...
export async function DELETE(req: Request) {
    const g = await requireAdmin(); if (g instanceof Response) return g;
    const id = new URL(req.url).searchParams.get("id");
    if (!id) return jsonError("id is required", 400);

    const deleted = await prisma.category.delete({ where: { id } });
    await prisma.log.create({
        data: { action: "DELETE", entity: "Category", entityId: id, actorEmail: g.user?.email ?? undefined, details: `name=${deleted.name}` },
    });
    return Response.json({ ok: true });
}
