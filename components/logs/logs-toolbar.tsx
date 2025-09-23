"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import RangeDatePicker from "@/components/ui/range-date-picker";
import ClearLogsButton from "@/components/logs/clear-logs-button";

export default function LogsToolbar() {
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
        <div className="w-full flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Left cluster: search + range */}
            <input
                className="ac-input h-9 flex-1 min-w-[220px]"
                placeholder="Search logs…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
            />
            <RangeDatePicker
                value={range}
                onChange={setRange}
                className="w-[320px] shrink-0"
            />

            {/* CSV / XLSX stay next to the left cluster */}
            <button className="ac-btn shrink-0" onClick={() => run("csv")}>
                <Download size={16} className="mr-2" /> CSV
            </button>
            <button className="ac-btn shrink-0" onClick={() => run("xlsx")}>
                <Download size={16} className="mr-2" /> XLSX
            </button>

            {/* Push Clear Logs to the far right */}
            <div className="ml-auto shrink-0">
                <ClearLogsButton q={q} range={range} />
            </div>
        </div>
    );
}
