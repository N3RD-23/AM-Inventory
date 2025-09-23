"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SearchableSelectRemote from "@/components/inputs/SearchableSelectRemote";

type Named = { id: string; name: string };

function clsx(...xs: Array<string | false | null | undefined>) {
    return xs.filter(Boolean).join(" ");
}
function todayISO() {
    return new Date().toISOString().slice(0, 10);
}

export default function NewTaskPage() {
    const router = useRouter();

    const [roomId, setRoomId] = useState<string>("");
    const [issueTypeId, setIssueTypeId] = useState<string>(""); // optional
    const [departmentId, setDepartmentId] = useState<string>("");
    const [outletId, setOutletId] = useState<string>("");

    const [detail, setDetail] = useState("");

    // 🔹 Date mode: Today vs Backdate
    const [dateMode, setDateMode] = useState<"today" | "backdate">("today");
    const [backDate, setBackDate] = useState<string>(todayISO());

    const [departments, setDepartments] = useState<Named[]>([]);
    const [outlets, setOutlets] = useState<Named[]>([]);
    const [saving, setSaving] = useState(false);
    const [err, setErr] = useState<string>("");

    useEffect(() => {
        (async () => {
            try {
                const [d, o] = await Promise.all([
                    fetch("/api/departments?q=", { cache: "no-store" }),
                    fetch("/api/outlets?q=", { cache: "no-store" }),
                ]);
                setDepartments(d.ok ? await d.json() : []);
                setOutlets(o.ok ? await o.json() : []);
            } catch { }
        })();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErr("");

        if (!detail.trim()) {
            setErr("Detail is required.");
            return;
        }
        if (!departmentId && !outletId) {
            setErr("Select either a Department or an Outlet.");
            return;
        }

        try {
            setSaving(true);
            const payload: any = {
                // Optional backdate:
                ...(dateMode === "backdate" ? { date: backDate } : {}),
                roomId: roomId || null,
                departmentId: departmentId || null,
                outletId: outletId || null,
                issueTypeId: issueTypeId || null,
                detail: detail.trim(),
            };

            const res = await fetch("/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const j = await res.json().catch(() => ({} as any));
                throw new Error(j?.error ?? `Failed to create (${res.status})`);
            }

            // 🎯 redirect to list after success
            router.push("/tasks");
        } catch (e: any) {
            setErr(e?.message ?? "Failed to create task");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-6">
            <h1 className="mb-4 text-2xl font-semibold">Log Daily Task / Issue</h1>

            <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border bg-white p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                {/* Date mode toggle */}
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Date:</span>
                    <button
                        type="button"
                        className={clsx(
                            "rounded-lg border px-3 py-1.5 text-sm dark:border-neutral-700",
                            dateMode === "today" ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-gray-50 dark:hover:bg-neutral-800"
                        )}
                        onClick={() => setDateMode("today")}
                    >
                        Today
                    </button>
                    <button
                        type="button"
                        className={clsx(
                            "rounded-lg border px-3 py-1.5 text-sm dark:border-neutral-700",
                            dateMode === "backdate" ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-gray-50 dark:hover:bg-neutral-800"
                        )}
                        onClick={() => setDateMode("backdate")}
                    >
                        BackDate
                    </button>

                    {dateMode === "backdate" && (
                        <input
                            type="date"
                            className="ml-2 w-[180px] rounded-lg border px-3 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                            value={backDate}
                            onChange={(e) => setBackDate(e.target.value)}
                            max={todayISO()}
                            required
                        />
                    )}
                </div>

                {/* Room (optional) / Department (OR) */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <SearchableSelectRemote
                        endpoint="/api/rooms"
                        value={roomId}
                        onChange={(id) => setRoomId(id)}
                        label="Room (optional)"
                        placeholder="Type a room number (e.g. 104)…"
                    />
                    <SearchableSelectRemote
                        endpoint="/api/departments"
                        value={departmentId}
                        onChange={(id) => setDepartmentId(id)}
                        label="Department"
                        placeholder="Type a Department (e.g. HR)…"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Outlet */}
                    <SearchableSelectRemote
                        endpoint="/api/outlets"
                        value={outletId}
                        onChange={(id) => setOutletId(id)}
                        label="Outlet"
                        placeholder="Type an Outlet (e.g. Flores)…"
                    />

                    {/* Issue Type (optional, searchable) */}
                    <SearchableSelectRemote
                        endpoint="/api/issueTypes"
                        value={issueTypeId}
                        onChange={(id) => setIssueTypeId(id)}
                        label="Type of Issue (optional)"
                        placeholder="Type a keyword (e.g. Apple)…"
                    />
                </div>

                {/* Detail (required) */}
                <div>
                    <label className="mb-1 block text-sm font-medium">Detail *</label>
                    <textarea
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        rows={3}
                        placeholder="Describe the issue / task…"
                        className="w-full rounded-lg border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                        required
                    />
                </div>

                {err ? <p className="text-sm text-red-600">{err}</p> : null}

                <div className="flex items-center justify-end gap-2">
                    <button type="button" onClick={() => history.back()} className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 dark:border-neutral-700 dark:hover:bg-neutral-800">Cancel</button>
                    <button type="submit" disabled={saving} className={clsx("rounded-lg px-3 py-2 text-sm text-white", saving ? "bg-black/60 dark:bg-white/60" : "bg-black hover:opacity-90 dark:bg-white dark:text-black")}>
                        {saving ? "Saving…" : "Create"}
                    </button>
                </div>
            </form>
        </div>
    );
}
