"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Plus, X, Search, Loader2, Trash2, CheckSquare, Square } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm";

/* ----------------------------- types ----------------------------- */
type SummaryItem = {
    key: string;
    category: string;
    model: string;
    total: number;
    assigned: number;
    unassigned: number;
    inStock: number;
    damaged: number;
};

type Opt = { id: string; name: string };
type Staff = { id: string; firstName: string; lastName: string; staffCode?: string | null };

type GroupAsset = {
    id: string;
    tag: string;
    status: string | null;
    staff?: { firstName: string; lastName: string; staffCode?: string | null } | null;
    department?: { name: string } | null;
    location?: { name: string } | null;
};

/* ----------------------------- helpers ----------------------------- */
function clsx(...xs: Array<string | false | null | undefined>) {
    return xs.filter(Boolean).join(" ");
}
const todayISO = () => new Date().toISOString().slice(0, 10);

/* ================================================================== */
/*                              PAGE                                   */
/* ================================================================== */
export default function InventoryPage() {
    const qc = useQueryClient();
    const [q, setQ] = useState("");
    const [addOpen, setAddOpen] = useState(false);
    const [view, setView] = useState<SummaryItem | null>(null);

    const listQ = useQuery<SummaryItem[]>({
        queryKey: ["inventory", q],
        queryFn: async () => {
            const r = await fetch(`/api/inventory${q ? `?q=${encodeURIComponent(q)}` : ""}`, { cache: "no-store" });
            if (!r.ok) throw new Error(await r.text());
            return r.json();
        },
    });

    const items = listQ.data ?? [];

    return (
        <div className="p-4 space-y-4 min-h-screen">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-semibold">Inventory</h1>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative w-full sm:w-[360px]">
                        <input
                            className="w-full rounded-full border px-9 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                            placeholder="Search by category, model, or tag…"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                        <Search size={16} className="pointer-events-none absolute left-3 top-2.5 opacity-60" />
                    </div>
                    <button className="ac-btn shrink-0" onClick={() => setAddOpen(true)}>
                        <Plus size={16} className="mr-1" /> Add Inventory
                    </button>
                </div>
            </div>

            {/* Grid of cards */}
            <div>
                {listQ.isLoading ? (
                    <div className="flex items-center gap-2 text-sm opacity-70">
                        <Loader2 size={16} className="animate-spin" />
                        Loading…
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-sm opacity-70">No items found.</div>
                ) : (
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {items.map((it) => (
                            <button
                                key={it.key}
                                onClick={() => setView(it)}
                                className="group text-left relative rounded-2xl border border-zinc-200/70 dark:border-zinc-800
                           bg-white dark:bg-zinc-950 p-4 shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="text-xs uppercase tracking-wide opacity-60">{it.category}</div>
                                        <div className="font-medium truncate">{it.model || "—"}</div>
                                    </div>
                                    <div className="text-2xl font-semibold tabular-nums">{it.total}</div>
                                </div>
                                <div className="mt-3 grid grid-cols-2 gap-2 text-xs opacity-80">
                                    <div>Assigned: <b className="tabular-nums">{it.assigned}</b></div>
                                    <div>Unassigned: <b className="tabular-nums">{it.unassigned}</b></div>
                                    <div>In Stock: <b className="tabular-nums">{it.inStock}</b></div>
                                    <div>Damaged: <b className="tabular-nums">{it.damaged}</b></div>
                                </div>
                                <div className="pointer-events-none absolute inset-x-0 -bottom-[1px] h-[2px] scale-x-0 origin-left
                                bg-gradient-to-r from-zinc-400/60 to-zinc-800/60 dark:from-zinc-700/60 dark:to-zinc-300/60
                                transition-transform group-hover:scale-x-100" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Add modal */}
            {addOpen && (
                <AddInventoryModal
                    open={addOpen}
                    onClose={() => setAddOpen(false)}
                    onCreated={async () => {
                        setAddOpen(false);
                        await qc.invalidateQueries({ queryKey: ["inventory"] });
                    }}
                />
            )}

            {/* View group modal (with bulk delete) */}
            {view && (
                <ViewGroupModal
                    item={view}
                    onClose={() => setView(null)}
                    onBulkDeleted={async () => {
                        await Promise.all([qc.invalidateQueries({ queryKey: ["inventory"] })]);
                    }}
                />
            )}
        </div>
    );
}

/* ================================================================== */
/*                        ADD INVENTORY MODAL                          */
/* ================================================================== */
function AddInventoryModal({
    open,
    onClose,
    onCreated,
}: {
    open: boolean;
    onClose: () => void;
    onCreated: () => void;
}) {
    const qc = useQueryClient();

    // pick lists
    const { data: categories = [] } = useQuery<Opt[]>({
        queryKey: ["admin", "categories"],
        queryFn: async () => (await fetch("/api/admin/categories")).json(),
    });
    const { data: locations = [] } = useQuery<Opt[]>({
        queryKey: ["admin", "locations"],
        queryFn: async () => (await fetch("/api/admin/locations")).json(),
    });
    const { data: departments = [] } = useQuery<Opt[]>({
        queryKey: ["admin", "departments"],
        queryFn: async () => (await fetch("/api/admin/departments")).json(),
    });
    const { data: staff = [] } = useQuery<Staff[]>({
        queryKey: ["admin", "staff"],
        queryFn: async () => (await fetch("/api/admin/staff")).json(),
    });

    // form state
    const [count, setCount] = useState<number>(1);
    const [categoryId, setCategoryId] = useState<string>("");
    const [stockLocationId, setStockLocationId] = useState<string>("");
    const [assignedDepartmentId, setAssignedDepartmentId] = useState<string>("");
    const [assignedStaffId, setAssignedStaffId] = useState<string>("");
    const [assignedDate, setAssignedDate] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [status, setStatus] = useState<string>("In Stock");
    const [notes, setNotes] = useState<string>("");

    // local staff filter
    const [staffFilter, setStaffFilter] = useState("");
    const filteredStaff = useMemo(() => {
        const s = staffFilter.trim().toLowerCase();
        if (!s) return staff;
        return staff.filter(
            (p) =>
                `${p.firstName} ${p.lastName}`.toLowerCase().includes(s) ||
                (p.staffCode ?? "").toLowerCase().includes(s)
        );
    }, [staff, staffFilter]);

    const createMut = useMutation({
        mutationFn: async () => {
            if (!categoryId) throw new Error("Please select a Type of Asset (Category).");
            if (!model.trim()) throw new Error("Model is required.");
            const payload = {
                date: todayISO(),
                count,
                stockLocationId: stockLocationId || null,
                assignedDepartmentId: assignedDepartmentId || null,
                assignedDate: assignedDate || null,
                assignedStaffId: assignedStaffId || null,
                categoryId,
                custom: {
                    Model: model.trim(),
                    Status: status.trim(),
                    ...(notes.trim() ? { Notes: notes.trim() } : {}),
                },
            };
            const r = await fetch("/api/inventory/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!r.ok) throw new Error(await r.text());
            return r.json();
        },
        onSuccess: () => {
            onCreated();
            qc.invalidateQueries({ queryKey: ["inventory"] });
        },
        onError: (e: any) => alert(e?.message ?? "Failed to add inventory"),
    });

    // close on Esc
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        if (open) document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    return (
        <div className="fixed inset-0 z-[90] grid place-items-center overscroll-contain">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative w-[95vw] max-w-3xl max-h-[92vh] overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex-none">
                    <h3 className="font-semibold">Add Inventory</h3>
                    <button className="ac-btn px-2" onClick={onClose} aria-label="Close">
                        <X size={16} />
                    </button>
                </div>

                {/* Scrollable content */}
                <div className="px-4 py-3 space-y-3 overflow-y-auto flex-1 min-h-0">
                    {/* Meta row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <label className="text-xs opacity-70">Date</label>
                            <input className="ac-input w-full" type="date" value={todayISO()} readOnly />
                        </div>
                        <div>
                            <label className="text-xs opacity-70">Count</label>
                            <input
                                className="ac-input w-full"
                                type="number"
                                min={1}
                                value={count}
                                onChange={(e) => setCount(Math.max(1, Number(e.target.value) || 1))}
                            />
                        </div>
                        <div>
                            <label className="text-xs opacity-70">Type of Asset (Category) *</label>
                            <select
                                className="ac-select w-full"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <option value="">Select category…</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Stock & assignment */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <label className="text-xs opacity-70">Location of Stock</label>
                            <select
                                className="ac-select w-full"
                                value={stockLocationId}
                                onChange={(e) => setStockLocationId(e.target.value)}
                            >
                                <option value="">(none)</option>
                                {locations.map((l) => (
                                    <option key={l.id} value={l.id}>{l.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs opacity-70">Assigned Department</label>
                            <select
                                className="ac-select w-full"
                                value={assignedDepartmentId}
                                onChange={(e) => setAssignedDepartmentId(e.target.value)}
                            >
                                <option value="">(none)</option>
                                {departments.map((d) => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs opacity-70">Assigned Date</label>
                            <input
                                className="ac-input w-full"
                                type="date"
                                value={assignedDate}
                                onChange={(e) => setAssignedDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Assigned Staff */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                            <label className="text-xs opacity-70">Assigned Staff</label>
                            <div className="flex gap-2">
                                <input
                                    className="ac-input w-full sm:w-64"
                                    placeholder="Filter staff by name/code…"
                                    value={staffFilter}
                                    onChange={(e) => setStaffFilter(e.target.value)}
                                />
                                <select
                                    className="ac-select w-full sm:w-72"
                                    value={assignedStaffId}
                                    onChange={(e) => setAssignedStaffId(e.target.value)}
                                >
                                    <option value="">(none)</option>
                                    {filteredStaff.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.firstName} {s.lastName}{s.staffCode ? ` (${s.staffCode})` : ""}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Required asset fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <label className="text-xs opacity-70">Model *</label>
                            <input
                                className="ac-input w-full"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                placeholder="e.g., ThinkVision T24i"
                            />
                        </div>
                        <div>
                            <label className="text-xs opacity-70">Status *</label>
                            <select
                                className="ac-select w-full"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option>In Stock</option>
                                <option>Assigned</option>
                                <option>Damaged</option>
                                <option>Unusable</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs opacity-70">Notes</label>
                            <input
                                className="ac-input w-full"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Optional notes…"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 flex-none">
                    <button className="ac-btn px-3" onClick={onClose}>Cancel</button>
                    <button className="ac-btn" disabled={createMut.isPending} onClick={() => createMut.mutate()}>
                        {createMut.isPending ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} className="mr-1" />}
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ================================================================== */
/*                        VIEW GROUP MODAL                             */
/* ================================================================== */
function ViewGroupModal({
    item,
    onClose,
    onBulkDeleted,
}: {
    item: SummaryItem;
    onClose: () => void;
    onBulkDeleted: () => void;
}) {
    const qc = useQueryClient();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selected, setSelected] = useState<Record<string, boolean>>({});
    const key = ["inventory", "group", item.category, item.model] as const;

    const listQ = useQuery<GroupAsset[]>({
        queryKey: key,
        queryFn: async () => {
            const r = await fetch(`/api/inventory/group?category=${encodeURIComponent(item.category)}&model=${encodeURIComponent(item.model || "")}`, { cache: "no-store" });
            if (!r.ok) throw new Error(await r.text());
            return r.json();
        },
    });

    const rows = listQ.data ?? [];
    const allSelected = rows.length > 0 && rows.every((r) => selected[r.id]);
    const selectedIds = rows.filter((r) => selected[r.id]).map((r) => r.id);

    const toggleAll = () => {
        if (allSelected) {
            setSelected({});
        } else {
            const next: Record<string, boolean> = {};
            rows.forEach((r) => { next[r.id] = true; });
            setSelected(next);
        }
    };

    const delMut = useMutation({
        mutationFn: async (ids: string[]) => {
            const resp = await fetch("/api/inventory/bulk-delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids }),
            });
            if (!resp.ok) throw new Error(await resp.text());
            return resp.json();
        },
        onSuccess: async () => {
            setConfirmOpen(false);
            setSelected({});
            await qc.invalidateQueries({ queryKey: key });
            await qc.invalidateQueries({ queryKey: ["inventory"] });
            onBulkDeleted();
        },
        onError: (e: any) => alert(e?.message ?? "Failed to delete"),
    });

    return (
        <div className="fixed inset-0 z-[90] grid place-items-center overscroll-contain">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative w-[95vw] max-w-5xl max-h-[92vh] overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex-none">
                    <div>
                        <h3 className="font-semibold">Inventory Group</h3>
                        <div className="text-xs opacity-70">
                            {item.category} — {item.model || "—"}
                        </div>
                    </div>
                    <button className="ac-btn px-2" onClick={onClose} aria-label="Close">
                        <X size={16} />
                    </button>
                </div>

                {/* Toolbar */}
                <div className="flex items-center justify-between px-4 py-2 flex-none">
                    <div className="flex items-center gap-2 text-sm">
                        <button className="ac-btn px-2" onClick={toggleAll} title={allSelected ? "Unselect all" : "Select all"}>
                            {allSelected ? <CheckSquare size={16} /> : <Square size={16} />} {allSelected ? "Unselect all" : "Select all"}
                        </button>
                        <span className="opacity-70">Selected: {selectedIds.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            className="ac-btn"
                            disabled={selectedIds.length === 0 || delMut.isPending}
                            onClick={() => setConfirmOpen(true)}
                            title="Delete selected assets"
                        >
                            {delMut.isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} className="mr-1 text-red-600" />}
                            Delete Selected
                        </button>
                    </div>
                </div>

                {/* Scrollable table area */}
                <div className="px-4 pb-4 flex-1 min-h-0 overflow-auto">
                    <div className="overflow-x-auto rounded-xl border bg-white dark:border-neutral-700 dark:bg-neutral-900">
                        <table className="min-w-[1000px] w-full border-collapse">
                            <thead>
                                <tr className="text-left text-sm">
                                    <th className="px-3 py-2 border-b dark:border-neutral-700 w-10"></th>
                                    <th className="px-3 py-2 border-b dark:border-neutral-700">Tag</th>
                                    <th className="px-3 py-2 border-b dark:border-neutral-700">Status</th>
                                    <th className="px-3 py-2 border-b dark:border-neutral-700">Assigned To</th>
                                    <th className="px-3 py-2 border-b dark:border-neutral-700">Department</th>
                                    <th className="px-3 py-2 border-b dark:border-neutral-700">Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listQ.isLoading ? (
                                    <tr>
                                        <td className="px-3 py-3 text-sm opacity-70" colSpan={6}>
                                            <div className="flex items-center gap-2">
                                                <Loader2 size={16} className="animate-spin" />
                                                Loading…
                                            </div>
                                        </td>
                                    </tr>
                                ) : rows.length === 0 ? (
                                    <tr>
                                        <td className="px-3 py-3 text-sm opacity-70" colSpan={6}>
                                            No items in this group.
                                        </td>
                                    </tr>
                                ) : (
                                    rows.map((r) => {
                                        const assignedName = r.staff ? `${r.staff.firstName} ${r.staff.lastName}${r.staff.staffCode ? ` (${r.staff.staffCode})` : ""}` : "—";
                                        return (
                                            <tr key={r.id} className="text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                                                <td className="px-3 py-3 border-b dark:border-neutral-800 align-top">
                                                    <input
                                                        type="checkbox"
                                                        checked={!!selected[r.id]}
                                                        onChange={(e) => setSelected((s) => ({ ...s, [r.id]: e.target.checked }))}
                                                    />
                                                </td>
                                                <td className="px-3 py-3 border-b dark:border-neutral-800 align-top">{r.tag}</td>
                                                <td className="px-3 py-3 border-b dark:border-neutral-800 align-top">{r.status ?? "—"}</td>
                                                <td className="px-3 py-3 border-b dark:border-neutral-800 align-top">{assignedName}</td>
                                                <td className="px-3 py-3 border-b dark:border-neutral-800 align-top">{r.department?.name ?? "—"}</td>
                                                <td className="px-3 py-3 border-b dark:border-neutral-800 align-top">{r.location?.name ?? "—"}</td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Confirm dialog */}
                <ConfirmDialog
                    open={confirmOpen}
                    title="Delete selected assets?"
                    description={`This will permanently delete ${selectedIds.length} asset${selectedIds.length === 1 ? "" : "s"}. This action cannot be undone.`}
                    confirmText={delMut.isPending ? "Deleting…" : "Confirm Delete"}
                    cancelText="Cancel"
                    onCancel={() => setConfirmOpen(false)}
                    onConfirm={() => selectedIds.length > 0 && delMut.mutate(selectedIds)}
                />

                {/* Footer */}
                <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 flex-none">
                    <Link
                        href={`/assets?category=${encodeURIComponent(item.category)}${item.model ? `&q=${encodeURIComponent(item.model)}` : ""}`}
                        className="ac-btn"
                    >
                        View Items
                    </Link>
                    <button className="ac-btn" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}
