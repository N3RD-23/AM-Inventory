export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

function jsonError(msg: string, status = 500) {
    return new Response(JSON.stringify({ error: msg }), {
        status,
        headers: { "content-type": "application/json" },
    });
}

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const q = (url.searchParams.get("q") ?? "").trim();
        const take = Math.min(Number(url.searchParams.get("take") ?? 50), 200);

        // Find the IT department (best-effort)
        const itDept = await prisma.department.findFirst({
            where: {
                OR: [
                    { name: "IT" },
                    { name: "Information Technology" },
                    { name: { contains: "IT" } }, // SQLite LIKE is ok
                ],
            },
            select: { id: true },
        });

        if (!itDept) return Response.json([]); // nothing to show if we can't resolve IT

        const where: any = { departmentId: itDept.id };

        if (q) {
            where.OR = [
                { firstName: { contains: q } },
                { lastName: { contains: q } },
                { staffCode: { contains: q } },
            ];
        }

        const rows = await prisma.staff.findMany({
            where,
            select: { id: true, firstName: true, lastName: true, staffCode: true },
            orderBy: [{ firstName: "asc" }, { lastName: "asc" }],
            take,
        });

        const out = rows.map((s) => ({
            id: s.id,
            name: [s.firstName, s.lastName].filter(Boolean).join(" "),
            staffCode: s.staffCode ?? null,
        }));

        return Response.json(out);
    } catch (e: any) {
        return jsonError(e?.message ?? "Failed to search IT staff", 500);
    }
}
