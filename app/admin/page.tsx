import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-in");
  if ((session.user as any).role !== "ADMIN") redirect("/");

  const links = [
    { href: "/admin/users", label: "Users" },
    { href: "/admin/active-users", label: "Active Users" },
    { href: "/admin/staff", label: "Staff" },
    { href: "/admin/brands", label: "Brands" },
    { href: "/admin/statuses", label: "Statuses" },
    { href: "/admin/locations", label: "Locations" },
    { href: "/admin/fields", label: "Custom Fields" },
    { href: "/admin/departments", label: "Departments" },
    { href: "/admin/designations", label: "Designations" },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Admin</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {links.map(l => (
          <Link key={l.href} href={l.href} className="ac-card p-4">
            <div className="font-medium">{l.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
