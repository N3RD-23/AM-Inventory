import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // "access" or "details"

    const devices = await prisma.networkDevice.findMany({
      where: type ? { type } : {},
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(devices);
  } catch (error) {
    console.error("Error fetching network devices:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { type, switchName, mac, serialNo, port, uplink, sfpCoreSwPort, ipAddress, password } = body;

    if (!type || !["access", "details"].includes(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const device = await prisma.networkDevice.create({
      data: {
        type,
        switchName,
        mac,
        serialNo,
        port,
        uplink,
        sfpCoreSwPort,
        ipAddress,
        password,
      },
    });

    return NextResponse.json(device);
  } catch (error) {
    console.error("Error creating network device:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}