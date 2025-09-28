"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import LogsToolbar from "@/components/logs/logs-toolbar";

type LogRow = {
  id: string;
  action?: string | null;
  entity?: string | null;
  entityId?: string | null;
  actorEmail?: string | null;
  details?: string | null;
  createdAt?: string;
};

type LogsResponse = {
  items: LogRow[];
  page: number;
  take: number;
  total: number;
  pages: number;
  __debug?: any;
};

async function fetchLogs(params: Record<string, string>) {
  const url = new URL("/api/logs", window.location.origin);
  Object.entries(params).forEach(([k, v]) => v && url.searchParams.set(k, v));

  const res = await fetch(url.toString(), { cache: "no-store" });
  const ct = res.headers.get("content-type") || "";

  if (!ct.includes("application/json")) {
    const text = await res.text();
    throw new Error(
      `Expected JSON from ${url.pathname}, got "${ct}". First bytes:\n` +
      text.slice(0, 160)
    );
  }

  return res.json();
}

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return isNaN(d.getTime()) ? "" : d.toLocaleString();
}

// Locks page/body scrolling while this page is mounted
function useLockBodyScroll() {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
}

export default function LogsPage() {
  useLockBodyScroll();

  const sp = useSearchParams();
  const q = sp.get("q") ?? "";
  const from = sp.get("from") ?? "";
  const to = sp.get("to") ?? "";
  const page = sp.get("page") ?? "1";
  const take = sp.get("take") ?? "50";

  const { data, isLoading, error } = useQuery({
    queryKey: ["logs", q, from, to, page, take],
    queryFn: () => fetchLogs({ q, from, to, page, take }),
    keepPreviousData: false,
  });

  return (
    // 10px gap at the bottom, page itself cannot scroll
    <section className="h-[calc(100vh-10px)] max-h-[calc(100vh-10px)] overflow-hidden flex flex-col gap-3">
      {/* Toolbar stays visible */}
      <div className="shrink-0">
        <LogsToolbar />
      </div>

      <div className="ac-card overflow-hidden">
        <div className="max-h-[100vh] md:max-h-[calc(100vh-150px)] overflow-y-auto">
          {isLoading ? (
            <div className="p-4">Loading…</div>
          ) : error ? (
            <div className="p-4 text-red-400">{String(error)}</div>
          ) : (
            <table className="ac-table min-w-[1100px]">
              <thead className="sticky top-0 z-10 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40">
                <tr>
                  <th className="text-left px-3 py-2">Time</th>
                  <th className="text-left px-3 py-2">Action</th>
                  <th className="text-left px-3 py-2">Entity</th>
                  <th className="text-left px-3 py-2">Entity ID</th>
                  <th className="text-left px-3 py-2">Actor Email</th>
                  <th className="text-left px-3 py-2">ID</th>
                  <th className="text-left px-3 py-2">Details</th>
                </tr>
              </thead>
              <tbody>
                {(data?.items ?? []).map((row) => (
                  <tr key={row.id} className="border-t border-white/10 align-top">
                    <td className="px-3 py-2 whitespace-nowrap">
                      {formatDate(row.createdAt)}
                    </td>
                    <td className="px-3 py-2 font-mono text-xs">{row.action ?? ""}</td>
                    <td className="px-3 py-2 font-mono text-xs">{row.entity ?? ""}</td>
                    <td className="px-3 py-2 font-mono text-xs">{row.entityId ?? ""}</td>
                    <td className="px-3 py-2 font-mono text-xs">{row.actorEmail ?? ""}</td>
                    <td className="px-3 py-2 font-mono text-xs">{row.id}</td>
                    <td className="px-3 py-2 font-mono text-xs">{row.details ?? ""}</td>
                  </tr>
                ))}
                {(!data?.items || data.items.length === 0) && (
                  <tr>
                    <td className="px-3 py-6 text-center opacity-70" colSpan={7}>
                      No logs found for the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
