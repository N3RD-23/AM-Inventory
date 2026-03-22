import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL || "admin@example.com";
  const password = process.env.SEED_ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      role: "ADMIN",
      name: "Administrator",
      passwordHash,
    },
  });

  const loc = await prisma.location.upsert({
    where: { name: "Main Warehouse" },
    update: {},
    create: { name: "Main Warehouse", address: "HQ" },
  });

  const brand = await prisma.brand.upsert({
    where: { name: "Generic" },
    update: {},
    create: { name: "Generic" },
  });

  await prisma.asset.upsert({
    where: { tag: "PC-0001" },
    update: {},
    create: {
      tag: "PC-0001",
      category: "PC",
      model: "OfficeBox",
      brand: { connect: { id: brand.id } },
      status: "IN_STOCK",
      location: { connect: { id: loc.id } },
      processor: "i5",
      ram: "16 GB",
      hdd: "512 GB SSD",
    },
  });

  for (const field of [
    { name: "WarrantyUntil", type: "date", category: "PC" },
    { name: "DeskNumber", type: "text", category: "MONITOR" },
    { name: "BatteryReplaceDate", type: "date", category: "UPS" },
  ]) {
    await prisma.customField.upsert({
      where: { name_category: { name: field.name, category: field.category } },
      update: {},
      create: field,
    });
  }

  for (const dept of [
    { name: "IT" },
    { name: "HR" },
    { name: "Finance" },
  ]) {
    await prisma.department.upsert({
      where: { name: dept.name },
      update: {},
      create: dept,
    });
  }

  console.log("Seeded admin:", admin.email);
}

main().finally(async () => prisma.$disconnect());
