// app/api/logs/export/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import * as XLSX from "xlsx";

function bad(msg: string, status = 400) {
    return new Response(JSON.stringify({ error: msg }), {
        status,
        headers: { "content-type": "application/json" },
    });
}

function toCsv(rows: any[], cols: string[]) {
    const esc = (v: any) => {
        if (v === null || v === undefined) return "";
        const s = String(v);
        return /[,"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    return [cols.join(","), ...rows.map(r => cols.map(c => esc(r[c])).join(","))].join("\n");
}

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return bad("Unauthorized", 401);

    const { searchParams } = new URL(req.url);
    const format = (searchParams.get("format") || "csv").toLowerCase(); // csv | xlsx
    const q = (searchParams.get("q") || "").trim();
    const from = searchParams.get("from"); // YYYY-MM-DD
    const to = searchParams.get("to");     // YYYY-MM-DD

    const where: any = {};
    if (q) {
        where.OR = [
            { action: { contains: q } },
            { entity: { contains: q } },
            { entityId: { contains: q } },
            { actorEmail: { contains: q } },
            { details: { contains: q } },
        ];
    }
    if (from || to) {
        where.createdAt = {};
        if (from) where.createdAt.gte = new Date(`${from}T00:00:00.000Z`);
        if (to) where.createdAt.lte = new Date(`${to}T23:59:59.999Z`);
    }

    const logs = await prisma.log.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: 5000, // safety cap; adjust as needed
    });

    const rows = logs.map(l => ({
        createdAt: l.createdAt.toISOString(),
        action: l.action,
        entity: l.entity,
        entityId: l.entityId,
        actorEmail: l.actorEmail ?? "",
        details: l.details ?? "",
    }));

    if (format === "xlsx") {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(rows);
        XLSX.utils.book_append_sheet(wb, ws, "Logs");
        const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
        return new Response(buf, {
            status: 200,
            headers: {
                "content-type":
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "content-disposition": `attachment; filename="logs.xlsx"`,
            },
        });
    }

    // default CSV
    const csv = toCsv(rows, ["createdAt", "action", "entity", "entityId", "actorEmail", "details"]);
    return new Response(csv, {
        status: 200,
        headers: {
            "content-type": "text/csv; charset=utf-8",
            "content-disposition": `attachment; filename="logs.csv"`,
        },
    });
}
