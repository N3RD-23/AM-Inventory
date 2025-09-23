"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";

export type StaffOption = {
    id: string;
    firstName: string;
    lastName: string;
    staffCode?: string | null;
    designation?: { id: string; name: string } | null;
    department?: { id: string; name: string } | null;
};

export function formatStaff(o?: StaffOption | null) {
    if (!o) return "";
    const name = `${o.firstName} ${o.lastName}`.trim();
    const pieces = [
        name,
        o.designation?.name ? `– ${o.designation.name}` : "",
        o.department?.name ? ` (${o.department.name})` : "",
        o.staffCode ? ` [${o.staffCode}]` : "",
    ];
    return pieces.join("").trim();
}

export default function StaffComboBox({
    value,
    onChange,
    options,
    disabled,
    placeholder = "Search Name/Staff ID…",
    buttonClassName = "ac-select w-full",
}: {
    value: string | null;
    onChange: (id: string | null) => void;
    options: StaffOption[];
    disabled?: boolean;
    placeholder?: string;
    buttonClassName?: string;
}) {
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState("");
    const [hover, setHover] = useState(0);
    const rootRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const selected = useMemo(
        () => options.find(o => o.id === value) || null,
        [options, value],
    );

    const filtered = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return options.slice(0, 100);
        return options
            .filter(o => {
                const name = `${o.firstName} ${o.lastName}`.toLowerCase();
                const code = (o.staffCode ?? "").toLowerCase();
                return name.includes(s) || code.includes(s);
            })
            .slice(0, 100);
    }, [options, q]);

    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!rootRef.current) return;
            if (!rootRef.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, []);

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 0);
        } else {
            setQ("");
            setHover(0);
        }
    }, [open]);

    function choose(o: StaffOption | null) {
        onChange(o ? o.id : null);
        setOpen(false);
    }

    return (
        <div ref={rootRef} className="relative">
            <button
                type="button"
                className={buttonClassName}
                disabled={disabled}
                onClick={() => setOpen(o => !o)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <div className="flex items-center justify-between">
                    <span className={selected ? "" : "opacity-60"}>
                        {selected ? formatStaff(selected) : "Assign to Staff"}
                    </span>
                    <ChevronDown size={16} className="opacity-70" />
                </div>
            </button>

            {open && (
                <div
                    className="absolute z-50 mt-1 w-full rounded-xl border border-zinc-200 bg-white shadow-lg
                     dark:border-zinc-800 dark:bg-zinc-900"
                    role="listbox"
                    aria-activedescendant={filtered[hover]?.id}
                >
                    <div className="p-2 border-b border-zinc-200 dark:border-zinc-800">
                        <div className="relative">
                            <Search className="absolute right-3 top-2.5 h-4 w-4 opacity-60" />
                            <input
                                ref={inputRef}
                                value={q}
                                onChange={e => setQ(e.target.value)}
                                placeholder={placeholder}
                                className="ac-input pl-8 pr-8"
                                onKeyDown={e => {
                                    if (e.key === "ArrowDown") {
                                        e.preventDefault();
                                        setHover(h => Math.min(h + 1, filtered.length - 1));
                                    } else if (e.key === "ArrowUp") {
                                        e.preventDefault();
                                        setHover(h => Math.max(h - 1, 0));
                                    } else if (e.key === "Enter") {
                                        e.preventDefault();
                                        const o = filtered[hover];
                                        if (o) choose(o);
                                    } else if (e.key === "Escape") {
                                        setOpen(false);
                                    }
                                }}
                            />
                            {q && (
                                <button
                                    className="absolute right-2 top-2.5 h-4 w-4 opacity-60 hover:opacity-100"
                                    onClick={() => setQ("")}
                                    type="button"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="max-h-64 overflow-auto py-1">
                        {/* Clear option */}
                        <div
                            className={`px-3 py-1.5 text-sm cursor-pointer select-none
                ${hover === -1 ? "bg-zinc-100 dark:bg-zinc-800/70" : ""}`}
                            onMouseEnter={() => setHover(-1)}
                            onClick={() => choose(null)}
                        >
                            (unassigned)
                        </div>

                        {filtered.length === 0 && (
                            <div className="px-3 py-2 text-sm opacity-70">No matches</div>
                        )}

                        {filtered.map((o, i) => (
                            <div
                                key={o.id}
                                id={o.id}
                                role="option"
                                aria-selected={o.id === value}
                                className={`px-3 py-1.5 text-sm cursor-pointer select-none
                  ${i === hover ? "bg-zinc-100 dark:bg-zinc-800/70" : ""}
                `}
                                onMouseEnter={() => setHover(i)}
                                onClick={() => choose(o)}
                                title={formatStaff(o)}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <span className="truncate">{o.firstName} {o.lastName}</span>
                                    <span className="truncate text-xs opacity-70">
                                        {o.designation?.name ? `${o.designation.name} · ` : ""}
                                        {o.department?.name ? `${o.department.name} · ` : ""}
                                        {o.staffCode ? `#${o.staffCode}` : ""}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
