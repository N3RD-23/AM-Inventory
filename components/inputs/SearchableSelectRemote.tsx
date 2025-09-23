"use client";

import { useEffect, useRef, useState } from "react";

type Option = { id: string; name: string };

function clsx(...xs: Array<string | false | null | undefined>) {
    return xs.filter(Boolean).join(" ");
}

export default function SearchableSelectRemote({
    endpoint,
    value,
    onChange,
    placeholder = "Search…",
    label = "",
    required = false,
    minLength = 1,
}: {
    endpoint: string;
    value: string;
    onChange: (id: string, option?: Option | null) => void;
    placeholder?: string;
    label?: string;
    required?: boolean;
    minLength?: number;
}) {
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState("");
    const [items, setItems] = useState<Option[]>([]);
    const [loading, setLoading] = useState(false);
    const [highlight, setHighlight] = useState(0);
    const [selected, setSelected] = useState<Option | null>(null);

    const wrapRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (q.trim().length < minLength) {
            setItems([]);
            return;
        }
        const h = setTimeout(async () => {
            try {
                setLoading(true);
                const res = await fetch(`${endpoint}?q=${encodeURIComponent(q.trim())}`, { cache: "no-store" });
                const data = res.ok ? ((await res.json()) as Option[]) : [];
                setItems(data);
                setHighlight(0);
            } catch {
                setItems([]);
            } finally {
                setLoading(false);
            }
        }, 180);
        return () => clearTimeout(h);
    }, [endpoint, q, minLength]);

    useEffect(() => {
        if (!value) setSelected(null);
    }, [value]);

    useEffect(() => {
        function onDown(e: MouseEvent) {
            if (!wrapRef.current) return;
            if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
        }
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("mousedown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    function pick(option: Option) {
        setSelected(option);
        setQ(option.name);
        setOpen(false);
        onChange(option.id, option);
    }

    const showList = open && (q.trim().length >= minLength);

    return (
        <div className="relative" ref={wrapRef}>
            {label ? (
                <label className="mb-1 block text-sm font-medium">
                    {label} {required ? <span className="text-red-600">*</span> : null}
                </label>
            ) : null}

            <div className="flex items-center gap-2">
                <input
                    ref={inputRef}
                    type="text"
                    value={q}
                    placeholder={placeholder}
                    onChange={(e) => { setQ(e.target.value); setOpen(true); }}
                    onFocus={() => setOpen(true)}
                    onKeyDown={(e) => {
                        if (!showList || items.length === 0) return;
                        if (e.key === "ArrowDown") { e.preventDefault(); setHighlight((h) => Math.min(h + 1, items.length - 1)); }
                        else if (e.key === "ArrowUp") { e.preventDefault(); setHighlight((h) => Math.max(h - 1, 0)); }
                        else if (e.key === "Enter") { e.preventDefault(); const opt = items[highlight]; if (opt) pick(opt); }
                    }}
                    className="w-full rounded-lg border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                    required={required && !selected}
                />
                {/* {selected ? (
                    <button
                        type="button"
                        onClick={clear}
                        className="shrink-0 rounded-lg border px-2 py-1 text-xs hover:bg-gray-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
                    >
                        Clear
                    </button>
                ) : null} */}
            </div>

            {showList && (
                <div className="absolute z-50 mt-1 max-h-72 w-full overflow-auto rounded-xl border bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
                    {loading && <div className="px-3 py-2 text-sm opacity-70">Loading…</div>}
                    {!loading && items.length === 0 && <div className="px-3 py-2 text-sm opacity-70">No results</div>}
                    {!loading &&
                        items.map((it, idx) => (
                            <button
                                key={it.id}
                                type="button"
                                onMouseEnter={() => setHighlight(idx)}
                                onClick={() => pick(it)}
                                className={clsx(
                                    "flex w-full items-center px-3 py-2 text-left text-sm",
                                    idx === highlight ? "bg-gray-100 dark:bg-neutral-800" : "hover:bg-gray-50 dark:hover:bg-neutral-800/60"
                                )}
                            >
                                <span className="truncate">{it.name}</span>
                            </button>
                        ))
                    }
                </div>
            )}
        </div>
    );
}
