import AdminGuard from "@/components/admin-guard";
import ManageSimple from "@/components/manage-simple";
import LogExportButtons from "@/components/logs/export-buttons";

export default function LogsPage() {
    return <AdminGuard title="Logs"><ManageSimple kind="logs" /></AdminGuard>;
}
