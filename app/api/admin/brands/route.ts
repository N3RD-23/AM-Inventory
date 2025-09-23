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
  const list = await prisma.brand.findMany({ orderBy: { name: "asc" } });
  return Response.json(list);
}


export async function POST(req: Request) {
  const s = await guard();
  const body = await req.json();
  const b = await prisma.brand.create({ data: { name: body.name } });
  await prisma.log.create({ data: { action: "CREATE", entity: "Brand", entityId: b.id, actorEmail: s.user?.email ?? undefined } });
  return Response.json({ ok: true });
}


export async function PATCH(req: Request) {
  const s = await guard();
  const body = await req.json();
  const b = await prisma.brand.update({ where: { id: body.id }, data: { name: body.name } });
  await prisma.log.create({ data: { action: "UPDATE", entity: "Brand", entityId: b.id, actorEmail: s.user?.email ?? undefined, details: JSON.stringify({ name: body.name }) } });
  return Response.json({ ok: true });
}


export async function DELETE(req: Request) {
  const s = await guard();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id")!;
  await prisma.brand.delete({ where: { id } });
  await prisma.log.create({ data: { action: "DELETE", entity: "Brand", entityId: id, actorEmail: s.user?.email ?? undefined } });
  return Response.json({ ok: true });
}