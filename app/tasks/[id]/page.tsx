"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Edit3, Trash2, Loader2, Info } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm";

type Named = { id: string; name: string };
type StaffLite = { id: string; name: string; staffCode?: string | null };

type TaskDto = {
    id: string;
    date: string;
    approvedDate?: string | null;
    detail: string;
    actionTaken: string;
    createdByEmail: string;

    roomId: string;
    departmentId: string;
    issueTypeId: string;
    statusId: string;
    outletId?: string | null;

    attendedById?: string | null;
    approvedById?: string | null;
};

function clsx(...xs: Array<string | false | null | undefined>) { return xs.filter(Boolean).join(" "); }
function toISODate(d?: string | null) { if (!d) return ""; const dt = new Date(d); if (Number.isNaN(dt.getTime())) return ""; return dt.toISOString().slice(0, 10); }
function todayISO() { return new Date().toISOString().slice(0, 10); }

export default function EditTaskPage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const id = params.id;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [err, setErr] = useState("");

    const [task, setTask] = useState<TaskDto | null>(null);

    // Options
    const [departments, setDepartments] = useState<Named[]>([]);
    const [statuses, setStatuses] = useState<Named[]>([]);
    const [outlets, setOutlets] = useState<Named[]>([]);
    const [rooms, setRooms] = useState<Named[]>([]);
    const [issueTypes, setIssueTypes] = useState<Named[]>([]);
    const [itStaff, setItStaff] = useState<StaffLite[]>([]);
    const [approvers, setApprovers] = useState<StaffLite[]>([]);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const closedStatusId = useMemo(() => {
        const s = statuses.find((x) => x.name.toLowerCase() === "closed");
        return s?.id ?? null;
    }, [statuses]);

    async function load() {
        try {
            setLoading(true);
            setErr("");

            const res = await fetch(`/api/tasks/${id}`, { cache: "no-store" });
            if (!res.ok) throw new Error(`Failed to load task (${res.status})`);
            const t = await res.json();
            const normalized: TaskDto = {
                ...t,
                date: toISODate(t.date),
                approvedDate: toISODate(t.approvedDate),
            };
            setTask(normalized);

            const [d, s, o, r, it, staff, appr] = await Promise.all([
                fetch("/api/departments?q=", { cache: "no-store" }),
                fetch("/api/statuses?q=", { cache: "no-store" }),
                fetch("/api/outlets?q=", { cache: "no-store" }),
                fetch("/api/rooms?q=", { cache: "no-store" }),
                fetch("/api/issueTypes?q=", { cache: "no-store" }),
                fetch("/api/staff/it?q=", { cache: "no-store" }),
                fetch("/api/staff/approvers?q=", { cache: "no-store" }),
            ]);
            setDepartments(d.ok ? await d.json() : []);
            setStatuses(s.ok ? await s.json() : []);
            setOutlets(o.ok ? await o.json() : []);
            setRooms(r.ok ? await r.json() : []);
            setIssueTypes(it.ok ? await it.json() : []);
            setItStaff(staff.ok ? await staff.json() : []);
            setApprovers(appr.ok ? await appr.json() : []);
        } catch (e: any) {
            setErr(e?.message ?? "Failed to load");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, [id]);

    async function save() {
        if (!task) return;
        setErr("");
        try {
            setSaving(true);
            const res = await fetch(`/api/tasks/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    date: task.date,
                    approvedDate: task.approvedDate || null,
                    roomId: task.roomId,
                    departmentId: task.departmentId,
                    issueTypeId: task.issueTypeId,
                    statusId: task.statusId,
                    outletId: task.outletId || null,
                    detail: task.detail,
                    actionTaken: task.actionTaken,
                    attendedById: task.attendedById || null,
                    approvedById: task.approvedById || null,
                }),
            });
            if (!res.ok) {
                const j = await res.json().catch(() => ({} as any));
                throw new Error(j?.error ?? `Failed to save (${res.status})`);
            }
            router.push("/tasks");
        } catch (e: any) {
            setErr(e?.message ?? "Save failed");
        } finally {
            setSaving(false);
        }
    }

    async function doDelete() {
        try {
            setDeleting(true);
            const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
            if (!res.ok) {
                const j = await res.json().catch(() => ({} as any));
                throw new Error(j?.error ?? `Failed to delete (${res.status})`);
            }
            setConfirmOpen(false);
            router.push("/tasks");
        } catch (e: any) {
            alert(e?.message ?? "Delete failed");
        } finally {
            setDeleting(false);
        }
    }

    if (loading) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-6">
                <div className="flex items-center gap-2 text-sm opacity-70">
                    <Loader2 size={16} className="animate-spin" /> Loading…
                </div>
            </div>
        );
    }

    if (!task) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-6">
                <p className="text-sm text-red-600">{err || "Task not found"}</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-6">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Edit Task</h1>
                <div className="flex items-center gap-2">
                    <button
                        className="rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-neutral-800"
                        title="Delete task"
                        onClick={() => setConfirmOpen(true)}
                    >
                        <Trash2 size={18} className="text-red-600" />
                    </button>
                </div>
            </div>

            <div className="space-y-5 rounded-2xl border bg-white p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                {/* Dates */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium">Created At</label>
                        <input
                            type="text"
                            readOnly
                            value={task?.date ? new Date(task.date).toLocaleString() : ""}
                            className="w-full cursor-not-allowed rounded-lg border bg-gray-50 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900/50"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium">Approved Date</label>
                        <input
                            type="date"
                            value={task.approvedDate || ""}
                            onChange={(e) => setTask({ ...task, approvedDate: e.target.value })}
                            className="w-full rounded-lg border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                            placeholder="Auto-set when Approved By is chosen"
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Auto-set when an approver is selected.</p>
                    </div>
                </div>

                {/* Room / Department */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium">Room</label>
                        <select
                            value={task.roomId}
                            onChange={(e) => setTask({ ...task, roomId: e.target.value })}
                            className="w-full rounded-lg border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                            required
                        >
                            {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium">Department</label>
                        <select
                            value={task.departmentId}
                            onChange={(e) => setTask({ ...task, departmentId: e.target.value })}
                            className="w-full rounded-lg border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                            required
                        >
                            {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                    </div>
                </div>

                {/* Issue Type / Status */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium">Type of Issue</label>
                        <select
                            value={task.issueTypeId}
                            onChange={(e) => setTask({ ...task, issueTypeId: e.target.value })}
                            className="w-full rounded-lg border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                            required
                        >
                            {issueTypes.map((it) => <option key={it.id} value={it.id}>{it.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium">Status</label>
                        <select
                            value={task.statusId}
                            onChange={(e) => setTask({ ...task, statusId: e.target.value })}
                            className="w-full rounded-lg border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                            required
                        >
                            {statuses.map((s) => (
                                <option
                                    key={s.id}
                                    value={s.id}
                                    disabled={closedStatusId === s.id && !task.approvedById}
                                    title={closedStatusId === s.id && !task.approvedById ? "Cannot close until approved" : undefined}
                                >
                                    {s.name}
                                </option>
                            ))}
                        </select>
                        {!task.approvedById && closedStatusId ? (
                            <div className="mt-1 flex items-start gap-1 text-xs text-amber-600">
                                <Info size={14} className="mt-0.5" />
                                <span>Set an approver before choosing “Closed”.</span>
                            </div>
                        ) : null}
                    </div>
                </div>

                {/* Outlet */}
                <div>
                    <label className="mb-1 block text-sm font-medium">Outlet (optional)</label>
                    <select
                        value={task.outletId || ""}
                        onChange={(e) => setTask({ ...task, outletId: e.target.value || null })}
                        className="w-full rounded-lg border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                    >
                        <option value="">—</option>
                        {outlets.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
                    </select>
                </div>

                {/* Staff pickers */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium">Attended By (IT only)</label>
                        <select
                            value={task.attendedById || ""}
                            onChange={(e) => setTask({ ...task, attendedById: e.target.value || null })}
                            className="w-full rounded-lg border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                        >
                            <option value="">—</option>
                            {itStaff.map((s) => <option key={s.id} value={s.id}>{s.name}{s.staffCode ? ` (${s.staffCode})` : ""}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium">Approved By</label>
                        <select
                            value={task.approvedById || ""}
                            onChange={(e) => {
                                const val = e.target.value || "";
                                setTask({
                                    ...task,
                                    approvedById: val || null,
                                    approvedDate: val ? (task.approvedDate || todayISO()) : "", // auto-set on pick; clear on remove
                                });
                            }}
                            className="w-full rounded-lg border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                        >
                            <option value="">—</option>
                            {approvers.map((a) => <option key={a.id} value={a.id}>{a.name}{a.staffCode ? ` (${a.staffCode})` : ""}</option>)}
                        </select>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Approved Date auto-fills when an approver is selected.</p>
                    </div>
                </div>

                {/* Text areas */}
                <div>
                    <label className="mb-1 block text-sm font-medium">Detail</label>
                    <textarea
                        value={task.detail}
                        onChange={(e) => setTask({ ...task, detail: e.target.value })}
                        rows={3}
                        className="w-full rounded-lg border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">Action Taken</label>
                    <textarea
                        value={task.actionTaken}
                        onChange={(e) => setTask({ ...task, actionTaken: e.target.value })}
                        rows={3}
                        className="w-full rounded-lg border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                    />
                </div>

                {err ? <p className="text-sm text-red-600">{err}</p> : null}

                <div className="flex items-center justify-end gap-2">
                    <button onClick={() => history.back()} className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 dark:border-neutral-700 dark:hover:bg-neutral-800" type="button">
                        Cancel
                    </button>
                    <button onClick={save} disabled={saving} className={clsx("inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white", saving ? "bg-black/60 dark:bg-white/60" : "bg-black hover:opacity-90 dark:bg-white dark:text-black")} type="button">
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Edit3 size={16} />}
                        {saving ? "Saving…" : "Save Changes"}
                    </button>
                </div>
            </div>

            <ConfirmDialog
                open={confirmOpen}
                title="Delete Task?"
                description="This action cannot be undone."
                confirmText={deleting ? "Deleting…" : "Confirm Delete"}
                cancelText="Cancel"
                onCancel={() => setConfirmOpen(false)}
                onConfirm={doDelete}
            />
        </div>
    );
}
