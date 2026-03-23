import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function guard() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return null;
  }
  return session;
}

export async function GET(request: NextRequest) {
  const session = await guard();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const zone = searchParams.get("zone");

  // For SQLite / your current Prisma client, `mode` may not be supported on string filters.
  // Use plain contains and normalize the input fallback if needed at the caller side.
  const normalizedZone = zone?.trim();
  const where = normalizedZone ? { zone: { equals: normalizedZone } } : {};
  const items = await prisma.ontZone.findMany({ where, orderBy: [{ zone: "asc" }, { room: "asc" }] });

  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const session = await guard();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const body = await request.json();
  const { room, fsanNo, mac, serialNo, zone } = body;

  if (!room || !fsanNo || !mac || !serialNo || !zone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const item = await prisma.ontZone.create({ data: { room, fsanNo, mac, serialNo, zone } });
  return NextResponse.json(item);
}

export async function PUT(request: NextRequest) {
  const session = await guard();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const body = await request.json();
  const { id, room, fsanNo, mac, serialNo, zone } = body;

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const item = await prisma.ontZone.update({ where: { id }, data: { room, fsanNo, mac, serialNo, zone } });
  return NextResponse.json(item);
}

export async function DELETE(request: NextRequest) {
  const session = await guard();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await prisma.ontZone.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
