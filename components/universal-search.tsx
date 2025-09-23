"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  Loader2, Search as SearchIcon, X, User, Users, Monitor, Cpu, HardDrive, ListTree,
} from "lucide-react";
import Link from "next/link";

type StaffHit = {
  id: string;
  firstName: string;
  lastName: string;
  staffCode: string;
  designation?: { id: string; name: string } | null;
  department?: { id: string; name: string } | null;
  assetCount: number;
};
type UserHit = { id: string; email: string; name?: string | null; role?: string | null };

type SearchResponse = {
  q: string;
  role?: "ADMIN" | "TECH";
  staff: StaffHit[];
  staffAssets: Record<string, Array<{
    id: string;
    tag: string;
    model: string;
    category: "PC" | "MONITOR" | "UPS" | string;
    status: string;
    brand: string | null;
    location: string | null;
    updatedAt: string;
  }>>;
  users?: UserHit[];
  userLogs?: Record<string, Array<{
    id: string;
    action: string;
    entity: string;
    entityId: string;
    details: string | null;
    createdAt: string;
  }>>;
};

export default function UniversalSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const enabled = q.trim().length >= 2;

  const { data, isFetching, refetch } = useQuery<SearchResponse>({
    queryKey: ["universal-search", q],
    queryFn: async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`);
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    enabled: false,
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(v => !v);
        setTimeout(() => (document.getElementById("univ-q") as HTMLInputElement | null)?.focus(), 0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const staff = data?.staff ?? [];
  const users = data?.users ?? [];
  const role = data?.role;
  const totalHits = (staff?.length ?? 0) + (role === "ADMIN" ? users?.length ?? 0 : 0);

  return (
    // Right-aligned container
    <div className="relative ml-auto w-full sm:max-w-xl">
      {/* PILL BAR (no ac-input to avoid conflicts) */}
      <div className="flex h-10 items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 shadow-sm
                      dark:border-zinc-800 dark:bg-zinc-950">
        <SearchIcon className="h-4 w-4 opacity-60" />
        <input
          id="univ-q"
          className="h-full flex-1 bg-transparent text-sm outline-none placeholder:opacity-60"
          placeholder="Search staff (name or Staff ID) or users (name/email)…  ⌘K"
          value={q}
          onChange={e => setQ(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={e => {
            if (e.key === "Enter" && enabled) { refetch(); setOpen(true); }
            else if (e.key === "Escape") { setOpen(false); }
          }}
        />
        {q && (
          <button
            type="button"
            className="rounded-full p-1.5 text-xs opacity-70 hover:bg-zinc-100 hover:opacity-100 dark:hover:bg-zinc-800/60"
            onClick={() => setQ("")}
            title="Clear"
          >
            <X size={14} />
          </button>
        )}
        <button
          type="button"
          className="rounded-full bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:opacity-90
                     disabled:opacity-40 dark:bg-white dark:text-zinc-900"
          disabled={!enabled}
          onClick={() => { refetch(); setOpen(true); }}
        >
          {isFetching ? <Loader2 size={14} className="animate-spin" /> : "Search"}
        </button>
      </div>

      {/* RESULTS PANEL — anchored to the RIGHT edge of this container */}
      {open && (enabled || isFetching || data) && (
        <div
          className="absolute right-0 z-40 mt-2 w-[min(92vw,720px)] rounded-2xl border border-zinc-200 bg-white shadow-xl
                     dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="flex items-center justify-between border-b border-zinc-200 p-3 dark:border-zinc-800">
            <div className="text-sm opacity-80">Results {totalHits ? `(${totalHits})` : ""}</div>
            <button className="ac-btn px-2" onClick={() => setOpen(false)}>Close</button>
          </div>

          <div className="max-h-[60vh] space-y-6 overflow-auto p-3">
            {/* STAFF */}
            <section>
              <div className="mb-2 flex items-center gap-2">
                <Users size={16} className="opacity-70" />
                <h3 className="text-sm font-semibold">Staff</h3>
                <span className="text-xs opacity-60">{staff.length}</span>
              </div>

              {isFetching && (
                <div className="flex items-center gap-2 text-sm opacity-70">
                  <Loader2 size={14} className="animate-spin" /> Searching…
                </div>
              )}

              {!isFetching && staff.length === 0 && (
                <div className="text-sm opacity-60">No staff found.</div>
              )}

              {!isFetching && staff.length > 0 && (
                <div className="space-y-3">
                  {staff.map(s => {
                    const assets = data?.staffAssets?.[s.id] ?? [];
                    return (
                      <div key={s.id} className="ac-card p-3">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="font-medium">
                              {s.firstName} {s.lastName} {s.staffCode ? <span className="opacity-60">[#{s.staffCode}]</span> : null}
                            </div>
                            <div className="text-xs opacity-70">
                              {s.designation?.name ? `${s.designation.name} · ` : ""}
                              {s.department?.name ? `${s.department.name}` : ""}
                            </div>
                          </div>
                          <div className="text-sm opacity-80">{assets.length} assets</div>
                        </div>

                        {assets.length > 0 && (
                          <div className="mt-2 grid gap-2 sm:grid-cols-2">
                            {assets.slice(0, 6).map(a => (
                              <div key={a.id} className="rounded-xl border border-zinc-200 p-2 text-sm dark:border-zinc-800">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    {a.category === "PC" ? <Cpu size={14} /> : a.category === "MONITOR" ? <Monitor size={14} /> : <HardDrive size={14} />}
                                    <span className="font-medium">{a.tag}</span>
                                  </div>
                                  <span className="text-xs opacity-70">{a.status}</span>
                                </div>
                                <div className="mt-1 truncate text-xs opacity-70">
                                  {a.model} {a.brand ? `• ${a.brand}` : ""} {a.location ? `• ${a.location}` : ""}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-2 flex items-center gap-2">
                          <Link className="ac-btn px-2" href={`/assets?category=ALL`}>Open Inventory</Link>
                          {assets.length > 6 && <span className="text-xs opacity-60">+{assets.length - 6} more…</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* USERS (ADMIN only) */}
            {role === "ADMIN" && (
              <section>
                <div className="mb-2 flex items-center gap-2">
                  <User size={16} className="opacity-70" />
                  <h3 className="text-sm font-semibold">Users</h3>
                  <span className="text-xs opacity-60">{users.length}</span>
                </div>

                {!isFetching && users.length === 0 && (
                  <div className="text-sm opacity-60">No users found.</div>
                )}

                {!isFetching && users.length > 0 && (
                  <div className="space-y-3">
                    {users.map(u => {
                      const logs = data?.userLogs?.[u.email] ?? [];
                      return (
                        <div key={u.id} className="ac-card p-3">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="font-medium">{u.name || u.email}</div>
                              <div className="text-xs opacity-70">{u.email} {u.role ? `• ${u.role}` : ""}</div>
                            </div>
                            <div className="text-sm opacity-80">{logs.length} logs</div>
                          </div>

                          {logs.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {logs.slice(0, 5).map(l => (
                                <div key={l.id} className="rounded-lg border border-zinc-200 p-2 text-xs dark:border-zinc-800">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <ListTree size={12} />
                                      <span className="font-medium">{l.action}</span>
                                      <span className="opacity-70">• {l.entity} #{l.entityId}</span>
                                    </div>
                                    <span className="opacity-60">{new Date(l.createdAt).toLocaleString()}</span>
                                  </div>
                                  {l.details && <div className="mt-1 truncate opacity-70">{l.details}</div>}
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="mt-2 flex items-center gap-2">
                            <Link className="ac-btn px-2" href={`/logs`}>Open Logs</Link>
                            {logs.length > 5 && <span className="text-xs opacity-60">+{logs.length - 5} more…</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
