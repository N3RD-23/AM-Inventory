// app/api/inventory/add/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/* -------------------------- utils -------------------------- */
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

// read a value from the `custom` object, trying common casings/labels
function readCustom(custom: Record<string, any>, labels: string[], fallback = ""): string {
    for (const label of labels) {
        if (custom[label] != null) return String(custom[label]);
        const hit = Object.keys(custom).find((k) => k.toLowerCase() === label.toLowerCase());
        if (hit) return String(custom[hit]);
    }
    return fallback;
}

/* -------------------------- POST /api/inventory/add -------------------------- */
export async function POST(req: Request) {
    const user = await requireUser();
    if (!user) return jsonError("Unauthorized", 401);

    const body = await req.json().catch(() => null);
    if (!body) return jsonError("Invalid JSON", 400);

    const {
        date,
        count,
        stockLocationId,
        assignedDepartmentId,
        assignedDate,
        assignedStaffId,
        categoryId,
        custom = {},
    } = body as {
        date?: string;
        count?: number;
        stockLocationId?: string | null;
        assignedDepartmentId?: string | null;
        assignedDate?: string | null;
        assignedStaffId?: string | null;
        categoryId: string;
        custom?: Record<string, any>;
    };

    if (!categoryId) return jsonError("categoryId is required", 400);
    const qty = Number.isFinite(Number(count)) && Number(count) > 0 ? Number(count) : 1;

    // Validate FKs if provided
    async function ensureExists<T extends "location" | "department" | "staff" | "category">(t: T, id?: string | null) {
        if (!id) return;
        if (t === "location") {
            if (!(await prisma.location.findUnique({ where: { id } }))) throw new Error("Invalid stockLocationId");
        }
        if (t === "department") {
            if (!(await prisma.department.findUnique({ where: { id } }))) throw new Error("Invalid assignedDepartmentId");
        }
        if (t === "staff") {
            if (!(await prisma.staff.findUnique({ where: { id } }))) throw new Error("Invalid assignedStaffId");
        }
        if (t === "category") {
            if (!(await prisma.category.findUnique({ where: { id } }))) throw new Error("Invalid categoryId");
        }
    }

    try {
        await ensureExists("category", categoryId);
        await ensureExists("location", stockLocationId ?? null);
        await ensureExists("department", assignedDepartmentId ?? null);
        await ensureExists("staff", assignedStaffId ?? null);
    } catch (e: any) {
        return jsonError(e?.message ?? "Validation failed", 400);
    }

    // Single interactive transaction, longer timeout
    const createdAssets = await prisma.$transaction(
        async (tx) => {
            // Resolve Category (NAME used for Asset.category + tag prefix and for CustomField lookup)
            const category = await tx.category.findUnique({
                where: { id: categoryId },
                select: { id: true, name: true },
            });
            if (!category?.name) throw new Error("Category not found");

            const prefix = category.name.toUpperCase();

            // Custom fields for this category (string column 'category' on CustomField)
            const customFields = await tx.customField.findMany({
                where: { category: category.name },
                select: { id: true, name: true },
            });

            // Ensure counter exists, then bump by qty
            const existing = await tx.categoryCounter.findUnique({
                where: { category: prefix },
                select: { counter: true },
            });
            if (!existing) {
                await tx.categoryCounter.create({ data: { category: prefix, counter: 0 } });
            }
            const bumped = await tx.categoryCounter.update({
                where: { category: prefix },
                data: { counter: { increment: qty } },
                select: { counter: true },
            });
            const startSeq = bumped.counter - qty + 1;

            const results: { id: string; tag: string }[] = [];
            const logRows: Array<{
                action: string;
                entity: string;
                entityId: string;
                actorEmail: string | null;
                details: string | null;
            }> = [];

            // pull common required fields from `custom`
            const modelValue = readCustom(custom, ["Model", "MODEL", "model"], "N/A");
            const statusValue = readCustom(
                custom,
                ["Status", "STATUS", "status", "Asset Status"],
                "In Stock" // sensible default for new stock
            );

            for (let i = 0; i < qty; i++) {
                const tag = `${prefix}-${String(startSeq + i).padStart(6, "0")}`;

                // Create Asset — your Asset schema has required: category (string), model (string), status (string)
                const asset = await tx.asset.create({
                    data: {
                        tag,
                        category: category.name,
                        model: modelValue,
                        status: statusValue,
                        locationId: stockLocationId ?? null,
                        departmentId: assignedDepartmentId ?? null,
                        staffId: assignedStaffId ?? null,
                    },
                    select: { id: true, tag: true },
                });

                // Custom values (by field NAME)
                const toCreate = customFields.flatMap((f) => {
                    const v = custom[f.name];
                    if (v == null || String(v).trim() === "") return [];
                    return [
                        {
                            assetId: asset.id,
                            customFieldId: f.id, // change if your FK is named differently
                            value: String(v),
                        },
                    ];
                });

                if (toCreate.length) {
                    await tx.customValue.createMany({ data: toCreate });
                }

                logRows.push({
                    action: "CREATE",
                    entity: "Asset",
                    entityId: asset.id,
                    actorEmail: user.email,
                    details: `tag=${tag}; category=${category.name}; model=${modelValue}; status=${statusValue}; locationId=${stockLocationId ?? ""}; departmentId=${assignedDepartmentId ?? ""}; staffId=${assignedStaffId ?? ""}`,
                });

                results.push(asset);
            }

            if (logRows.length) {
                await tx.log.createMany({ data: logRows });
            }
            await tx.log.create({
                data: {
                    action: "BULK_CREATE",
                    entity: "Asset",
                    entityId: "bulk",
                    actorEmail: user.email,
                    details: `count=${qty}; category=${category.name}`,
                },
            });

            return results;
        },
        { timeout: 20_000, maxWait: 5_000 }
    );

    return json({ ok: true, created: createdAssets });
}
