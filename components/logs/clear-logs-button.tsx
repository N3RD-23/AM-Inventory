// components/logs/clear-logs-button.tsx
"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm";
import { useToast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

type DateRange = { from?: string; to?: string };

export default function ClearLogsButton({
    q = "",
    range,                               // ← external range from the toolbar
}: {
    q?: string;
    range?: DateRange;
}) {
    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const { push } = useToast();
    const router = useRouter();

    async function clearNow() {
        try {
            setSubmitting(true);
            const res = await fetch("/api/logs/clear", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    ...(q ? { q } : {}),
                    ...(range?.from ? { from: range.from } : {}),
                    ...(range?.to ? { to: range.to } : {}),
                }),
            });
            if (!res.ok) throw new Error(await res.text());
            const data = await res.json();
            push({ title: `Cleared ${data.deleted} log(s)`, kind: "success" });
            setOpen(false);
            router.refresh();
        } catch (err: any) {
            push({ title: "Clear logs failed", description: String(err?.message ?? err), kind: "error" });
        } finally {
            setSubmitting(false);
        }
    }

    const desc =
        q || range?.from || range?.to
            ? `This permanently deletes logs matching your current filter${range?.from || range?.to ? ` (range: ${range?.from || "…"} → ${range?.to || "…"})` : ""
            }.`
            : "This permanently deletes ALL logs.";

    return (
        <>
            <button
                className="ac-btn bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400"
                onClick={() => setOpen(true)}
            >
                <Trash2 size={16} className="mr-2" /> Clear Logs
            </button>

            <ConfirmDialog
                open={open}
                title="Clear logs?"
                description={`${desc} This cannot be undone.`}
                confirmText={submitting ? "Clearing…" : "Yes, clear logs"}
                cancelText="Cancel"
                onCancel={() => setOpen(false)}
                onConfirm={clearNow}
                disabled={submitting}
            />
        </>
    );
}
