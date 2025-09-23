import AdminGuard from "@/components/admin-guard";
import ManageSimple from "@/components/manage-simple";

export default function Page() {
    return <AdminGuard title="Rooms"><ManageSimple kind="rooms" /></AdminGuard>;
}
