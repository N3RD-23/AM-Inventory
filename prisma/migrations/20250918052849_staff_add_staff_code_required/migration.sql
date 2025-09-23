/*
  Warnings:

  - Added the required column `staffCode` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Staff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "staffCode" TEXT NOT NULL,
    "designationId" TEXT,
    "departmentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Staff_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "Designation" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Staff_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Staff" ("createdAt", "departmentId", "designationId", "firstName", "id", "lastName", "updatedAt") SELECT "createdAt", "departmentId", "designationId", "firstName", "id", "lastName", "updatedAt" FROM "Staff";
DROP TABLE "Staff";
ALTER TABLE "new_Staff" RENAME TO "Staff";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
