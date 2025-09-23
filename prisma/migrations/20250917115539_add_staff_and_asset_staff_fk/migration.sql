-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "designation" TEXT,
    "departmentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Staff_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Asset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tag" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "serialNumber" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL,
    "brandId" TEXT,
    "locationId" TEXT,
    "staffId" TEXT,
    "departmentId" TEXT,
    "pcHostname" TEXT,
    "employeeName" TEXT,
    "designation" TEXT,
    "processor" TEXT,
    "ram" TEXT,
    "hdd" TEXT,
    "os" TEXT,
    "serviceTag" TEXT,
    "ipAddress" TEXT,
    "assignee" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Asset_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Asset_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Asset_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Asset_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Asset" ("assignee", "brandId", "category", "createdAt", "departmentId", "designation", "employeeName", "hdd", "id", "ipAddress", "locationId", "model", "os", "pcHostname", "processor", "quantity", "ram", "serialNumber", "serviceTag", "status", "tag", "updatedAt") SELECT "assignee", "brandId", "category", "createdAt", "departmentId", "designation", "employeeName", "hdd", "id", "ipAddress", "locationId", "model", "os", "pcHostname", "processor", "quantity", "ram", "serialNumber", "serviceTag", "status", "tag", "updatedAt" FROM "Asset";
DROP TABLE "Asset";
ALTER TABLE "new_Asset" RENAME TO "Asset";
CREATE UNIQUE INDEX "Asset_tag_key" ON "Asset"("tag");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
