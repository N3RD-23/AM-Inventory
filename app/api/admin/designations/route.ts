export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function jerr(msg: string, status = 500) {
    return new Response(JSON.stringify({ error: msg }), {
        status,
        headers: { "content-type": "application/json" },
    });
}
async function requireAdmin() {
    const s = await getServerSession(authOptions);
    if (!s || (s.user as any)?.role !== "ADMIN") return jerr("Forbidden", 403);
    return s;
}

export async function GET() {
    const g = await requireAdmin(); if (g instanceof Response) return g;
    const list = await prisma.designation.findMany({ orderBy: { name: "asc" } });
    return Response.json(list);
}

export async function POST(req: Request) {
    const g = await requireAdmin(); if (g instanceof Response) return g;
    const { name } = await req.json();
    if (!name?.trim()) return jerr("Name is required", 400);

    const created = await prisma.designation.create({ data: { name: name.trim() } });
    await prisma.log.create({
        data: { action: "CREATE", entity: "Designation", entityId: created.id, actorEmail: g.user?.email ?? undefined, details: `name=${created.name}` }
    });
    return Response.json({ ok: true, id: created.id });
}

export async function PATCH(req: Request) {
    const g = await requireAdmin(); if (g instanceof Response) return g;
    const { id, name } = await req.json();
    if (!id) return jerr("id is required", 400);
    if (!name?.trim()) return jerr("name is required", 400);

    const updated = await prisma.designation.update({ where: { id }, data: { name: name.trim() } });
    await prisma.log.create({
        data: { action: "UPDATE", entity: "Designation", entityId: updated.id, actorEmail: g.user?.email ?? undefined, details: `name=${updated.name}` }
    });
    return Response.json({ ok: true });
}

export async function DELETE(req: Request) {
    const g = await requireAdmin(); if (g instanceof Response) return g;
    const id = new URL(req.url).searchParams.get("id");
    if (!id) return jerr("id is required", 400);

    // Prevent delete if any staff uses it
    const inUse = await prisma.staff.count({ where: { designationId: id } });
    if (inUse > 0) return jerr("Cannot delete: designation is used by staff", 400);

    const d = await prisma.designation.delete({ where: { id } });
    await prisma.log.create({
        data: { action: "DELETE", entity: "Designation", entityId: id, actorEmail: g.user?.email ?? undefined, details: `name=${d.name}` }
    });
    return Response.json({ ok: true });
}
