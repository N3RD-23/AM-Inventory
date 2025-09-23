"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import { Check, Edit3, Loader2, Trash2, Plus, Users, X, Search } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm";
import { useToast } from "@/components/ui/toast";

type Dept = { id: string; name: string };
type Designation = { id: string; name: string };
type Staff = {
    id: string;
    firstName: string;
    lastName: string;
    staffCode: string;
    designationId?: string | null;
    designation?: Designation | null;
    departmentId?: string | null;
    department?: Dept | null;
};

function clsx(...xs: Array<string | false | null | undefined>) {
    return xs.filter(Boolean).join(" ");
}

export default function ManageStaff() {
    const { push } = useToast();
    const qc = useQueryClient();

    // Reference lists
    const { data: departments = [] } = useQuery<Dept[]>({
        queryKey: ["admin", "departments"],
        queryFn: async () => (await fetch("/api/admin/departments")).json(),
    });
    const { data: designations = [] } = useQuery<Designation[]>({
        queryKey: ["admin", "designations"],
        queryFn: async () => (await fetch("/api/admin/designations")).json(),
    });

    // Staff list
    const [search, setSearch] = useState("");
    const { data: list = [], isLoading } = useQuery<Staff[]>({
        queryKey: ["admin", "staff"],
        queryFn: async () => (await fetch("/api/admin/staff")).json(),
    });

    const items = useMemo(() => {
        const s = search.toLowerCase().trim();
        if (!s) return list;
        return list.filter(
            (x) =>
                `${x.firstName} ${x.lastName}`.toLowerCase().includes(s) ||
                (x.staffCode ?? "").toLowerCase().includes(s) ||
                (x.designation?.name ?? "").toLowerCase().includes(s) ||
                (x.department?.name ?? "").toLowerCase().includes(s)
        );
    }, [list, search]);

    // Modal (Add Staff)
    const [createOpen, setCreateOpen] = useState(false);

    // Delete confirm
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingDelete, setPendingDelete] = useState<Staff | null>(null);

    // Mutations
    const createMut = useMutation({
        mutationFn: async (payload: {
            firstName: string;
            lastName: string;
            staffCode: string;
            designationId?: string | null;
            departmentId?: string | null;
        }) => {
            const r = await fetch("/api/admin/staff", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!r.ok) throw new Error(await r.text());
            return r.json();
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["admin", "staff"] });
            setCreateOpen(false); // auto-close
            push({ title: "Staff created", kind: "success" });
        },
        onError: (e: any) => push({ title: e?.message ?? "Create failed", kind: "error" }),
    });

    const updateMut = useMutation({
        mutationFn: async (payload: Staff) => {
            const r = await fetch("/api/admin/staff", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!r.ok) throw new Error(await r.text());
            return r.json();
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["admin", "staff"] });
            push({ title: "Staff updated", kind: "success" });
        },
        onError: (e: any) => push({ title: e?.message ?? "Update failed", kind: "error" }),
    });

    const deleteMut = useMutation({
        mutationFn: async (id: string) => {
            const r = await fetch(`/api/admin/staff?id=${encodeURIComponent(id)}`, { method: "DELETE" });
            if (!r.ok) throw new Error(await r.text());
            return r.json();
        },
        onSuccess: () => {
            setPendingDelete(null);
            setConfirmOpen(false);
            qc.invalidateQueries({ queryKey: ["admin", "staff"] });
            push({ title: "Staff deleted", kind: "success" });
        },
        onError: (e: any) => push({ title: e?.message ?? "Delete failed", kind: "error" }),
    });

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <Users size={18} className="opacity-80" />
                    <h2 className="font-semibold">Staff</h2>
                    <div className="ml-5 relative w-64">
                        <Search
                            size={16}
                            className="pointer-events-none absolute right-3 top-2.5 text-zinc-500 dark:text-zinc-400"
                        />
                        <input
                            className="ac-input w-full pl-8"
                            placeholder="Search staff…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center">
                    <button
                        className="font-semibold gap-2 rounded-lg px-4 py-2 text-sm text-black bg-black/60 dark:bg-white"
                        onClick={() => setCreateOpen(true)}
                        title="Add Staff"
                    >
                        Add Staff
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="overflow-auto">
                <table className="ac-table">
                    <thead>
                        <tr>
                            <th className="ac-th px-3 w-12">#</th>
                            <th className="ac-th px-3">First Name</th>
                            <th className="ac-th px-3">Last Name</th>
                            <th className="ac-th px-3">Staff ID</th>
                            <th className="ac-th px-3">Designation</th>
                            <th className="ac-th px-3">Department</th>
                            <th className="ac-th px-3 w-36">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td className="ac-td px-3" colSpan={7}>
                                    <div className="flex items-center gap-2">
                                        <Loader2 size={16} className="animate-spin" />
                                        Loading…
                                    </div>
                                </td>
                            </tr>
                        )}
                        {!isLoading && items.length === 0 && (
                            <tr>
                                <td className="ac-td px-3 opacity-70" colSpan={7}>
                                    No staff found.
                                </td>
                            </tr>
                        )}
                        {items.map((s, idx) => (
                            <Row
                                key={s.id}
                                s={s}
                                idx={idx}
                                departments={departments}
                                designations={designations}
                                onSave={(payload) => updateMut.mutate(payload)}
                                onDelete={() => {
                                    setPendingDelete(s);
                                    setConfirmOpen(true);
                                }}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <ConfirmDialog
                open={confirmOpen}
                title="Delete staff?"
                description={`This will permanently delete “${pendingDelete ? `${pendingDelete.firstName} ${pendingDelete.lastName}` : ""
                    }”.`}
                confirmText={deleteMut.isPending ? "Deleting…" : "Confirm Delete"}
                cancelText="Cancel"
                onCancel={() => {
                    setConfirmOpen(false);
                    setPendingDelete(null);
                }}
                onConfirm={() => pendingDelete && deleteMut.mutate(pendingDelete.id)}
            />

            {/* Add Staff Modal */}
            <AddStaffModal
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                submitting={createMut.isPending}
                designations={designations}
                departments={departments}
                onSubmit={(payload) => createMut.mutate(payload)}
            />
        </div>
    );
}

/* ---------------- Row ---------------- */

function Row({
    s,
    idx,
    departments,
    designations,
    onSave,
    onDelete,
}: {
    s: Staff;
    idx: number;
    departments: Dept[];
    designations: Designation[];
    onSave: (payload: Staff) => void;
    onDelete: () => void;
}) {
    const [edit, setEdit] = useState(false);
    const [firstName, setFirstName] = useState(s.firstName);
    const [lastName, setLastName] = useState(s.lastName);
    const [staffCode, setStaffCode] = useState(s.staffCode);
    const [designationId, setDesignationId] = useState<string | "">(s.designationId ?? "");
    const [departmentId, setDepartmentId] = useState<string | "">(s.departmentId ?? "");

    if (!edit) {
        return (
            <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                <td className="ac-td px-3 text-sm opacity-70">{idx + 1}</td>
                <td className="ac-td px-3">{s.firstName}</td>
                <td className="ac-td px-3">{s.lastName}</td>
                <td className="ac-td px-3">{s.staffCode}</td>
                <td className="ac-td px-3">{s.designation?.name ?? ""}</td>
                <td className="ac-td px-3">{s.department?.name ?? ""}</td>
                <td className="ac-td px-3">
                    <div className="flex items-center gap-2">
                        <button className="ac-btn px-2" onClick={() => setEdit(true)} title="Edit">
                            <Edit3 size={16} />
                        </button>
                        <button className="ac-btn px-2" onClick={onDelete} title="Delete">
                            <Trash2 color="red" size={16} />
                        </button>
                    </div>
                </td>
            </tr>
        );
    }

    return (
        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
            <td className="ac-td px-3 text-sm opacity-70">{idx + 1}</td>
            <td className="ac-td px-3">
                <input className="ac-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </td>
            <td className="ac-td px-3">
                <input className="ac-input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </td>
            <td className="ac-td px-3">
                <input className="ac-input" value={staffCode} onChange={(e) => setStaffCode(e.target.value)} />
            </td>
            <td className="ac-td px-3">
                <select className="ac-select" value={designationId} onChange={(e) => setDesignationId(e.target.value)}>
                    <option value="">(no designation)</option>
                    {designations.map((d) => (
                        <option key={d.id} value={d.id}>
                            {d.name}
                        </option>
                    ))}
                </select>
            </td>
            <td className="ac-td px-3">
                <select className="ac-select" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
                    <option value="">(no department)</option>
                    {departments.map((d) => (
                        <option key={d.id} value={d.id}>
                            {d.name}
                        </option>
                    ))}
                </select>
            </td>
            <td className="ac-td px-3">
                <div className="flex items-center gap-2">
                    <button
                        className="ac-btn px-2"
                        disabled={!firstName.trim() || !lastName.trim() || !staffCode.trim()}
                        onClick={() => {
                            onSave({
                                ...s,
                                firstName: firstName.trim(),
                                lastName: lastName.trim(),
                                staffCode: staffCode.trim(),
                                designationId: designationId || null,
                                departmentId: departmentId || null,
                            });
                            setEdit(false);
                        }}
                        title="Save"
                    >
                        <Check size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
}

/* ---------------- Modal ---------------- */

function AddStaffModal({
    open,
    onClose,
    onSubmit,
    submitting,
    departments,
    designations,
}: {
    open: boolean;
    onClose: () => void;
    onSubmit: (p: {
        firstName: string;
        lastName: string;
        staffCode: string;
        designationId?: string | null;
        departmentId?: string | null;
    }) => void;
    submitting: boolean;
    departments: Dept[];
    designations: Designation[];
}) {
    const [firstName, setFirst] = useState("");
    const [lastName, setLast] = useState("");
    const [staffCode, setCode] = useState("");
    const [deptId, setDept] = useState("");
    const [desigId, setDesig] = useState("");

    useEffect(() => {
        if (open) {
            // reset each open
            setFirst("");
            setLast("");
            setCode("");
            setDept("");
            setDesig("");
        }
    }, [open]);

    function submit(e: React.FormEvent) {
        e.preventDefault();
        if (!firstName.trim() || !lastName.trim() || !staffCode.trim()) return;
        onSubmit({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            staffCode: staffCode.trim(),
            departmentId: deptId || null,
            designationId: desigId || null,
        });
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[60]">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={onClose} />

            {/* Dialog */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <form
                    onSubmit={submit}
                    className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl dark:border-neutral-700 dark:bg-neutral-900"
                >
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Add Staff</h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg px-2 py-1 text-sm hover:bg-gray-50 dark:hover:bg-neutral-800"
                            aria-label="Close"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium">First name *</label>
                            <input
                                value={firstName}
                                onChange={(e) => setFirst(e.target.value)}
                                className="w-full rounded-lg border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                                required
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Last name *</label>
                            <input
                                value={lastName}
                                onChange={(e) => setLast(e.target.value)}
                                className="w-full rounded-lg border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                                required
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="mb-1 block text-sm font-medium">Staff ID *</label>
                            <input
                                value={staffCode}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full rounded-lg border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                                required
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Designation</label>
                            <select
                                value={desigId}
                                onChange={(e) => setDesig(e.target.value)}
                                className="w-full rounded-lg border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                            >
                                <option value="">(no designation)</option>
                                {designations.map((d) => (
                                    <option key={d.id} value={d.id}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Department</label>
                            <select
                                value={deptId}
                                onChange={(e) => setDept(e.target.value)}
                                className="w-full rounded-lg border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                            >
                                <option value="">(no department)</option>
                                {departments.map((d) => (
                                    <option key={d.id} value={d.id}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-5 flex items-center justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting || !firstName.trim() || !lastName.trim() || !staffCode.trim()}
                            className={clsx(
                                "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white",
                                submitting ? "bg-black/60 dark:bg-white/60" : "bg-black hover:opacity-90 dark:bg-white dark:text-black"
                            )}
                        >
                            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
