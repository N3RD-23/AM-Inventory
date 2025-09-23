// app/api/assets/route.ts
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ---- helpers ---------------------------------------------------------------

type Cat = "PC" | "MONITOR" | "UPS";

const staffSelect = {
  id: true,
  staffCode: true,
  firstName: true,
  lastName: true,
  designation: { select: { id: true, name: true } },
  department: { select: { id: true, name: true } },
};

const assetInclude = {
  brand: true,
  location: true,
  staff: { select: staffSelect },
  customValues: { include: { field: true } },
};

function shapeAsset(a: any) {
  return {
    ...a,
    staff: a.staff
      ? {
        ...a.staff,
        name: `${a.staff.firstName ?? ""} ${a.staff.lastName ?? ""}`.trim(),
        designation: a.staff.designation?.name ?? null,
        department: a.staff.department?.name ?? null,
      }
      : null,
  };
}

function normalizeCategory(input: string | null | undefined): Cat {
  const k = String(input || "").trim().toUpperCase();
  if (k === "PC") return "PC";
  if (k === "MONITOR" || k === "MONITORS") return "MONITOR";
  if (k === "UPS") return "UPS";
  // default to PC if unspecified
  return "PC";
}

// Generate the next sequential tag for a category (PC/MONITOR/UPS)
async function nextTagForCategory(category: Cat) {
  const prefix = category === "PC" ? "PC" : category === "MONITOR" ? "MON" : "UPS";
  // Upsert a counter row and return the incremented value
  const row = await prisma.categoryCounter.upsert({
    where: { category },
    create: { category, counter: 1 },
    update: { counter: { increment: 1 } },
    select: { counter: true },
  });
  return `${prefix}-${String(row.counter).padStart(5, "0")}`;
}

// Extract custom field values from a form body:
// keys look like "cf_<fieldId>" and values are strings/numbers/dates
function extractCustomValues(body: Record<string, any>) {
  const out: Array<{ fieldId: string; value: string | null }> = [];
  for (const [k, v] of Object.entries(body ?? {})) {
    const m = /^cf_(.+)$/.exec(k);
    if (m) out.push({ fieldId: m[1], value: v === "" || v == null ? null : String(v) });
  }
  return out;
}

async function logAction(params: {
  action: "CREATE" | "UPDATE" | "DELETE";
  entity: string;
  entityId: string;
  actorEmail?: string | null;
  details?: any;
}) {
  try {
    await prisma.log.create({
      data: {
        action: params.action,
        entity: params.entity,
        entityId: params.entityId,
        actorEmail: params.actorEmail ?? null,
        details:
          params.details != null
            ? typeof params.details === "string"
              ? params.details
              : JSON.stringify(params.details)
            : null,
      },
    });
  } catch (e) {
    // do not block API on log failures
    console.error("logAction error", e);
  }
}

// ---- GET /api/assets -------------------------------------------------------

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { searchParams } = new URL(req.url);
  const categoryParam = searchParams.get("category") ?? "ALL";

  const where: any = {};
  if (categoryParam.toUpperCase() !== "ALL") {
    where.category = normalizeCategory(categoryParam);
  }

  try {
    const rows = await prisma.asset.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: assetInclude,
    });
    return Response.json(rows.map(shapeAsset));
  } catch (e: any) {
    console.error("GET /api/assets error", e);
    return new Response("Failed to fetch assets", { status: 500 });
  }
}

