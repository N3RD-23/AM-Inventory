-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" TEXT NOT NULL,
    "category" TEXT,
    "entity" TEXT,
    "message" TEXT,
    "actorEmail" TEXT,
    "actorName" TEXT,
    "ip" TEXT,
    "before" TEXT,
    "after" TEXT
);
