import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AssetTable from "@/components/asset-table";

export default async function AssetsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-in");
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Assets</h1>
      <AssetTable />
    </div>
  );
}
