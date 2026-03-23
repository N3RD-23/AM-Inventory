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
    const type = formData.get("type") as string;

    if (!file || !type || !["access", "details"].includes(type)) {
      return NextResponse.json({ error: "Invalid file or type" }, { status: 400 });
    }

    // Read file content
    const text = await file.text();
    const lines = text.split('\n').filter(line => line.trim());

    if (lines.length < 2) {
      return NextResponse.json({ error: "CSV file must have at least a header row and one data row" }, { status: 400 });
    }

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const normalize = (value: string) => value.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
    const canonicalHeaders = headers.map(normalize);
    const dataRows = lines.slice(1);

    // Define expected headers based on type
    const accessHeaders = ['switch', 'mac', 'serial no', 'port', 'uplink', 'sfp core sw port', 'ip address', 'password'];
    const detailsHeaders = ['switch', 'mac', 'serial no', 'port', 'ip address', 'password'];

    const expectedHeaders = type === "access" ? accessHeaders : detailsHeaders;

    // Validate headers (case-insensitive partial match)
    const normalizedExpected = expectedHeaders.map(normalize);
    const hasRequiredHeaders = normalizedExpected.every(expected =>
      canonicalHeaders.some(h => h === expected || h.includes(expected) || expected.includes(h))
    );

    if (!hasRequiredHeaders) {
      return NextResponse.json({
        error: `CSV headers don't match expected format for ${type} devices. Expected: ${expectedHeaders.join(', ')}`
      }, { status: 400 });
    }

    const devices = [];
    const errors = [];

    for (let i = 0; i < dataRows.length; i++) {
      const row = dataRows[i];
      const values = row.split(',').map(v => v.trim());

      if (values.length !== headers.length) {
        errors.push(`Row ${i + 2}: Column count mismatch`);
        continue;
      }

      // Map CSV columns to database fields
      const deviceData: any = { type };

      headers.forEach((header, index) => {
        const value = values[index];
        if (value) {
          if (header.includes('switch')) deviceData.switchName = value;
          else if (header.includes('mac')) deviceData.mac = value;
          else if (header.includes('serial')) deviceData.serialNo = value;
          else if (header.includes('port') && !header.includes('sfp')) deviceData.port = value;
          else if (header.includes('uplink')) deviceData.uplink = value;
          else if (header.includes('sfp')) deviceData.sfpCoreSwPort = value;
          else if (header.includes('ip')) deviceData.ipAddress = value;
          else if (header.includes('password')) deviceData.password = value;
        }
      });

      devices.push(deviceData);
    }

    if (errors.length > 0) {
      return NextResponse.json({
        error: `Validation errors: ${errors.join('; ')}`
      }, { status: 400 });
    }

    // Insert devices in batch
    const result = await prisma.networkDevice.createMany({
      data: devices,
    });

    return NextResponse.json({
      message: `Successfully imported ${result.count} ${type} devices`,
      count: result.count
    });

  } catch (error) {
    console.error("Error importing CSV:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}