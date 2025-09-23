import AdminGuard from "@/components/admin-guard";
import ManageSimple from "@/components/manage-simple";

export default function LocationsPage() {
  return <AdminGuard title="Locations"><ManageSimple kind="locations" /></AdminGuard>;
}
