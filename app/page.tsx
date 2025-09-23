import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardCards from "@/components/dashboard-cards";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-in");

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <DashboardCards />
    </div>
  );
}
