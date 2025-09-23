import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    const role = (session?.user as any)?.role as "ADMIN" | "TECH" | undefined;
    const actorEmail = session?.user?.email ?? "system@local";
    if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await req.json();
    if (!body?.name?.trim()) return NextResponse.json({ error: "Name required" }, { status: 400 });

    const before = await prisma.outlet.findUnique({ where: { id: params.id } });
    if (!before) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const updated = await prisma.outlet.update({ where: { id: params.id }, data: { name: body.name.trim() } });
    await prisma.log.create({
        data: { actorEmail, action: "UPDATE", entity: "Outlet", entityId: updated.id, diff: JSON.stringify({ before, after: updated }) },
    });
    return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    const role = (session?.user as any)?.role as "ADMIN" | "TECH" | undefined;
    const actorEmail = session?.user?.email ?? "system@local";
    if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const used = await prisma.taskLog.count({ where: { outletId: params.id } });
    if (used > 0) {
        return NextResponse.json(
            { error: "Outlet is used by task logs. Reassign or remove references before deletion." },
            { status: 400 }
        );
    }

    await prisma.outlet.delete({ where: { id: params.id } });
    await prisma.log.create({
        data: { actorEmail, action: "DELETE", entity: "Outlet", entityId: params.id, diff: null },
    });
    return NextResponse.json({ ok: true });
}
