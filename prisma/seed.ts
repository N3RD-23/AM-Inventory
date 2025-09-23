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
      brandId: brand.id, // from the brand upsert above
      status: "IN_STOCK",
      locationId: loc.id, // from the location upsert above
      cpu: "i5",
      ramGB: 16,
      storage: "512GB SSD",
    },
  });

  await prisma.customField.createMany({
    data: [
      { name: "WarrantyUntil", type: "date", category: "PC" },
      { name: "DeskNumber", type: "text", category: "MONITOR" },
      { name: "BatteryReplaceDate", type: "date", category: "UPS" },
    ],
  });

  await prisma.department.createMany({
    data: [
      { name: "IT" },
      { name: "HR" },
      { name: "Finance" },
    ],
  });

  console.log("Seeded admin:", admin.email);
}

main().finally(async () => prisma.$disconnect());
