import AdminGuard from "@/components/admin-guard";
import ManageSimple from "@/components/manage-simple";

export default function StatusesPage() {
    return <AdminGuard title="Statuses">
        <ManageSimple kind="statuses" /></AdminGuard>;
}