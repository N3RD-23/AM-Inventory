"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Plus, Edit3, Trash2, Check, X, Factory, MapPin, Building2, ListTree, Loader2, FolderTree, UserSquare2, ClipboardCheck, LandPlot, Bug, HousePlug, Pin } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm";
import { useToast } from "@/components/ui/toast";

type Kind = "brands" | "locations" | "departments" | "statuses" | "categories" | "designations" | "logs" | "outlets" | "rooms" | "issueTypes" | "models";
type Item = { id: string; name: string; createdAt?: string; updatedAt?: string };

const KIND_META: Record<Kind, { label: string; Icon: any }> = {
  brands: { label: "Brands", Icon: Factory },
  models: { label: "Models", Icon: Pin },
  locations: { label: "Locations", Icon: MapPin },
  departments: { label: "Departments", Icon: Building2 },
  statuses: { label: "Statuses", Icon: ListTree },
  categories: { label: "Categories", Icon: FolderTree },
  designations: { label: "Designations", Icon: UserSquare2 },
  logs: { label: "Logs", Icon: ClipboardCheck },
  outlets: { label: "Outlets", Icon: LandPlot },
  rooms: { label: "Rooms", Icon: HousePlug },
  issueTypes: { label: "Issue Types", Icon: Bug }
};

export default function ManageSimple({ kind }: { kind: Kind }) {
  const { label, Icon } = KIND_META[kind];
  const { push } = useToast();
  const qc = useQueryClient();

  // UI state
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{ id: string; name: string } | null>(null);

  // Queries
  const listUrl = kind === "statuses" ? "/api/statuses" : `/api/admin/${kind}`;
  const listQuery = useQuery<Item[]>({
    queryKey: ["admin", kind],
    queryFn: async () => {
      const r = await fetch(listUrl, { cache: "no-store" });
      if (!r.ok) {
        const body = await r.text().catch(() => "");
        throw new Error(`GET ${listUrl} -> ${r.status} ${body}`);
      }
      return r.json();
    },
  });

  const items = useMemo(() => {
    if (!listQuery.data) return [] as Item[];
    if (!search) return listQuery.data;
    const s = search.toLowerCase();
    return listQuery.data.filter((i) => i.name.toLowerCase().includes(s));
  }, [listQuery.data, search]);

  // Mutations
  const createMut = useMutation({
    mutationFn: async (name: string) => {
      const r = await fetch(`/api/admin/${kind}`, {
        method: "POST",
        body: JSON.stringify({ name }),
      });
      if (!r.ok) throw new Error(await r.text());
      return r.json();
    },
    onSuccess: () => {
      setNewName("");
      qc.invalidateQueries({ queryKey: ["admin", kind] });
      push({ title: `${label.slice(0, -1)} created`, kind: "success" });
    },
    onError: (e: any) => push({ title: e?.message ?? "Create failed", kind: "error" }),
  });

  const updateMut = useMutation({
    mutationFn: async (payload: { id: string; name: string }) => {
      const r = await fetch(`/api/admin/${kind}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error(await r.text());
      return r.json();
    },
    onSuccess: () => {
      setEditId(null);
      setEditName("");
      qc.invalidateQueries({ queryKey: ["admin", kind] });
      push({ title: `${label.slice(0, -1)} updated`, kind: "success" });
    },
    onError: (e: any) => push({ title: e?.message ?? "Update failed", kind: "error" }),
  });

  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      const r = await fetch(`/api/admin/${kind}?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (!r.ok) throw new Error(await r.text());
      return r.json();
    },
    onSuccess: () => {
      setPendingDelete(null);
      setConfirmOpen(false);
      qc.invalidateQueries({ queryKey: ["admin", kind] });
      push({ title: `${label.slice(0, -1)} deleted`, kind: "success" });
    },
    onError: (e: any) => push({ title: e?.message ?? "Delete failed", kind: "error" }),
  });

  function startEdit(item: Item) {
    setEditId(item.id);
    setEditName(item.name);
  }

  function cancelEdit() {
    setEditId(null);
    setEditName("");
  }

  function confirmDelete(item: Item) {
    setPendingDelete({ id: item.id, name: item.name });
    setConfirmOpen(true);
  }

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={18} className="opacity-80" />
          <h2 className="font-semibold">{label}</h2>
        </div>
        <div className="flex w-full sm:w-auto items-center gap-2">
          <input
            className="ac-input w-full sm:w-64"
            placeholder={`Search ${label.toLowerCase()}…`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Add new */}
      <div className="ac-card p-3">
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <input
            className="ac-input w-full"
            placeholder={`Add a new ${label.slice(0, -1)} (name)…`}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && newName.trim() && createMut.mutate(newName.trim())}
          />
          <button
            className="ac-btn shrink-0"
            disabled={!newName.trim() || createMut.isPending}
            onClick={() => createMut.mutate(newName.trim())}
          >
            {createMut.isPending ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} className="mr-1" />}
            Add
          </button>
        </div>
      </div>

      {/* List */}
      <div className="overflow-auto">
        <table className="ac-table">
          <thead>
            <tr>
              <th className="ac-th px-3 w-16">#</th>
              <th className="ac-th px-3">Name</th>
              <th className="ac-th px-3 w-40">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listQuery.isLoading && (
              <tr>
                <td className="ac-td px-3" colSpan={3}>
                  <div className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Loading…
                  </div>
                </td>
              </tr>
            )}

            {!listQuery.isLoading && items.length === 0 && (
              <tr>
                <td className="ac-td px-3 text-sm opacity-70" colSpan={3}>
                  No {label.toLowerCase()} found.
                </td>
              </tr>
            )}

            {items.map((it, idx) => (
              <tr key={it.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                <td className="ac-td px-3 text-sm opacity-70">{idx + 1}</td>

                {/* Name cell: inline edit when selected */}
                <td className="ac-td px-3">
                  {editId === it.id ? (
                    <input
                      className="ac-input"
                      autoFocus
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && editName.trim()) {
                          updateMut.mutate({ id: it.id, name: editName.trim() });
                        }
                        if (e.key === "Escape") cancelEdit();
                      }}
                    />
                  ) : (
                    <span className="text-sm">{it.name}</span>
                  )}
                </td>

                <td className="ac-td px-3">
                  <div className="flex items-center gap-2">
                    {editId === it.id ? (
                      <>
                        <button
                          className="ac-btn px-2"
                          disabled={!editName.trim() || updateMut.isPending}
                          onClick={() => editName.trim() && updateMut.mutate({ id: it.id, name: editName.trim() })}
                          title="Save"
                        >
                          {updateMut.isPending ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                        </button>
                        <button className="ac-btn px-2" onClick={cancelEdit} title="Cancel">
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="ac-btn px-2" onClick={() => startEdit(it)} title="Edit">
                          <Edit3 size={16} />
                        </button>
                        <button className="ac-btn px-2" onClick={() => confirmDelete(it)} title="Delete">
                          <Trash2 size={16} color="red" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Global confirm dialog for deletes */}
      <ConfirmDialog
        open={confirmOpen}
        title={`Delete ${label.slice(0, -1)}?`}
        description={`This will permanently delete “${pendingDelete?.name ?? ""}”.`}
        confirmText="Confirm Delete"
        cancelText="Cancel"
        onCancel={() => {
          setConfirmOpen(false);
          setPendingDelete(null);
        }}
        onConfirm={() => pendingDelete && deleteMut.mutate(pendingDelete.id)}
      />
    </div>
  );
}
