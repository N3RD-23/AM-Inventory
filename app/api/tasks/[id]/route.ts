export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function json(data: any, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "content-type": "application/json" },
    });
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

async function resolveITDeptId() {
    const it = await prisma.department.findFirst({
        where: {
            OR: [
                { name: "IT" },
                { name: "Information Technology" },
                { name: { contains: "IT" } },
            ],
        },
        select: { id: true },
    });
    return it?.id ?? null;
}

async function resolveAssignedStatusId(actorEmail: string | null) {
    const existing = await prisma.status.findFirst({
        where: { OR: [{ name: "Assigned" }, { name: "ASSIGNED" }, { name: "assigned" }] },
        select: { id: true },
    });
    if (existing?.id) return existing.id;

    const created = await prisma.status.create({ data: { name: "Assigned" } });
    await prisma.log.create({
        data: {
            action: "CREATE",
            entity: "Status",
            entityId: created.id,
            actorEmail: actorEmail ?? undefined,
            details: "auto-created default status Assigned",
        },
    }).catch(() => { });
    return created.id;
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

// ---------- GET /api/tasks/[id] ----------
export async function GET(_: Request, { params }: { params: { id: string } }) {
    const user = await requireUser();
    if (!user) return jsonError("Unauthorized", 401);

    const row = await prisma.taskLog.findUnique({
        where: { id: params.id },
        include: {
            room: true,
            department: true,
            issueType: true,
            status: true,
            outlet: true,
            attendedBy: true,
            approvedBy: true,
        },
    });
    if (!row) return jsonError("Not found", 404);
    return json(row);
}

// ---------- PATCH /api/tasks/[id] ----------
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const user = await requireUser();
    if (!user) return jsonError("Unauthorized", 401);

    const body = await req.json().catch(() => null);
    if (!body) return jsonError("Invalid JSON", 400);

    let {
        approvedDate,
        roomId,
        departmentId,
        outletId,
        issueTypeId,
        statusId,
        detail,
        actionTaken,
        attendedById,
        approvedById,
        issueCategory,
    } = body as Record<string, any>;

    const normalizedCategory =
        issueCategory === "Add/Replace"
            ? "Add/Replace"
            : issueCategory === "TroubleShoot"
                ? "TroubleShoot"
                : undefined;

    const existing = await prisma.taskLog.findUnique({
        where: { id: params.id },
        select: {
            id: true,
            approvedById: true,
            attendedById: true,
            actionTaken: true,
            status: { select: { id: true, name: true } },
            issueCategory: true,
        },
    });
    if (!existing) return jsonError("Not found", 404);

    // FK checks (only if provided)
    if (roomId) {
        const ok = await prisma.room.findUnique({ where: { id: roomId } });
        if (!ok) return jsonError("roomId not found", 404);
    }
    if (departmentId) {
        const ok = await prisma.department.findUnique({ where: { id: departmentId } });
        if (!ok) return jsonError("departmentId not found", 404);
    }
    if (outletId) {
        const ok = await prisma.outlet.findUnique({ where: { id: outletId } });
        if (!ok) return jsonError("outletId not found", 404);
    }
    if (issueTypeId) {
        const ok = await prisma.issueType.findUnique({ where: { id: issueTypeId } });
        if (!ok) return jsonError("issueTypeId not found", 404);
    }

    // AttendedBy must be IT (if provided and not null)
    if (attendedById !== undefined && attendedById !== null) {
        const itDeptId = await resolveITDeptId();
        const staff = await prisma.staff.findUnique({
            where: { id: attendedById },
            select: { id: true, departmentId: true },
        });
        if (!staff) return jsonError("attendedById not found", 404);
        if (itDeptId && staff.departmentId !== itDeptId)
            return jsonError("attendedBy must belong to IT department", 400);
    }

    // ApprovedBy must be IT Manager / Asst Manager in IT (if provided)
    if (approvedById !== undefined && approvedById !== null) {
        const itDeptId = await resolveITDeptId();
        const approver = await prisma.staff.findUnique({
            where: { id: approvedById },
            select: { id: true, departmentId: true, designation: { select: { name: true } } },
        });
        if (!approver) return jsonError("approvedById not found", 404);
        const title = approver.designation?.name ?? "";
        const okTitle =
            title === "IT Manager" || title === "Asst Manager" || title === "Assistant Manager";
        if (!okTitle) return jsonError("approvedBy must be IT Manager or Asst Manager", 400);
        if (itDeptId && approver.departmentId !== itDeptId)
            return jsonError("approvedBy must belong to IT department", 400);
    }

    // Cannot approve until SAVED actionTaken exists
    if (approvedById !== undefined && approvedById !== null) {
        const savedAction = (existing.actionTaken ?? "").trim();
        if (!savedAction)
            return jsonError("Add and save Action Taken before selecting an approver.", 400);
    }

    // If actionTaken is being set -> require status 'Assigned' AND attendedBy present
    if (actionTaken !== undefined) {
        const resultingStatusId = statusId ?? existing.status.id;
        const resulting = await prisma.status.findUnique({
            where: { id: resultingStatusId },
            select: { name: true },
        });
        const resultingName = resulting?.name?.toLowerCase() ?? "";
        const hasAttender =
            (attendedById !== undefined ? attendedById : existing.attendedById) ?? null;
        if (!(hasAttender && resultingName === "assigned")) {
            return jsonError(
                "actionTaken can be set only when status is 'Assigned' and Attended By is selected.",
                400
            );
        }
    }

    // If attempting to close, enforce approval ONLY for Add/Replace
    if (statusId) {
        const closedStatus = await prisma.status.findFirst({
            where: { OR: [{ name: "Closed" }, { name: "CLOSED" }, { name: "closed" }] },
            select: { id: true },
        });
        if (closedStatus?.id === statusId) {
            const effectiveCategory =
                normalizedCategory ?? (existing.issueCategory as "TroubleShoot" | "Add/Replace" | null);
            const effectiveApprover = approvedById ?? existing.approvedById;
            if (effectiveCategory === "Add/Replace" && !effectiveApprover) {
                return jsonError("Approval required to close Add/Replace tasks", 400);
            }
        }
    }

    // ---------- Build update payload ----------
    const data: any = {
        roomId,
        departmentId,
        outletId,
        issueTypeId,
        detail,
        actionTaken,
        statusId,
    };

    // Attended By rules (NULL -> NEW, set -> ASSIGNED if not already)
    if (attendedById !== undefined) {
        if (attendedById === null) {
            data.attendedById = null;
            data.statusId = await resolveNewStatusId(user.email);
        } else {
            data.attendedById = attendedById;
            let resultingStatusName = existing.status.name?.toLowerCase() ?? "";
            if (statusId && statusId !== existing.status.id) {
                const st = await prisma.status.findUnique({
                    where: { id: statusId },
                    select: { name: true },
                });
                resultingStatusName = st?.name?.toLowerCase() ?? resultingStatusName;
            }
            if (resultingStatusName !== "assigned") {
                data.statusId = await resolveAssignedStatusId(user.email);
            }
        }
    }

    // Approver + approvedDate auto
    if (approvedById !== undefined) {
        data.approvedById = approvedById;
        if (approvedById === null) {
            data.approvedDate = null;
        } else {
            const changed = existing.approvedById !== approvedById;
            if (changed) {
                data.approvedDate = new Date();
            } else if (approvedDate) {
                data.approvedDate = new Date(`${approvedDate}T00:00:00`);
            }
        }
    } else if (approvedDate) {
        data.approvedDate = new Date(`${approvedDate}T00:00:00`);
    }

    // Issue category update
    if (normalizedCategory) data.issueCategory = normalizedCategory;

    // ----- Closed date logic -----
    // Compute target status name (after this update)
    let targetStatusName = existing.status.name ?? "";
    if (data.statusId && data.statusId !== existing.status.id) {
        const st = await prisma.status.findUnique({
            where: { id: data.statusId },
            select: { name: true },
        });
        targetStatusName = st?.name ?? targetStatusName;
    }
    const wasClosed = (existing.status.name ?? "").toLowerCase() === "closed";
    const willBeClosed = (targetStatusName ?? "").toLowerCase() === "closed";
    if (willBeClosed && !wasClosed) {
        data.closedDate = new Date();
    } else if (!willBeClosed && wasClosed) {
        // if re-opening, clear closedDate
        data.closedDate = null;
    }

    const updated = await prisma.taskLog.update({
        where: { id: params.id },
        data,
        include: {
            room: true,
            department: true,
            issueType: true,
            status: true,
            outlet: true,
            attendedBy: true,
            approvedBy: true,
        },
    });

    await prisma.log.create({
        data: {
            action: "UPDATE",
            entity: "TaskLog",
            entityId: updated.id,
            actorEmail: user.email,
            details: `statusId=${statusId ?? ""}; approvedById=${approvedById ?? ""}; attendedById=${attendedById ?? ""
                }; issueCategory=${normalizedCategory ?? ""}`,
        },
    }).catch(() => { });
    return json(updated);
}

// ---------- DELETE /api/tasks/[id] ----------
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const user = await requireUser();
    if (!user) return jsonError("Unauthorized", 401);

    await prisma.taskLog.delete({ where: { id: params.id } }).catch(() => null);
    await prisma.log.create({
        data: {
            action: "DELETE",
            entity: "TaskLog",
            entityId: params.id,
            actorEmail: user.email,
            details: null,
        },
    }).catch(() => { });
    return json({ ok: true });
}
