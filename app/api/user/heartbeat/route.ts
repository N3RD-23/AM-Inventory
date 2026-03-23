import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { logUserActivity } from "@/lib/user-activity";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await logUserActivity({
      userId: (session.user as any).id || "unknown",
      userEmail: session.user.email,
      userName: session.user.name || undefined,
      action: "heartbeat",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Heartbeat logging failed:", error);
    return NextResponse.json({ error: "Could not record heartbeat" }, { status: 500 });
  }
}