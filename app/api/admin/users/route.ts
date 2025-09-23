import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";


async function guard() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") throw new Error("Forbidden");
  return session;
}


export async function GET() {
  await guard();
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json(users.map(u => ({ id: u.id, email: u.email, name: u.name, role: u.role })));
}


export async function POST(req: Request) {
  const s = await guard();
  const body = await req.json();
  const passwordHash = await bcrypt.hash(body.password, 10);
  const u = await prisma.user.create({ data: { email: body.email, name: body.name, role: body.role, passwordHash } });
  await prisma.log.create({ data: { action: "CREATE", entity: "User", entityId: u.id, actorEmail: s.user?.email ?? undefined } });
  return Response.json({ ok: true });
}


export async function PATCH(req: Request) {
  const s = await guard();
  const body = await req.json();
  let data: any = { email: body.email, name: body.name, role: body.role };
  if (body.password && body.password.length > 0) {
    data.passwordHash = await bcrypt.hash(body.password, 10);
  }
  const u = await prisma.user.update({ where: { id: body.id }, data });
  await prisma.log.create({ data: { action: "UPDATE", entity: "User", entityId: u.id, actorEmail: s.user?.email ?? undefined, details: JSON.stringify({ email: body.email, name: body.name, role: body.role, pw: !!body.password }) } });
  return Response.json({ ok: true });
}


export async function DELETE(req: Request) {
  const s = await guard();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id")!;
  await prisma.user.delete({ where: { id } });
  await prisma.log.create({ data: { action: "DELETE", entity: "User", entityId: id, actorEmail: s.user?.email ?? undefined } });
  return Response.json({ ok: true });
}