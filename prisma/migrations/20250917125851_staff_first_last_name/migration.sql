/*
  Warnings:

  - You are about to drop the column `name` on the `Staff` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Staff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "designation" TEXT,
    "departmentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Staff_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Staff" ("createdAt", "departmentId", "designation", "id", "updatedAt") SELECT "createdAt", "departmentId", "designation", "id", "updatedAt" FROM "Staff";
DROP TABLE "Staff";
ALTER TABLE "new_Staff" RENAME TO "Staff";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
