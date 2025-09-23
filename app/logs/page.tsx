import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LogsToolbar from "@/components/logs/logs-toolbar";

export default async function LogsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-in");

  const logs = await prisma.log.findMany({ orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Logs</h1>
      <LogsToolbar />
      <div className="ac-card p-3 overflow-auto">
        <table className="ac-table">
          <thead>
            <tr>
              <th className="ac-th px-3">time</th>
              <th className="ac-th px-3">action</th>
              <th className="ac-th px-3">entity</th>
              <th className="ac-th px-3">entityId</th>
              <th className="ac-th px-3">actor</th>
              <th className="ac-th px-3">details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(l => (
              <tr key={l.id}>
                <td className="ac-td px-3 text-xs">{l.createdAt.toISOString()}</td>
                <td className="ac-td px-3">{l.action}</td>
                <td className="ac-td px-3">{l.entity}</td>
                <td className="ac-td px-3">{l.entityId}</td>
                <td className="ac-td px-3">{l.actorEmail}</td>
                <td className="ac-td px-3">{l.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
