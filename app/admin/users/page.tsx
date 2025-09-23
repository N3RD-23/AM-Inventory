import AdminGuard from "@/components/admin-guard";
import ManageUsers from "@/components/manage-users";

export default function UsersPage() {
  return <AdminGuard title="Users"><ManageUsers /></AdminGuard>;
}
