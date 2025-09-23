-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TaskLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roomId" TEXT,
    "departmentId" TEXT,
    "outletId" TEXT,
    "issueTypeId" TEXT,
    "issueCategory" TEXT NOT NULL DEFAULT 'TroubleShoot',
    "statusId" TEXT NOT NULL,
    "attendedById" TEXT,
    "approvedById" TEXT,
    "approvedDate" DATETIME,
    "detail" TEXT NOT NULL,
    "actionTaken" TEXT,
    "createdByEmail" TEXT,
    CONSTRAINT "TaskLog_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TaskLog_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TaskLog_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES "Outlet" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TaskLog_issueTypeId_fkey" FOREIGN KEY ("issueTypeId") REFERENCES "IssueType" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TaskLog_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TaskLog_attendedById_fkey" FOREIGN KEY ("attendedById") REFERENCES "Staff" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TaskLog_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "Staff" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TaskLog" ("actionTaken", "approvedById", "approvedDate", "attendedById", "createdByEmail", "date", "departmentId", "detail", "id", "issueTypeId", "outletId", "roomId", "statusId") SELECT "actionTaken", "approvedById", "approvedDate", "attendedById", "createdByEmail", "date", "departmentId", "detail", "id", "issueTypeId", "outletId", "roomId", "statusId" FROM "TaskLog";
DROP TABLE "TaskLog";
ALTER TABLE "new_TaskLog" RENAME TO "TaskLog";
CREATE INDEX "TaskLog_date_idx" ON "TaskLog"("date");
CREATE INDEX "TaskLog_statusId_idx" ON "TaskLog"("statusId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
