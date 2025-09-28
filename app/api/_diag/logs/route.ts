export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const delegates = Object.keys(prisma as any).filter(
        (k) => typeof (prisma as any)[k]?.findMany === "function"
    );

    const looksLikeLogs = delegates.filter((k) => /log|audit|history|activity/i.test(k));

    const report: any[] = [];
    for (const name of looksLikeLogs) {
        const client = (prisma as any)[name];
        try {
            const total = await client.count({});
            const sample = await client.findFirst({ orderBy: { id: "asc" } }).catch(() => null);
            report.push({
                name,
                total,
                sampleKeys: sample ? Object.keys(sample) : [],
                sample,
            });
        } catch (e: any) {
            report.push({
                name,
                error: String(e?.message || e),
            });
        }
    }

    return NextResponse.json({
        delegatesTested: looksLikeLogs,
        report,
        note:
            looksLikeLogs.length === 0
                ? "No delegates matched /log|audit|history|activity/i. If your model is named differently, tell me the model name."
                : "Check which delegate has the expected count and fields.",
    });
}
