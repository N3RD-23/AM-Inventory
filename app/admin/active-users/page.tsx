"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface ActiveUser {
  userId: string;
  userEmail: string;
  userName: string | null;
  action: string;
  createdAt: string;
  ipAddress: string | null;
}

interface ActiveUsersResponse {
  activeUsers: ActiveUser[];
  count: number;
  sinceMinutes: number;
}

export default function ActiveUsersPage() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<ActiveUsersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [sinceMinutes, setSinceMinutes] = useState(30);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || (session.user as any)?.role !== "ADMIN") {
      redirect("/");
      return;
    }

    fetchActiveUsers();
  }, [session, status, sinceMinutes]);

  const fetchActiveUsers = async () => {
    try {
      const response = await fetch(`/api/admin/active-users?since=${sinceMinutes}&details=true`);
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error("Failed to fetch active users:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return <div className="space-y-4">
      <h1 className="text-xl font-semibold">Active Users</h1>
      <div>Loading...</div>
    </div>;
  }

  if (!session || (session.user as any)?.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Active Users</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="timeRange" className="text-sm">Active in last:</label>
          <select
            id="timeRange"
            value={sinceMinutes}
            onChange={(e) => setSinceMinutes(Number(e.target.value))}
            className="px-2 py-1 border rounded text-sm"
          >
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
            <option value={240}>4 hours</option>
            <option value={1440}>24 hours</option>
          </select>
        </div>
      </div>

      <div className="ac-card p-4">
        <div className="text-lg font-medium mb-4">
          {data?.count || 0} active user{data?.count !== 1 ? 's' : ''} in the last {sinceMinutes} minutes
        </div>

        {data?.activeUsers && data.activeUsers.length > 0 ? (
          <div className="space-y-3">
            {data.activeUsers.map((user) => (
              <div key={user.userId} className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                <div>
                  <div className="font-medium">{user.userName || user.userEmail}</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">{user.userEmail}</div>
                  {user.ipAddress && (
                    <div className="text-xs text-zinc-500 dark:text-zinc-500">IP: {user.ipAddress}</div>
                  )}
                </div>
                <div className="text-right text-sm text-zinc-600 dark:text-zinc-400">
                  <div>Last active: {new Date(user.createdAt).toLocaleString()}</div>
                  <div>Action: {user.action}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
            No active users found in the selected time range.
          </div>
        )}
      </div>
    </div>
  );
}