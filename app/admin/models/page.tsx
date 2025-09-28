import AdminGuard from "@/components/admin-guard";
import ManageSimple from "@/components/manage-simple";

export default function BrandsPage() {
    return <AdminGuard title="Models"><ManageSimple kind="models" /></AdminGuard>;
}
