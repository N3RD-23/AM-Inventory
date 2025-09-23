/*
  Warnings:

  - The primary key for the `CategoryCounter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `CategoryCounter` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `CategoryCounter` table. All the data in the column will be lost.
  - You are about to drop the column `next` on the `CategoryCounter` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `CategoryCounter` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CategoryCounter" (
    "category" TEXT NOT NULL PRIMARY KEY,
    "counter" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_CategoryCounter" ("category") SELECT "category" FROM "CategoryCounter";
DROP TABLE "CategoryCounter";
ALTER TABLE "new_CategoryCounter" RENAME TO "CategoryCounter";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
