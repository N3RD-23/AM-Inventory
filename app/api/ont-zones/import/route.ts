import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const zone = formData.get("zone") as string;

    if (!file || !zone) {
      return NextResponse.json({ error: "Invalid file or missing zone" }, { status: 400 });
    }

    const text = await file.text();
    const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length < 2) {
      return NextResponse.json({ error: "CSV must have header + at least one row" }, { status: 400 });
    }

    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/\s+/g, ""));
    const required = ["room", "fsanno", "mac", "serialno"];
    if (!required.every((key) => headers.includes(key))) {
      return NextResponse.json({ error: `CSV headers must include room, fsan no, mac, serial no` }, { status: 400 });
    }

    const records: any[] = [];
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",").map((c) => c.trim());
      if (row.length !== headers.length) continue;
      const obj: any = { zone };
      for (let j = 0; j < headers.length; j++) {
        const key = headers[j];
        const value = row[j];
        if (key === "room") obj.room = value;
        else if (key === "fsanno") obj.fsanNo = value;
        else if (key === "mac") obj.mac = value;
        else if (key === "serialno") obj.serialNo = value;
        // Always assign card zone to imported records as context zone
        // so the row is visible on the currently selected ONT zone page.
        obj.zone = zone;
      }
      records.push(obj);
    }

    const result = await prisma.ontZone.createMany({ data: records });

    return NextResponse.json({ message: `Imported ${result.count} entries`, count: result.count });
  } catch (error) {
    console.error("ONT import error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