// ---- POST /api/assets ------------------------------------------------------

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  try {
    const body = await req.json();

    const category: Cat = normalizeCategory(body.category);
    const tag: string =
      body.tag && String(body.tag).trim().length > 0
        ? String(body.tag).trim()
        : await nextTagForCategory(category);

    const created = await prisma.asset.create({
      data: {
        tag,
        category,
        model: String(body.model || ""),
        brandId: body.brandId || null,
        serialNumber: body.serialNumber || null,
        quantity: typeof body.quantity === "number" ? body.quantity : 1,
        status: String(body.status || "IN_STOCK"),
        locationId: body.locationId || null,
        staffId: body.staffId || null, // assign to staff if provided
        assignee: body.assignee || null, // legacy free-text assignee (optional)
      },
      include: assetInclude,
    });

    // Upsert any provided custom field values
    const cvs = extractCustomValues(body);
    for (const cv of cvs) {
      await prisma.customValue.upsert({
        where: { assetId_fieldId: { assetId: created.id, fieldId: cv.fieldId } },
        create: { assetId: created.id, fieldId: cv.fieldId, value: cv.value },
        update: { value: cv.value },
      });
    }

    // Log CREATE
    await logAction({
      action: "CREATE",
      entity: "Asset",
      entityId: created.id,
      actorEmail: session.user?.email,
      details: {
        tag: created.tag,
        category: created.category,
        model: created.model,
        brandId: created.brandId,
        locationId: created.locationId,
        staffId: created.staffId,
        status: created.status,
        customValues: cvs,
      },
    });

    // Re-fetch to include the custom values we just added
    const withCV = await prisma.asset.findUnique({
      where: { id: created.id },
      include: assetInclude,
    });

    return Response.json(shapeAsset(withCV), { status: 201 });
  } catch (e: any) {
    console.error("POST /api/assets error", e);
    return new Response(e?.message || "Failed to create asset", { status: 500 });
  }
}

// ---- PATCH /api/assets?id=... ---------------------------------------------

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });

  try {
    const body = await req.json();

    // Normalize optional fields
    const data: any = {};
    if (body.model !== undefined) data.model = String(body.model);
    if (body.quantity !== undefined) data.quantity = Number(body.quantity);
    if (body.brandId !== undefined) data.brandId = body.brandId || null;
    if (body.locationId !== undefined) data.locationId = body.locationId || null;
    if (body.status !== undefined) data.status = String(body.status);
    if (body.staffId !== undefined) data.staffId = body.staffId || null;
    if (body.assignee !== undefined) data.assignee = body.assignee || null;
    if (body.serialNumber !== undefined) data.serialNumber = body.serialNumber || null;
    if (body.category !== undefined) data.category = normalizeCategory(body.category);

    const updated = await prisma.asset.update({
      where: { id },
      data,
      include: assetInclude,
    });

    // Upsert any provided custom field values
    const cvs = extractCustomValues(body);
    for (const cv of cvs) {
      await prisma.customValue.upsert({
        where: { assetId_fieldId: { assetId: id, fieldId: cv.fieldId } },
        create: { assetId: id, fieldId: cv.fieldId, value: cv.value },
        update: { value: cv.value },
      });
    }

    // Log UPDATE
    await logAction({
      action: "UPDATE",
      entity: "Asset",
      entityId: id,
      actorEmail: session.user?.email,
      details: { changes: data, customValues: cvs },
    });

    // Return shaped asset
    const withCV = await prisma.asset.findUnique({
      where: { id },
      include: assetInclude,
    });

    return Response.json(shapeAsset(withCV));
  } catch (e: any) {
    console.error("PATCH /api/assets error", e);
    return new Response(e?.message || "Failed to update asset", { status: 500 });
  }
}

// ---- DELETE /api/assets?id=... --------------------------------------------

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });

  try {
    const existing = await prisma.asset.findUnique({ where: { id } });
    await prisma.asset.delete({ where: { id } });

    // Log DELETE
    await logAction({
      action: "DELETE",
      entity: "Asset",
      entityId: id,
      actorEmail: session.user?.email,
      details: existing ? { tag: existing.tag, category: existing.category, model: existing.model } : {},
    });

    return new Response(null, { status: 204 });
  } catch (e: any) {
    console.error("DELETE /api/assets error", e);
    return new Response(e?.message || "Failed to delete asset", { status: 500 });
  }
}
