"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Edit3, Trash2, Loader2, Save, Search } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm";

type Named = { id: string; name: string };
type StaffLite = { id: string; name: string; staffCode?: string | null };

type TaskRow = {
    id: string;
    date: string;
    approvedDate?: string | null;
    closedDate?: string | null; // ✅ NEW
    detail: string;
    actionTaken: string;

    roomId: string | null;
    departmentId: string | null;
    issueTypeId: string | null;
    statusId: string;
    outletId?: string | null;

    approvedById?: string | null;
    attendedById?: string | null;

    issueCategory?: "TroubleShoot" | "Add/Replace";

    room?: Named | null;
    department?: Named | null;
    issueType?: Named | null;
    status?: Named | null;
    outlet?: Named | null;
};

function clsx(...xs: Array<string | false | null | undefined>) {
    return xs.filter(Boolean).join(" ");
}
function fmtDT(iso?: string | null) {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleString();
}

export default function TasksPage() {
    const [rows, setRows] = useState<TaskRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    const [statuses, setStatuses] = useState<Named[]>([]);
    const [approvers, setApprovers] = useState<StaffLite[]>([]);
    const [itStaff, setItStaff] = useState<StaffLite[]>([]);

    const [savingId, setSavingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    const [query, setQuery] = useState("");
    const [typing, setTyping] = useState(false);

    const [draftAction, setDraftAction] = useState<Record<string, string>>({});

    const closedStatusId = useMemo(
        () => statuses.find((x) => x.name.toLowerCase() === "closed")?.id ?? null,
        [statuses]
    );
    const assignedStatusId = useMemo(
        () => statuses.find((x) => x.name.toLowerCase() === "assigned")?.id ?? null,
        [statuses]
    );

    async function loadLists() {
        const [sRes, aRes, itRes] = await Promise.all([
            fetch("/api/statuses?q=", { cache: "no-store" }),
            fetch("/api/staff/approvers?q=", { cache: "no-store" }),
            fetch("/api/staff/it?q=", { cache: "no-store" }),
        ]);
        setStatuses(sRes.ok ? await sRes.json() : []);
        setApprovers(aRes.ok ? await aRes.json() : []);
        setItStaff(itRes.ok ? await itRes.json() : []);
    }

    async function loadTasks(q: string) {
        setLoading(true);
        setErr("");
        try {
            const tRes = await fetch(q ? `/api/tasks?q=${encodeURIComponent(q)}` : "/api/tasks", {
                cache: "no-store",
            });
            if (!tRes.ok) throw new Error(`Tasks failed (${tRes.status})`);
            const list = (await tRes.json()) as TaskRow[];
            setRows(list);
            setDraftAction({});
        } catch (e: any) {
            setErr(e?.message ?? "Failed to load tasks");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadLists();
        loadTasks("");
    }, []);

    useEffect(() => {
        setTyping(true);
        const t = setTimeout(() => {
            loadTasks(query.trim());
            setTyping(false);
        }, 300);
        return () => clearTimeout(t);
    }, [query]);

    async function patch(id: string, body: any): Promise<TaskRow> {
        const res = await fetch(`/api/tasks/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (!res.ok) {
            const j = await res.json().catch(() => ({} as any));
            throw new Error(j?.error ?? `Failed (${res.status})`);
        }
        return (await res.json()) as TaskRow;
    }

    async function updateStatus(id: string, statusId: string) {
        setSavingId(id);
        try {
            const updated = await patch(id, { statusId });
            setRows((rs) => rs.map((r) => (r.id === id ? updated : r)));
        } catch (e: any) {
            alert(e?.message);
        } finally {
            setSavingId(null);
        }
    }

    async function updateApprover(id: string, approvedById: string | null) {
        setSavingId(id);
        try {
            const updated = await patch(id, { approvedById });
            setRows((rs) => rs.map((r) => (r.id === id ? updated : r)));
        } catch (e: any) {
            alert(e?.message);
        } finally {
            setSavingId(null);
        }
    }

    async function updateAttendedBy(id: string, attendedById: string | null) {
        setSavingId(id);
        try {
            const updated = await patch(id, { attendedById });
            setRows((rs) => rs.map((r) => (r.id === id ? updated : r)));
        } catch (e: any) {
            alert(e?.message);
        } finally {
            setSavingId(null);
        }
    }

    async function updateIssueCategory(id: string, issueCategory: "TroubleShoot" | "Add/Replace") {
        setSavingId(id);
        try {
            const updated = await patch(id, { issueCategory });
            setRows((rs) => rs.map((r) => (r.id === id ? updated : r)));
        } catch (e: any) {
            alert(e?.message ?? "Failed to update category");
        } finally {
            setSavingId(null);
        }
    }

    async function saveActionTaken(id: string) {
        const val = (draftAction[id] ?? "").trim();
        setSavingId(id);
        try {
            const updated = await patch(id, { actionTaken: val });
            setRows((rs) => rs.map((r) => (r.id === id ? updated : r)));
            setDraftAction((d) => {
                const { [id]: _, ...rest } = d;
                return rest;
            });
        } catch (e: any) {
            alert(e?.message);
        } finally {
            setSavingId(null);
        }
    }

    async function doDelete() {
        if (!deleteId) return;
        try {
            setDeleting(true);
            const res = await fetch(`/api/tasks/${deleteId}`, { method: "DELETE" });
            if (!res.ok) {
                const j = await res.json().catch(() => ({} as any));
                throw new Error(j?.error ?? `Failed to delete (${res.status})`);
            }
            setRows((rs) => rs.filter((r) => r.id !== deleteId));
            setDeleteId(null);
        } catch (e: any) {
            alert(e?.message ?? "Failed to delete");
        } finally {
            setDeleting(false);
        }
    }

    return (
        <div className="p-4 space-y-4">
            {/* Header row with search */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-semibold">Tasks</h1>

                <div className="flex w-full max-w-xl items-center gap-2">
                    <div className="relative w-full">
                        <input
                            className="w-full rounded-full border px-9 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                            placeholder="Search by detail, room, department, outlet, status, issue, staff name/code, or date (YYYY-MM-DD)…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Search size={16} className="pointer-events-none absolute left-3 top-2.5 opacity-60" />
                    </div>
                    <Link
                        href="/tasks/new"
                        className="shrink-0 rounded-lg bg-black px-3 py-2 text-sm text-white hover:opacity-90 dark:bg-white dark:text-black"
                    >
                        New Task
                    </Link>
                </div>
            </div>

            {err ? <p className="text-sm text-red-600">{err}</p> : null}
            {typing ? <p className="text-xs opacity-60">Searching…</p> : null}

            <div className="overflow-auto rounded-2xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                <table className="w-full min-w-[1150px] border-collapse">
                    <thead>
                        <tr className="text-left text-sm">
                            <th className="border-b px-3 py-2 dark:border-neutral-700">#</th>
                            <th className="border-b px-3 py-2 dark:border-neutral-700">Date</th>
                            <th className="border-b px-3 py-2 dark:border-neutral-700">Room</th>
                            <th className="border-b px-3 py-2 dark:border-neutral-700">Department</th>
                            <th className="border-b px-3 py-2 dark:border-neutral-700">Outlet</th>
                            <th className="border-b px-3 py-2 dark:border-neutral-700">Issue</th>
                            <th className="border-b px-3 py-2 dark:border-neutral-700">Category</th>
                            <th className="border-b px-3 py-2 dark:border-neutral-700">Attended By</th>
                            <th className="border-b px-3 py-2 dark:border-neutral-700">Status</th>
                            <th className="border-b px-3 py-2 dark:border-neutral-700">Action Taken</th>
                            {/* ✅ NEW column */}
                            <th className="border-b px-3 py-2 dark:border-neutral-700">Closed Date</th>
                            <th className="border-b px-3 py-2 dark:border-neutral-700">Approved By</th>
                            <th className="border-b px-3 py-2 dark:border-neutral-700">Approved Date</th>
                            <th className="border-b px-3 py-2 text-right dark:border-neutral-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td className="px-3 py-3 text-sm opacity-70" colSpan={14}>
                                    <div className="flex items-center gap-2">
                                        <Loader2 size={16} className="animate-spin" />
                                        Loading…
                                    </div>
                                </td>
                            </tr>
                        ) : rows.length === 0 ? (
                            <tr>
                                <td className="px-3 py-3 text-sm opacity-70" colSpan={14}>
                                    No tasks found.
                                </td>
                            </tr>
                        ) : (
                            rows.map((r, i) => {
                                const isSaving = savingId === r.id;

                                const closedBlocked =
                                    closedStatusId !== null &&
                                    r.approvedById == null &&
                                    (r.issueCategory ?? "TroubleShoot") === "Add/Replace";

                                const assignedStatusIdLocal = assignedStatusId;
                                const canEditAction =
                                    !!(assignedStatusIdLocal && r.statusId === assignedStatusIdLocal && r.attendedById);
                                const canApprove = !!(r.actionTaken && r.actionTaken.trim().length > 0);
                                const draftVal = draftAction[r.id] ?? r.actionTaken ?? "";

                                return (
                                    <tr key={r.id} className="text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                                        <td className="align-top border-b px-3 py-3 dark:border-neutral-800">{i + 1}</td>
                                        <td className="align-top whitespace-nowrap border-b px-3 py-3 dark:border-neutral-800">
                                            {fmtDT(r.date)}
                                        </td>
                                        <td className="align-top border-b px-3 py-3 dark:border-neutral-800">
                                            {r.room?.name ?? "—"}
                                        </td>
                                        <td className="align-top border-b px-3 py-3 dark:border-neutral-800">
                                            {r.department?.name ?? "—"}
                                        </td>
                                        <td className="align-top border-b px-3 py-3 dark:border-neutral-800">
                                            {r.outlet?.name ?? "—"}
                                        </td>
                                        <td className="align-top border-b px-3 py-3 dark:border-neutral-800">
                                            {r.issueType?.name ?? "—"}
                                        </td>

                                        {/* Category radios */}
                                        <td className="ac-td px-3">
                                            <div className="flex items-center gap-3">
                                                {(["TroubleShoot", "Add/Replace"] as const).map((opt) => (
                                                    <label key={opt} className="inline-flex items-center gap-1.5 text-xs">
                                                        <input
                                                            type="radio"
                                                            name={`cat-${r.id}`}
                                                            className="h-4 w-4 accent-zinc-800 dark:accent-zinc-200"
                                                            checked={(r.issueCategory ?? "TroubleShoot") === opt}
                                                            onChange={() => updateIssueCategory(r.id, opt)}
                                                            disabled={isSaving}
                                                        />
                                                        <span>{opt}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </td>

                                        {/* Attended By */}
                                        <td className="align-top border-b px-3 py-3 dark:border-neutral-800">
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={r.attendedById || ""}
                                                    disabled={isSaving}
                                                    onChange={(e) => updateAttendedBy(r.id, e.target.value || null)}
                                                    className={clsx(
                                                        "max-w-[220px] rounded-lg border px-2 py-1 text-xs dark:border-neutral-700 dark:bg-neutral-900",
                                                        isSaving && "opacity-70"
                                                    )}
                                                >
                                                    <option value="">—</option>
                                                    {itStaff.map((s) => (
                                                        <option key={s.id} value={s.id}>
                                                            {s.name}
                                                            {s.staffCode ? ` (${s.staffCode})` : ""}
                                                        </option>
                                                    ))}
                                                </select>
                                                {isSaving ? <Loader2 size={14} className="animate-spin opacity-70" /> : null}
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="align-top border-b px-3 py-3 dark:border-neutral-800">
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={r.statusId}
                                                    disabled={isSaving}
                                                    onChange={(e) => updateStatus(r.id, e.target.value)}
                                                    className={clsx(
                                                        "rounded-lg border px-2 py-1 text-xs dark:border-neutral-700 dark:bg-neutral-900",
                                                        isSaving && "opacity-70"
                                                    )}
                                                    title={closedBlocked ? "Cannot close until approved (Add/Replace)" : undefined}
                                                >
                                                    {statuses.map((s) => (
                                                        <option
                                                            key={s.id}
                                                            value={s.id}
                                                            disabled={closedStatusId === s.id && closedBlocked}
                                                        >
                                                            {s.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {isSaving ? <Loader2 size={14} className="animate-spin opacity-70" /> : null}
                                            </div>
                                        </td>

                                        {/* Action Taken */}
                                        <td className="align-top border-b px-3 py-3 dark:border-neutral-800">
                                            <div className="flex items-start gap-2">
                                                <textarea
                                                    value={draftVal}
                                                    onChange={(e) => setDraftAction((d) => ({ ...d, [r.id]: e.target.value }))}
                                                    disabled={!canEditAction || isSaving}
                                                    rows={2}
                                                    placeholder={
                                                        canEditAction ? "Enter action taken…" : "Set Status=Assigned and Attended By"
                                                    }
                                                    className={clsx(
                                                        "min-w-[220px] rounded-lg border px-2 py-1 text-xs dark:border-neutral-700 dark:bg-neutral-900",
                                                        (!canEditAction || isSaving) && "opacity-60"
                                                    )}
                                                />
                                                <button
                                                    onClick={() => canEditAction && saveActionTaken(r.id)}
                                                    disabled={!canEditAction || isSaving}
                                                    className={clsx(
                                                        "mt-1 inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs hover:bg-gray-50 dark:border-neutral-700 dark:hover:bg-neutral-800",
                                                        (!canEditAction || isSaving) && "opacity-60 cursor-not-allowed"
                                                    )}
                                                    title={
                                                        canEditAction
                                                            ? "Save"
                                                            : "Action Taken allowed only when Assigned & Attended By is set"
                                                    }
                                                >
                                                    <Save size={14} /> Save
                                                </button>
                                            </div>
                                        </td>

                                        {/* ✅ Closed Date */}
                                        <td className="align-top whitespace-nowrap border-b px-3 py-3 dark:border-neutral-800">
                                            {fmtDT(r.closedDate)}
                                        </td>

                                        {/* Approved By */}
                                        <td className="align-top border-b px-3 py-3 dark:border-neutral-800">
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={r.approvedById || ""}
                                                    disabled={isSaving || !((r.actionTaken ?? "").trim().length > 0)}
                                                    onChange={(e) => updateApprover(r.id, e.target.value || null)}
                                                    className={clsx(
                                                        "max-w-[220px] rounded-lg border px-2 py-1 text-xs dark:border-neutral-700 dark:bg-neutral-900",
                                                        (isSaving || !((r.actionTaken ?? "").trim().length > 0)) &&
                                                        "opacity-60 cursor-not-allowed"
                                                    )}
                                                    title={
                                                        (r.actionTaken ?? "").trim().length > 0
                                                            ? undefined
                                                            : "Add and save Action Taken first"
                                                    }
                                                >
                                                    <option value="">—</option>
                                                    {approvers.map((a) => (
                                                        <option key={a.id} value={a.id}>
                                                            {a.name}
                                                            {a.staffCode ? ` (${a.staffCode})` : ""}
                                                        </option>
                                                    ))}
                                                </select>
                                                {isSaving ? <Loader2 size={14} className="animate-spin opacity-70" /> : null}
                                            </div>
                                        </td>

                                        {/* Approved Date */}
                                        <td className="align-top whitespace-nowrap border-b px-3 py-3 dark:border-neutral-800">
                                            {fmtDT(r.approvedDate)}
                                        </td>

                                        {/* Actions */}
                                        <td className="align-top border-b px-3 py-3 text-right dark:border-neutral-800">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/tasks/${r.id}`} title="Edit task">
                                                    <button className="rounded-lg p-1.5 hover:bg-gray-50 dark:hover:bg-neutral-800" aria-label="Edit">
                                                        <Edit3 size={16} />
                                                    </button>
                                                </Link>
                                                <button
                                                    className="rounded-lg p-1.5 hover:bg-gray-50 dark:hover:bg-neutral-800"
                                                    title="Delete task"
                                                    aria-label="Delete"
                                                    onClick={() => setDeleteId(r.id)}
                                                >
                                                    <Trash2 size={16} className="text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            <ConfirmDialog
                open={!!deleteId}
                title="Delete Task?"
                description="This action cannot be undone."
                confirmText={deleting ? "Deleting…" : "Confirm Delete"}
                cancelText="Cancel"
                onCancel={() => setDeleteId(null)}
                onConfirm={doDelete}
            />
        </div>
    );
}
