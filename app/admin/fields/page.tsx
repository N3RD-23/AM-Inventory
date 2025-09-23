import AdminGuard from "@/components/admin-guard";
import ManageFields from "@/components/manage-fields";

export default function FieldsPage() {
  return <AdminGuard title="Custom Fields"><ManageFields /></AdminGuard>;
}
