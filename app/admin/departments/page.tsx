import ManageSimple from "@/components/manage-simple";


export default function Page() {
    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold">Departments</h1>
            <ManageSimple kind="departments" />
        </div>
    );
}