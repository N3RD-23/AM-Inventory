import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminGuard({ children, title }: { children: React.ReactNode; title: string }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-in");
  if ((session.user as any).role !== "ADMIN") redirect("/");
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">{title}</h1>
      {children}
    </div>
  );
}
