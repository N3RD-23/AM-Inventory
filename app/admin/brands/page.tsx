import AdminGuard from "@/components/admin-guard";
import ManageSimple from "@/components/manage-simple";

export default function BrandsPage() {
  return <AdminGuard title="Brands"><ManageSimple kind="brands" /></AdminGuard>;
}
