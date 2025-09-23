"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import ClearLogsButton from "./clear-logs-button";
import RangeDatePicker from "@/components/ui/range-date-picker";

export default function LogExportButtons() {
    const [q, setQ] = useState("");
    const [range, setRange] = useState<{ from?: string; to?: string }>({});

    const run = (format: "csv" | "xlsx") => {
        const url = new URL("/api/logs/export", window.location.origin);
        if (q) url.searchParams.set("q", q);
        if (range.from) url.searchParams.set("from", range.from);
        if (range.to) url.searchParams.set("to", range.to);
        url.searchParams.set("format", format);
        window.location.href = url.toString();
    };

    return (
        <div className="flex flex-wrap items-center gap-4">
            <input
                className="ac-input h-9 w-48"
                placeholder="Search logs…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
            />
            <RangeDatePicker value={range} onChange={setRange} />

            <button className="ac-btn" onClick={() => run("csv")}>
                <Download size={16} className="mr-2" />
                CSV
            </button>
            <button className="ac-btn" onClick={() => run("xlsx")}>
                <Download size={16} className="mr-2" />
                XLSX
            </button>
            <ClearLogsButton />
        </div>
    );
}
