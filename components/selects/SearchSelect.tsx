"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Command, CommandInput, CommandList, CommandItem, CommandGroup } from "aceternityui/command";
import { Loader2 } from "lucide-react";

type Option = { id: string; name: string; staffCode?: string };

export function SearchSelect({
    endpoint,
    value,
    onChange,
    placeholder = "Search…",
    labelKey = "name",
    showRight = (o: Option) => o.staffCode ? o.staffCode : undefined,
}: {
    endpoint: string;              // e.g. "/api/rooms"
    value?: string | null;
    onChange: (id: string | null) => void;
    placeholder?: string;
    labelKey?: keyof Option;
    showRight?: (o: Option) => string | undefined;
}) {
    const [q, setQ] = useState("");
    const { data, isLoading } = useQuery({
        queryKey: [endpoint, q],
        queryFn: async () => {
            const res = await fetch(`${endpoint}?q=${encodeURIComponent(q)}`, { cache: "no-store" });
            if (!res.ok) throw new Error("Failed");
            return (await res.json()) as Option[];
        },
        keepPreviousData: true,
    });

    return (
        <div className="rounded-2xl border border-border/60 bg-card">
            <div className="flex items-center gap-2 px-3 py-2">
                <CommandInput value={q} onValueChange={setQ} placeholder={placeholder} />
                {isLoading && <Loader2 className="size-4 animate-spin ml-auto" />}
            </div>
            <Command className="max-h-64 overflow-auto">
                <CommandList>
                    <CommandGroup>
                        {(data ?? []).map((o) => (
                            <CommandItem
                                key={o.id}
                                onSelect={() => onChange(o.id)}
                                className={`flex items-center justify-between px-3 py-2 ${value === o.id ? "bg-primary/10" : ""}`}
                            >
                                <span className="truncate">{(o as any)[labelKey]}</span>
                                {showRight(o) && <span className="text-xs text-muted-foreground">{showRight(o)}</span>}
                            </CommandItem>
                        ))}
                        {(!data || data.length === 0) && !isLoading && (
                            <div className="p-3 text-sm text-muted-foreground">No results</div>
                        )}
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    );
}
