import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
    const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";
    const items = await prisma.outlet.findMany({
        where: q ? { name: { contains: q } } : undefined,
        orderBy: { name: "asc" },
        take: 200,
    });
    return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const role = (session?.user as any)?.role as "ADMIN" | "TECH" | undefined;
    const actorEmail = session?.user?.email ?? "system@local";
    if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { name } = await req.json();
    if (!name?.trim()) return NextResponse.json({ error: "Name required" }, { status: 400 });

    const created = await prisma.outlet.create({ data: { name: name.trim() } });
    await prisma.log.create({
        data: { actorEmail, action: "CREATE", entity: "Outlet", entityId: created.id, diff: JSON.stringify({ new: created }) },
    });
    return NextResponse.json(created);
}
