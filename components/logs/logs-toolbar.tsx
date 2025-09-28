"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Download, X } from "lucide-react";
import RangeDatePicker from "@/components/ui/range-date-picker";
import ClearLogsButton from "@/components/logs/clear-logs-button";

function useDebounced<T>(value: T, delay = 300) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return debounced;
}

export default function LogsToolbar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const initialQ = searchParams.get("q") ?? "";
    const initialFrom = searchParams.get("from") ?? "";
    const initialTo = searchParams.get("to") ?? "";

    const [q, setQ] = useState(initialQ);
    const [range, setRange] = useState<{ from?: string; to?: string }>({
        from: initialFrom || undefined,
        to: initialTo || undefined,
    });

    const debouncedQ = useDebounced(q, 300);

    const updateUrl = useCallback(
        (next: { q?: string; from?: string; to?: string }) => {
            const params = new URLSearchParams(searchParams.toString());

            // only set non-empty, otherwise delete
            const apply = (k: "q" | "from" | "to", v: string | undefined) => {
                if (v && v.trim()) params.set(k, v.trim());
                else params.delete(k);
            };

            if (next.q !== undefined) apply("q", next.q);
            if (next.from !== undefined) apply("from", next.from);
            if (next.to !== undefined) apply("to", next.to);

            params.delete("page"); // reset pagination on filter change

            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
            router.refresh(); // force RSC to read new params
        },
        [pathname, router, searchParams]
    );

    useEffect(() => {
        if (debouncedQ !== initialQ) updateUrl({ q: debouncedQ });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedQ]);

    useEffect(() => {
        updateUrl({ from: range.from, to: range.to });
    }, [range.from, range.to, updateUrl]);

    const run = (format: "csv" | "xlsx") => {
        const url = new URL("/api/logs/export", window.location.origin);

        // copy current filters but never leak a "format" from the URL
        const qp = new URLSearchParams(window.location.search);
        qp.delete("format");
        qp.forEach((v, k) => url.searchParams.set(k, v));
        url.searchParams.set("format", format);

        const a = document.createElement("a");
        a.href = url.toString();
        a.target = "_blank";
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    const clearQ = () => setQ("");
    const clearDates = () => setRange({ from: undefined, to: undefined });

    return (
        <div className="w-full flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[220px]">
                <input
                    className="ac-input h-9 w-full pr-8"
                    placeholder="Search logs…"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                />
                {q && (
                    <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
                        onClick={clearQ}
                        aria-label="Clear search"
                        type="button"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            <RangeDatePicker
                value={range}
                onChange={setRange}
                className="w-[320px] shrink-0"
            />
            {(range.from || range.to) && (
                <button className="ac-btn shrink-0" type="button" onClick={clearDates}>
                    <X size={16} className="mr-2" />
                    Clear Dates
                </button>
            )}

            <button className="ac-btn shrink-0" onClick={() => run("csv")}>
                <Download size={16} className="mr-2" /> CSV
            </button>
            <button className="ac-btn shrink-0" onClick={() => run("xlsx")}>
                <Download size={16} className="mr-2" /> XLSX
            </button>

            <div className="ml-auto shrink-0">
                <ClearLogsButton
                    q={searchParams.get("q") ?? ""}
                    range={{
                        from: searchParams.get("from") ?? undefined,
                        to: searchParams.get("to") ?? undefined,
                    }}
                />
            </div>
        </div>
    );
}
