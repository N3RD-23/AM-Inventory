"use client";

import { useQuery } from "@tanstack/react-query";
import { Clock, User, X, History as HistoryIcon, FileText } from "lucide-react";
import { useEffect, useState } from "react";

type Event = {
    id: string;
    action: string | null;
    details: string | null;
    actorEmail: string | null;
    createdAt: string;
};

function fmtDT(iso?: string) {
    if (!iso) return "";
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? "" : d.toLocaleString();
}

function parseDetails(details?: string | null): Array<{ k: string; v: string }> {
    if (!details) return [];
    // Try JSON first
    try {
        const obj = JSON.parse(details);
        if (obj && typeof obj === "object") {
            return Object.entries(obj).map(([k, v]) => ({ k, v: String(v) }));
        }
    } catch { }
    // Fallback: key=value; key2=value2
    return details
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((pair) => {
            const [k, ...rest] = pair.split("=");
            return { k: k.trim(), v: rest.join("=").trim() };
        });
}

const ACTION_BADGE: Record<string, string> = {
    CREATE: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    UPDATE: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    DELETE: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
    ASSIGN: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
};

export default function AssetHistoryModal({
    assetId,
    tag,
    open,
    onClose,
}: {
    assetId: string;
    tag: string;
    open: boolean;
    onClose: () => void;
}) {
    const [showRaw, setShowRaw] = useState(false);

    const q = useQuery<{ events: Event[] }>({
        queryKey: ["asset-history", assetId],
        queryFn: async () => {
            const r = await fetch(`/api/assets/${assetId}/history`, { cache: "no-store" });
            if (!r.ok) throw new Error(await r.text());
            return r.json();
        },
        enabled: open,
    });

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        if (open) document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    const events = q.data?.events ?? [];

    return (
        <div className="fixed inset-0 z-[95] grid place-items-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative w-[95vw] max-w-3xl max-h-[92vh] overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                        <HistoryIcon size={18} className="opacity-80" />
                        <div className="min-w-0">
                            <h3 className="font-semibold truncate">Asset History</h3>
                            <div className="text-xs opacity-70 truncate">Tag: {tag}</div>
                        </div>
                    </div>
                    <button className="ac-btn px-2" onClick={onClose} aria-label="Close">
                        <X size={16} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4">
                    {q.isLoading ? (
                        <div className="flex items-center gap-2 text-sm opacity-70">
                            <Clock size={16} className="animate-spin" /> Loading…
                        </div>
                    ) : events.length === 0 ? (
                        <div className="text-sm opacity-70">No changes recorded for this asset yet.</div>
                    ) : (
                        <ul className="relative pl-6">
                            <div className="absolute left-[10px] top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
                            {events.map((e) => {
                                const action = (e.action ?? "").toUpperCase();
                                const badge =
                                    ACTION_BADGE[action] ??
                                    "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
                                const pairs = parseDetails(e.details);
                                return (
                                    <li key={e.id} className="relative mb-4 last:mb-0">
                                        <div className="absolute -left-[2px] top-1 h-2.5 w-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                                        <div className="ac-card p-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[11px] px-2 py-0.5 rounded-full ${badge}`}>{action || "EVENT"}</span>
                                                    <span className="text-xs opacity-70 inline-flex items-center gap-1">
                                                        <Clock size={12} /> {fmtDT(e.createdAt)}
                                                    </span>
                                                </div>
                                                <div className="text-xs opacity-80 inline-flex items-center gap-1">
                                                    <User size={12} /> {e.actorEmail ?? "system"}
                                                </div>
                                            </div>

                                            {pairs.length > 0 ? (
                                                <div className="mt-2 grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                                                    {pairs.map(({ k, v }, idx) => (
                                                        <div key={idx} className="flex">
                                                            <div className="w-40 shrink-0 opacity-60">{k}</div>
                                                            <div className="truncate">{v || "—"}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : e.details ? (
                                                <div className="mt-2 text-sm break-words opacity-80">{e.details}</div>
                                            ) : null}

                                            {e.details && (
                                                <button
                                                    className="mt-2 inline-flex items-center gap-1 text-xs opacity-70 hover:opacity-100"
                                                    onClick={() => setShowRaw((s) => !s)}
                                                >
                                                    <FileText size={12} /> {showRaw ? "Hide raw details" : "Show raw details"}
                                                </button>
                                            )}

                                            {showRaw && e.details && (
                                                <pre className="mt-2 text-[11px] whitespace-pre-wrap rounded-md border border-zinc-200 dark:border-zinc-800 p-2 bg-zinc-50 dark:bg-zinc-900/50">
                                                    {e.details}
                                                </pre>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-zinc-200 dark:border-zinc-800">
                    <button className="ac-btn" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}
