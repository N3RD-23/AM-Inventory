"use server";

import { z } from "zod";
import { prisma } from "./prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

const TaskBase = z.object({
    date: z.string().min(1), // ISO date "YYYY-MM-DD" from UI
    roomId: z.string().min(1),
    departmentId: z.string().min(1),
    detail: z.string().min(1),
    issueTypeId: z.string().min(1),
    actionTaken: z.string().min(1),
    statusId: z.string().min(1),
    attendedById: z.string().optional().nullable(),
    approvedById: z.string().optional().nullable(),
    approvedDate: z.string().optional().nullable(), // ISO "YYYY-MM-DD"
});

function atMidnight(dateISO: string) {
    // Interpret as local date from UI, store as Date with midnight
    const d = new Date(dateISO + "T00:00:00");
    return d;
}

async function log(actorEmail: string, action: string, entityId: string, diff?: any) {
    try {
        await prisma.log.create({
            data: {
                actorEmail,
                action,
                entity: "TaskLog",
                entityId,
                diff: diff ? JSON.stringify(diff) : null,
            },
        });
    } catch { }
}

export async function createTask(raw: unknown) {
    const session = await getServerSession(authOptions);
    const actorEmail = session?.user?.email ?? "system@local";
    const role = (session?.user as any)?.role as "ADMIN" | "TECH" | undefined;
    if (!role) throw new Error("Unauthorized");

    const input = TaskBase.parse(raw);

    // Business constraints:
    // - attendedBy must belong to IT department (if present)
    // - approvedBy must be IT Manager or Asst Manager (and IT dept) (if present)
    const itDept = await prisma.department.findFirst({ where: { name: { equals: "IT" } } });

    if (input.attendedById) {
        const s = await prisma.staff.findUnique({
            where: { id: input.attendedById },
            select: { departmentId: true },
        });
        if (!s || !itDept || s.departmentId !== itDept.id) {
            throw new Error("Attended By must be from IT department");
        }
    }

    if (input.approvedById) {
        const approver = await prisma.staff.findUnique({
            where: { id: input.approvedById },
            select: {
                departmentId: true,
                designation: { select: { name: true } },
            },
        });
        const okDesignation =
            approver?.designation?.name === "IT Manager" ||
            approver?.designation?.name === "Asst Manager";
        if (!approver || !itDept || approver.departmentId !== itDept.id || !okDesignation) {
            throw new Error("Approved By must be IT Manager or Asst Manager (IT department)");
        }
    }

    const created = await prisma.taskLog.create({
        data: {
            date: atMidnight(input.date),
            roomId: input.roomId,
            departmentId: input.departmentId,
            detail: input.detail,
            issueTypeId: input.issueTypeId,
            actionTaken: input.actionTaken,
            statusId: input.statusId,
            attendedById: input.attendedById ?? null,
            approvedById: input.approvedById ?? null,
            approvedDate: input.approvedDate ? atMidnight(input.approvedDate) : null,
            createdByEmail: actorEmail,
        },
        include: {
            room: true, department: true, issueType: true, status: true,
            attendedBy: true, approvedBy: true,
        },
    });

    await log(actorEmail, "CREATE", created.id, { new: created });
    return created;
}

export async function updateTask(id: string, raw: unknown) {
    const session = await getServerSession(authOptions);
    const actorEmail = session?.user?.email ?? "system@local";
    const role = (session?.user as any)?.role as "ADMIN" | "TECH" | undefined;
    if (!role) throw new Error("Unauthorized");

    const input = TaskBase.partial().parse(raw);

    const itDept = await prisma.department.findFirst({ where: { name: { equals: "IT" } } });

    if (input.attendedById) {
        const s = await prisma.staff.findUnique({ where: { id: input.attendedById }, select: { departmentId: true } });
        if (!s || !itDept || s.departmentId !== itDept.id) {
            throw new Error("Attended By must be from IT department");
        }
    }

    if (input.approvedById) {
        const approver = await prisma.staff.findUnique({
            where: { id: input.approvedById },
            select: { departmentId: true, designation: { select: { name: true } } },
        });
        const okDesignation =
            approver?.designation?.name === "IT Manager" ||
            approver?.designation?.name === "Asst Manager";
        if (!approver || !itDept || approver.departmentId !== itDept.id || !okDesignation) {
            throw new Error("Approved By must be IT Manager or Asst Manager (IT department)");
        }
    }

    const prev = await prisma.taskLog.findUnique({ where: { id } });
    if (!prev) throw new Error("Task not found");

    const updated = await prisma.taskLog.update({
        where: { id },
        data: {
            ...(input.date ? { date: atMidnight(input.date) } : {}),
            ...(input.roomId ? { roomId: input.roomId } : {}),
            ...(input.departmentId ? { departmentId: input.departmentId } : {}),
            ...(input.detail ? { detail: input.detail } : {}),
            ...(input.issueTypeId ? { issueTypeId: input.issueTypeId } : {}),
            ...(input.actionTaken ? { actionTaken: input.actionTaken } : {}),
            ...(input.statusId ? { statusId: input.statusId } : {}),
            ...(input.attendedById !== undefined ? { attendedById: input.attendedById ?? null } : {}),
            ...(input.approvedById !== undefined ? { approvedById: input.approvedById ?? null } : {}),
            ...(input.approvedDate !== undefined ? { approvedDate: input.approvedDate ? atMidnight(input.approvedDate) : null } : {}),
        },
    });

    await log(actorEmail, "UPDATE", id, { before: prev, after: updated });
    return updated;
}
