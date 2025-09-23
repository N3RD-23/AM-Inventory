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
  const list = await prisma.location.findMany({ orderBy: { name: "asc" } });
  return Response.json(list);
}


export async function POST(req: Request) {
  const s = await guard();
  const body = await req.json();
  const l = await prisma.location.create({ data: { name: body.name, address: body.address ?? null } });
  await prisma.log.create({ data: { action: "CREATE", entity: "Location", entityId: l.id, actorEmail: s.user?.email ?? undefined } });
  return Response.json({ ok: true });
}


export async function PATCH(req: Request) {
  const s = await guard();
  const body = await req.json();
  const l = await prisma.location.update({ where: { id: body.id }, data: { name: body.name, address: body.address ?? null } });
  await prisma.log.create({ data: { action: "UPDATE", entity: "Location", entityId: l.id, actorEmail: s.user?.email ?? undefined, details: JSON.stringify({ name: body.name, address: body.address }) } });
  return Response.json({ ok: true });
}


export async function DELETE(req: Request) {
  const s = await guard();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id")!;
  await prisma.location.delete({ where: { id } });
  await prisma.log.create({ data: { action: "DELETE", entity: "Location", entityId: id, actorEmail: s.user?.email ?? undefined } });
  return Response.json({ ok: true });
}