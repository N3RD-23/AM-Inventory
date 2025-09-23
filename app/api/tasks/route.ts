export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function json(data: any, status = 200) {
    return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });
}
function jsonError(msg: string, status = 400) {
    return json({ error: msg }, status);
}

async function requireUser() {
    const session = await getServerSession(authOptions);
    const role = (session?.user as any)?.role as "ADMIN" | "TECH" | undefined;
    if (!session || !role) return null;
    return { email: session.user?.email ?? "system@local", role };
}

async function resolveNewStatusId(actorEmail: string | null) {
    const existing = await prisma.status.findFirst({
        where: { OR: [{ name: "NEW" }, { name: "New" }, { name: "new" }] },
        select: { id: true },
    });
    if (existing?.id) return existing.id;

    const created = await prisma.status.create({ data: { name: "NEW" } });
    await prisma.log.create({
        data: {
            action: "CREATE",
            entity: "Status",
            entityId: created.id,
            actorEmail: actorEmail ?? undefined,
            details: "auto-created default status NEW",
        },
    }).catch(() => { });
    return created.id;
}

export async function GET(req: Request) {
    const sp = new URL(req.url).searchParams;
    const q = (sp.get("q") ?? "").trim();

    const where: any = {};
    if (q) {
        const or: any[] = [
            { detail: { contains: q } },
            { actionTaken: { contains: q } },
            { room: { name: { contains: q } } },
            { department: { name: { contains: q } } },
            { outlet: { name: { contains: q } } },
            { issueType: { name: { contains: q } } },
            { status: { name: { contains: q } } },
            // Staff names / codes
            { attendedBy: { OR: [{ firstName: { contains: q } }, { lastName: { contains: q } }, { staffCode: { contains: q } }] } },
            { approvedBy: { OR: [{ firstName: { contains: q } }, { lastName: { contains: q } }, { staffCode: { contains: q } }] } },
        ];

        if (/^\d{4}-\d{2}-\d{2}$/.test(q)) {
            const start = new Date(`${q}T00:00:00`);
            const end = new Date(start);
            end.setDate(end.getDate() + 1);
            or.push({ date: { gte: start, lt: end } });
            or.push({ approvedDate: { gte: start, lt: end } });
        }

        where.OR = or;
    }

    const rows = await prisma.taskLog.findMany({
        where,
        orderBy: { date: "desc" },
        include: {
            room: true,
            department: true,
            issueType: true,
            status: true,
            outlet: true,
            attendedBy: true,
            approvedBy: true,
        },
        take: 500,
    });
    return json(rows);
}

export async function POST(req: Request) {
    const user = await requireUser();
    if (!user) return jsonError("Unauthorized", 401);

    const body = await req.json().catch(() => null);
    if (!body) return jsonError("Invalid JSON body", 400);

    const {
        date,
        roomId,
        departmentId,
        outletId,
        issueTypeId,
        detail,
        actionTaken,
        attendedById,
    } = body as Record<string, any>;

    let issueCategory: "TroubleShoot" | "Add/Replace" =
        body.issueCategory === "Add/Replace" ? "Add/Replace" : "TroubleShoot";

    if (!detail?.trim()) return jsonError("detail is required");
    if (!departmentId && !outletId) return jsonError("either departmentId or outletId is required");

    if (roomId) {
        const ok = await prisma.room.findUnique({ where: { id: roomId }, select: { id: true } });
        if (!ok) return jsonError("roomId not found", 404);
    }
    if (departmentId) {
        const ok = await prisma.department.findUnique({ where: { id: departmentId }, select: { id: true } });
        if (!ok) return jsonError("departmentId not found", 404);
    }
    if (outletId) {
        const ok = await prisma.outlet.findUnique({ where: { id: outletId }, select: { id: true } });
        if (!ok) return jsonError("outletId not found", 404);
    }
    if (issueTypeId) {
        const ok = await prisma.issueType.findUnique({ where: { id: issueTypeId }, select: { id: true } });
        if (!ok) return jsonError("issueTypeId not found", 404);
    }

    if (attendedById) return jsonError("attendedBy must be selected after creation", 400);
    if (actionTaken) return jsonError("actionTaken can be set only after status is Assigned and Attended By is selected", 400);

    const statusId = await resolveNewStatusId(user.email);

    let createdAt = new Date();
    if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
        createdAt = new Date(`${date}T00:00:00`);
    }

    const data: any = {
        date: createdAt,
        detail: detail.trim(),
        statusId,
        createdByEmail: user.email,
        actionTaken: "",
        approvedById: null,
        approvedDate: null,
        attendedById: null,
        issueCategory,
        ...(roomId ? { roomId } : {}),
        ...(departmentId ? { departmentId } : {}),
        ...(outletId ? { outletId } : {}),
        ...(issueTypeId ? { issueTypeId } : {}),
    };

    const created = await prisma.taskLog.create({ data });

    await prisma.log.create({
        data: { action: "CREATE", entity: "TaskLog", entityId: created.id, actorEmail: user.email, details: `task created (date=${createdAt.toISOString()})` },
    }).catch(() => { });
    return json({ ok: true, id: created.id });
}
