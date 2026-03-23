import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = params;
    const body = await request.json();
    const { type, switchName, mac, serialNo, port, uplink, sfpCoreSwPort, ipAddress, password } = body;

    if (!type || !["access", "details"].includes(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const device = await prisma.networkDevice.update({
      where: { id },
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
    console.error("Error updating network device:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = params;

    await prisma.networkDevice.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting network device:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}