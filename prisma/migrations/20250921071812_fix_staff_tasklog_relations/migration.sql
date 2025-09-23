-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "IssueType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TaskLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "roomId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "issueTypeId" TEXT NOT NULL,
    "actionTaken" TEXT NOT NULL,
    "statusId" TEXT NOT NULL,
    "attendedById" TEXT,
    "approvedById" TEXT,
    "approvedDate" DATETIME,
    "createdByEmail" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TaskLog_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TaskLog_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TaskLog_issueTypeId_fkey" FOREIGN KEY ("issueTypeId") REFERENCES "IssueType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TaskLog_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TaskLog_attendedById_fkey" FOREIGN KEY ("attendedById") REFERENCES "Staff" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TaskLog_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "Staff" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_name_key" ON "Room"("name");

-- CreateIndex
CREATE UNIQUE INDEX "IssueType_name_key" ON "IssueType"("name");

-- CreateIndex
CREATE INDEX "TaskLog_date_idx" ON "TaskLog"("date");

-- CreateIndex
CREATE INDEX "TaskLog_roomId_idx" ON "TaskLog"("roomId");

-- CreateIndex
CREATE INDEX "TaskLog_departmentId_idx" ON "TaskLog"("departmentId");

-- CreateIndex
CREATE INDEX "TaskLog_statusId_idx" ON "TaskLog"("statusId");
