import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


async function guard() {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") throw new Error("Forbidden");
    return session;
}


export async function GET() {
    await guard();
    const list = await prisma.department.findMany({ orderBy: { name: "asc" } });
    return Response.json(list);
}


export async function POST(req: Request) {
    const s = await guard();
    const body = await req.json();
    const r = await prisma.department.create({ data: { name: body.name } });
    await prisma.log.create({ data: { action: "CREATE", entity: "Department", entityId: r.id, actorEmail: s.user?.email ?? undefined } });
    return Response.json({ ok: true });
}


export async function PATCH(req: Request) {
    const s = await guard();
    const body = await req.json();
    const r = await prisma.department.update({ where: { id: body.id }, data: { name: body.name } });
    await prisma.log.create({ data: { action: "UPDATE", entity: "Department", entityId: r.id, actorEmail: s.user?.email ?? undefined } });
    return Response.json({ ok: true });
}


export async function DELETE(req: Request) {
    const s = await guard();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id")!;
    await prisma.asset.updateMany({ where: { departmentId: id }, data: { departmentId: null } });
    const deleted = await prisma.department.delete({ where: { id } });
    await prisma.log.create({ data: { action: "DELETE", entity: "Department", entityId: id, actorEmail: s.user?.email ?? undefined, details: `name=${deleted.name}` } });
    return Response.json({ ok: true });
}