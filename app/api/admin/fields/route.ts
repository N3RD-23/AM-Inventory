import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


async function guard() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") throw new Error("Forbidden");
  return session;
}


export async function POST(req: Request) {
  const s = await guard();
  const body = await req.json();
  const f = await prisma.customField.create({ data: { name: body.name, type: body.type, category: body.category } });
  await prisma.log.create({ data: { action: "CREATE", entity: "CustomField", entityId: f.id, actorEmail: s.user?.email ?? undefined } });
  return Response.json({ ok: true });
}


export async function PATCH(req: Request) {
  const s = await guard();
  const body = await req.json();
  const f = await prisma.customField.update({ where: { id: body.id }, data: { name: body.name, type: body.type, category: body.category } });
  await prisma.log.create({ data: { action: "UPDATE", entity: "CustomField", entityId: f.id, actorEmail: s.user?.email ?? undefined, details: JSON.stringify({ name: body.name, type: body.type, category: body.category }) } });
  return Response.json({ ok: true });
}


export async function DELETE(req: Request) {
  const s = await guard();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id")!;
  await prisma.customValue.deleteMany({ where: { fieldId: id } });
  await prisma.customField.delete({ where: { id } });
  await prisma.log.create({ data: { action: "DELETE", entity: "CustomField", entityId: id, actorEmail: s.user?.email ?? undefined } });
  return Response.json({ ok: true });
}