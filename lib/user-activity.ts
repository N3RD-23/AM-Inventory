import { prisma } from "@/lib/prisma";

export interface UserActivityData {
  userId: string;
  userEmail: string;
  userName?: string;
  action: "login" | "logout" | "activity" | "heartbeat";
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
}

export async function logUserActivity(data: UserActivityData) {
  try {
    await prisma.userActivity.create({
      data: {
        userId: data.userId,
        userEmail: data.userEmail,
        userName: data.userName,
        action: data.action,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        sessionId: data.sessionId,
      },
    });
  } catch (error) {
    console.error("Failed to log user activity:", error);
  }
}

export async function getActiveUsers(sinceMinutes: number = 30) {
  const since = new Date(Date.now() - sinceMinutes * 60 * 1000);

  // Get users who have been active within the time window
  const activeUsers = await prisma.userActivity.findMany({
    where: {
      createdAt: {
        gte: since,
      },
      action: {
        in: ["login", "activity", "heartbeat"],
      },
    },
    select: {
      userId: true,
      userEmail: true,
      userName: true,
      action: true,
      createdAt: true,
      ipAddress: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Group by user and get the most recent activity
  const userMap = new Map<string, typeof activeUsers[0]>();

  for (const activity of activeUsers) {
    if (!userMap.has(activity.userId)) {
      userMap.set(activity.userId, activity);
    }
  }

  return Array.from(userMap.values());
}

export async function getActiveUsersCount(sinceMinutes: number = 30) {
  const activeUsers = await getActiveUsers(sinceMinutes);
  return activeUsers.length;
}

export async function getUserActivityHistory(userId: string, limit: number = 50) {
  return await prisma.userActivity.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
}