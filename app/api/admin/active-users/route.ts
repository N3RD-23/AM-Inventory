import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getActiveUsers, getActiveUsersCount } from "@/lib/user-activity";

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const sinceMinutes = parseInt(searchParams.get("since") || "30");
    const includeDetails = searchParams.get("details") === "true";

    if (includeDetails) {
      const activeUsers = await getActiveUsers(sinceMinutes);
      return NextResponse.json({
        activeUsers,
        count: activeUsers.length,
        sinceMinutes,
      });
    } else {
      const count = await getActiveUsersCount(sinceMinutes);
      return NextResponse.json({
        count,
        sinceMinutes,
      });
    }
  } catch (error) {
    console.error("Error fetching active users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}