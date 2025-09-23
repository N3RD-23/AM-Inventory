export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

export async function GET() {
    const list = await prisma.staff.findMany({
        orderBy: [{ firstName: "asc" }, { lastName: "asc" }],
        select: {
            id: true,
            staffCode: true,
            firstName: true,
            lastName: true,
            designation: { select: { id: true, name: true } },
            department: { select: { id: true, name: true } },
        },
    });

    return Response.json(
        list.map(s => ({
            ...s,
            displayName: `${s.firstName} ${s.lastName}`.trim(),
        }))
    );
}