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

async function requireAdmin() {
    const session = await getServerSession(authOptions);
    const role = (session?.user as any)?.role as "ADMIN" | "TECH" | undefined;
    if (!session || role !== "ADMIN") return jsonError("Forbidden", 403);
    return session;
}

// ---------- GET /api/admin/staff ----------
// Supports ?q= filtering on first/last name, staffCode, department, designation
export async function GET(req: Request) {
    const g = await requireAdmin(); if (g instanceof Response) return g;

    const sp = new URL(req.url).searchParams;
    const q = (sp.get("q") ?? "").trim();

    const where: any = q
        ? {
            OR: [
                { firstName: { contains: q } },
                { lastName: { contains: q } },
                { staffCode: { contains: q } },
                { department: { name: { contains: q } } },
                { designation: { name: { contains: q } } },
            ],
        }
        : {};

    const list = await prisma.staff.findMany({
        where,
        include: { department: true, designation: true },
        orderBy: [{ firstName: "asc" }, { lastName: "asc" }, { staffCode: "asc" }], // ✅ no "name"
        take: 500,
    });

    // shape: include derived "name" for convenience in UIs
    const data = list.map((s) => ({
        id: s.id,
        staffCode: s.staffCode,
        firstName: s.firstName ?? "",
        lastName: s.lastName ?? "",
        name: [s.firstName, s.lastName].filter(Boolean).join(" ").trim() || s.staffCode,
        department: s.department ? { id: s.department.id, name: s.department.name } : null,
        designation: s.designation ? { id: s.designation.id, name: s.designation.name } : null,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
    }));

    return json(data);
}

// ---------- POST /api/admin/staff ----------
// Accepts either {firstName,lastName} or {name}; staffCode required
export async function POST(req: Request) {
    const g = await requireAdmin(); if (g instanceof Response) return g;
    const body = await req.json().catch(() => null);
    if (!body) return jsonError("Invalid JSON", 400);

    let { firstName, lastName, name, staffCode, departmentId, designationId } = body as Record<string, any>;

    if (!staffCode?.trim()) return jsonError("staffCode is required", 400);

    if ((!firstName && !lastName) && name?.trim()) {
        const parts = name.trim().split(/\s+/);
        firstName = parts.shift() ?? "";
        lastName = parts.join(" ") || null;
    }

    try {
        const created = await prisma.staff.create({
            data: {
                staffCode: staffCode.trim(),
                firstName: firstName?.trim() || null,
                lastName: lastName?.trim() || null,
                departmentId: departmentId || null,
                designationId: designationId || null,
            },
        });

        await prisma.log.create({
            data: {
                action: "CREATE",
                entity: "Staff",
                entityId: created.id,
                actorEmail: g.user?.email ?? undefined,
                details: `staffCode=${staffCode}`,
            },
        }).catch(() => { });

        return json({ ok: true, id: created.id });
    } catch (e: any) {
        // Unique constraint on staffCode
        if (e?.code === "P2002") return jsonError("staffCode already exists", 409);
        return jsonError(e?.message ?? "Create failed", 500);
    }
}

// ---------- PATCH /api/admin/staff ----------
export async function PATCH(req: Request) {
    const g = await requireAdmin(); if (g instanceof Response) return g;
    const body = await req.json().catch(() => null);
    if (!body) return jsonError("Invalid JSON", 400);

    const { id } = body as Record<string, any>;
    if (!id) return jsonError("id is required", 400);

    // Accept partial updates
    let { firstName, lastName, name, staffCode, departmentId, designationId } = body as Record<string, any>;
    if ((!firstName && !lastName) && name?.trim()) {
        const parts = name.trim().split(/\s+/);
        firstName = parts.shift() ?? "";
        lastName = parts.join(" ") || null;
    }

    try {
        const updated = await prisma.staff.update({
            where: { id },
            data: {
                staffCode: staffCode?.trim(),
                firstName: firstName?.trim() ?? undefined,
                lastName: lastName?.trim() ?? undefined,
                departmentId: departmentId === undefined ? undefined : (departmentId || null),
                designationId: designationId === undefined ? undefined : (designationId || null),
            },
            select: { id: true },
        });

        await prisma.log.create({
            data: {
                action: "UPDATE",
                entity: "Staff",
                entityId: updated.id,
                actorEmail: g.user?.email ?? undefined,
                details: `staffCode=${staffCode ?? ""}`,
            },
        }).catch(() => { });
        return json({ ok: true });
    } catch (e: any) {
        if (e?.code === "P2002") return jsonError("staffCode already exists", 409);
        return jsonError(e?.message ?? "Update failed", 500);
    }
}

// ---------- DELETE /api/admin/staff?id=... ----------
export async function DELETE(req: Request) {
    const g = await requireAdmin(); if (g instanceof Response) return g;

    const id = new URL(req.url).searchParams.get("id");
    if (!id) return jsonError("id is required", 400);

    try {
        const deleted = await prisma.staff.delete({ where: { id } });
        await prisma.log.create({
            data: {
                action: "DELETE",
                entity: "Staff",
                entityId: id,
                actorEmail: g.user?.email ?? undefined,
                details: `staffCode=${deleted.staffCode}`,
            },
        }).catch(() => { });
        return json({ ok: true });
    } catch (e: any) {
        return jsonError(e?.message ?? "Delete failed", 500);
    }
}
