"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import { Edit3, Plus, Download, Trash2 as Trash2Icon } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import * as XLSX from "xlsx";
import { ConfirmDialog } from "@/components/ui/confirm";
import Papa from "papaparse";
import StaffComboBox from "./ui/staff-combobox";
import AssetHistoryModal from "@/components/asset-history-modal";

type Asset = {
  id: string;
  tag: string;
  category: string;
  model: string;
  brand?: { id: string; name: string } | null;
  serialNumber?: string | null;
  quantity: number;
  status: string;
  location?: { id: string; name: string } | null;
  staff?: { id: string; firstName: string; lastName: string; designation?: string | null } | null;
  department?: { id: string; name: string } | null;
  [key: string]: any;
};

type Field = { id: string; name: string; type: string; category: string };
type Option = { id: string; name: string };

export default function AssetTable() {
  const qc = useQueryClient();
  const { push } = useToast();

  const [category, setCategory] = useState<string>("ALL");
  const [search, setSearch] = useState("");

  // History modal state
  const [historyFor, setHistoryFor] = useState<{ id: string; tag: string } | null>(null);

  // Unified confirm state for deletes
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pending, setPending] = useState<{ id: string; tag: string } | null>(null);

  function askDelete(asset: { id: string; tag: string }) {
    setPending({ id: asset.id, tag: asset.tag });
    setConfirmOpen(true);
  }

  async function removeNow(id: string) {
    const res = await fetch(`/api/assets?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (res.ok) {
      push({ title: "Deleted", kind: "success" });
      // invalidate all asset lists (any category)
      qc.invalidateQueries({ queryKey: ["assets"] });
    } else {
      const t = await res.text().catch(() => "");
      push({ title: "Delete failed", description: t || undefined, kind: "error" });
    }
  }

  const { data: assets = [] } = useQuery<Asset[]>({
    queryKey: ["assets", category],
    queryFn: async () => {
      const res = await fetch("/api/assets?category=" + encodeURIComponent(category));
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
  });

  const cols = useMemo(() => {
    const base = ["tag", "model", "brand", "serialNumber", "quantity", "status", "location", "staff"];
    if (category === "PC") return [...base, "pcHostname", "processor", "ram", "hdd", "os", "serviceTag", "ipAddress"];
    if (category === "UPS" || category === "MONITOR") return [...base, "pcHostname", "employeeName", "department", "designation"];
    return base;
  }, [category]);

  const filtered = useMemo(() => {
    if (!search) return assets;
    const s = search.toLowerCase();
    return assets.filter((a) =>
      cols.some((c) => {
        const v =
          c === "brand" ? a.brand?.name :
            c === "location" ? a.location?.name :
              c === "department" ? a.department?.name :
                c === "staff"
                  ? (a.staff ? `${a.staff.firstName} ${a.staff.lastName}${a.staff.designation ? " – " + a.staff.designation : ""}` : "")
                  : a[c as keyof Asset];
        return (v ?? "").toString().toLowerCase().includes(s);
      })
    );
  }, [assets, cols, search]);

  function exportCSV() {
    const rows = filtered.map((a) => {
      const obj: any = {};
      cols.forEach((c) => {
        obj[c] =
          c === "brand" ? a.brand?.name :
            c === "location" ? a.location?.name :
              c === "department" ? a.department?.name :
                c === "staff"
                  ? (a.staff ? `${a.staff.firstName} ${a.staff.lastName}${a.staff.designation ? " – " + a.staff.designation : ""}` : "")
                  : (a as any)[c];
      });
      return obj;
    });
    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "assets.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportXLSX() {
    const rows = filtered.map((a) => {
      const obj: any = {};
      cols.forEach((c) => {
        obj[c] =
          c === "brand" ? a.brand?.name :
            c === "location" ? a.location?.name :
              c === "department" ? a.department?.name :
                c === "staff"
                  ? (a.staff ? `${a.staff.firstName} ${a.staff.lastName}${a.staff.designation ? " – " + a.staff.designation : ""}` : "")
                  : (a as any)[c];
      });
      return obj;
    });
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, "Assets");
    XLSX.writeFile(wb, "assets.xlsx");
  }

  return (
    <div className="space-y-3">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
        <div className="flex items-center gap-2">
          <select
            className="ac-select w-44"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>ALL</option>
            <option>PC</option>
            <option>MONITOR</option>
            <option>UPS</option>
          </select>
          <input
            className="ac-input w-64"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <AddAssetButton category={category} />
          <button className="ac-btn" onClick={exportCSV}>
            <Download size={16} className="mr-2" /> CSV
          </button>
          <button className="ac-btn" onClick={exportXLSX}>
            <Download size={16} className="mr-2" /> XLSX
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="ac-table">
          <thead>
            <tr>
              {cols.map((c) => (
                <th key={c} className="ac-th px-3 capitalize">{c}</th>
              ))}
              <th className="ac-th px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                {cols.map((c) => {
                  // clickable Tag -> open history modal
                  if (c === "tag") {
                    return (
                      <td key={c} className="ac-td px-3 text-sm">
                        <button
                          type="button"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setHistoryFor({ id: a.id, tag: a.tag });
                          }}
                          title="View change history"
                        >
                          {a.tag}
                        </button>
                      </td>
                    );
                  }
                  return (
                    <td key={c} className="ac-td px-3 text-sm">
                      {c === "brand"
                        ? a.brand?.name
                        : c === "location"
                          ? a.location?.name
                          : c === "department"
                            ? a.department?.name
                            : c === "staff"
                              ? (a.staff ? `${a.staff.firstName} ${a.staff.lastName}${a.staff.designation ? " – " + a.staff.designation : ""}` : "")
                              : (a as any)[c] ?? ""}
                    </td>
                  );
                })}
                <td className="ac-td px-3">
                  <div className="flex items-center gap-2">
                    <EditAssetButton asset={a} />
                    <button className="ac-btn" onClick={() => askDelete(a)} title="Delete asset">
                      <Trash2Icon width={16} height={16} color="red" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td className="ac-td px-3 text-sm opacity-70" colSpan={cols.length + 1}>
                  No assets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete confirm */}
      <ConfirmDialog
        open={confirmOpen}
        title="Delete asset?"
        description={`This will permanently delete asset “${pending?.tag ?? ""}”.`}
        confirmText="Confirm Delete"
        cancelText="Cancel"
        onCancel={() => {
          setConfirmOpen(false);
          setPending(null);
        }}
        onConfirm={() => {
          if (pending) removeNow(pending.id);
          setConfirmOpen(false);
          setPending(null);
        }}
      />

      {/* History modal */}
      {historyFor && (
        <AssetHistoryModal
          open
          assetId={historyFor.id}
          tag={historyFor.tag}
          onClose={() => setHistoryFor(null)}
        />
      )}
    </div>
  );
}

/* ----------------------- Add Asset ----------------------- */

function AddAssetButton({ category }: { category: string }) {
  const { push } = useToast();
  const qc = useQueryClient();

  const { data: fields = [] } = useQuery<Field[]>({
    queryKey: ["fields"],
    queryFn: async () => (await fetch("/api/admin/fields/list")).json(),
  });

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>({ category: category === "ALL" ? "PC" : category });

  const { data: brands = [] } = useQuery<Option[]>({
    queryKey: ["brands"],
    queryFn: async () => (await fetch("/api/brands")).json(),
  });
  const { data: locations = [] } = useQuery<Option[]>({
    queryKey: ["locations"],
    queryFn: async () => (await fetch("/api/locations")).json(),
  });
  const { data: statuses = [] } = useQuery<Option[]>({
    queryKey: ["statuses"],
    queryFn: async () => (await fetch("/api/statuses")).json(),
  });
  const { data: categories = [] } = useQuery<{ id: string; name: string; code?: string }[]>({
    queryKey: ["categories"],
    queryFn: async () => (await fetch("/api/categories")).json(),
  });
  const { data: staff = [] } = useQuery<any[]>({
    queryKey: ["staff"],
    queryFn: async () => (await fetch("/api/staff")).json(),
  });

  useEffect(() => {
    if (!open || !statuses.length) return;
    setForm((f: any) => (f.status ? f : { ...f, status: statuses[0].name }));
  }, [open, statuses]);

  useEffect(() => {
    if (!open || !categories.length) return;
    setForm((f: any) => (f.category ? f : { ...f, category: category === "ALL" ? categories[0].name : category }));
  }, [open, categories, category]);

  async function save() {
    const res = await fetch("/api/assets", { method: "POST", body: JSON.stringify(form) });
    if (res.ok) {
      push({ title: "Asset created", kind: "success" });
      setOpen(false);
      qc.invalidateQueries({ queryKey: ["assets"] });
    } else {
      const t = await res.text().catch(() => "");
      push({ title: "Error", description: t || undefined, kind: "error" });
    }
  }

  const cat = form.category;
  const catFields = fields.filter((f) => f.category === cat);

  return (
    <>
      <button className="ac-btn" onClick={() => setOpen(true)}>
        <Plus size={16} className="mr-2" /> Add Asset
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setOpen(false)}>
          <div className="ac-card w-full max-w-lg p-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold mb-3">New Asset</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs">Category</label>
                  <select
                    className="ac-select"
                    value={form.category || ""}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    disabled={!categories.length}
                  >
                    {!categories.length && <option value="">(no categories)</option>}
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <div className="text-xs opacity-70">Tag will be auto-assigned (e.g., PC-0001).</div>
                </div>
                <div>
                  <label className="text-xs">Model *</label>
                  <input
                    className="ac-input"
                    required
                    value={form.model || ""}
                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs">Brand</label>
                  <select
                    className="ac-select"
                    value={form.brandId || ""}
                    onChange={(e) => setForm({ ...form, brandId: e.target.value || null })}
                  >
                    <option value="">(none)</option>
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs">Location</label>
                  <select
                    className="ac-select"
                    value={form.locationId || ""}
                    onChange={(e) => setForm({ ...form, locationId: e.target.value || null })}
                  >
                    <option value="">(none)</option>
                    {locations.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs">Serial</label>
                  <input
                    className="ac-input"
                    value={form.serialNumber || ""}
                    onChange={(e) => setForm({ ...form, serialNumber: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs">Quantity</label>
                  <input
                    className="ac-input"
                    type="number"
                    value={form.quantity ?? 1}
                    onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="text-xs">Status</label>
                  <select
                    className="ac-select"
                    value={form.status || ""}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    disabled={!statuses.length}
                  >
                    {!statuses.length && <option value="">(no statuses)</option>}
                    {statuses.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="text-xs">Assign to Staff</label>
                  <StaffComboBox
                    value={form.staffId || null}
                    onChange={(id) => setForm({ ...form, staffId: id })}
                    options={staff}
                  />
                </div>
              </div>

              {/* Dynamic fields */}
              {catFields.length > 0 && (
                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <h4 className="text-sm font-medium mb-2">Custom Fields</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {catFields.map((f) => (
                      <div key={f.id}>
                        <label className="text-xs">{f.name}</label>
                        {f.type === "number" ? (
                          <input
                            className="ac-input"
                            type="number"
                            onChange={(e) => setForm({ ...form, ["cf_" + f.id]: e.target.value })}
                          />
                        ) : f.type === "date" ? (
                          <input
                            className="ac-input"
                            type="date"
                            onChange={(e) => setForm({ ...form, ["cf_" + f.id]: e.target.value })}
                          />
                        ) : (
                          <input
                            className="ac-input"
                            onChange={(e) => setForm({ ...form, ["cf_" + f.id]: e.target.value })}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3">
                <button className="ac-btn" onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <button
                  className="ac-btn"
                  onClick={save}
                  disabled={!form.model || !form.category || !form.status}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ----------------------- Edit Asset ----------------------- */

function EditAssetButton({ asset }: { asset: Asset }) {
  const { push } = useToast();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>({
    ...asset,
    brandId: asset.brand?.id ?? null,
    locationId: asset.location?.id ?? null,
    staffId: asset.staff?.id ?? null,
  });

  const { data: brands = [] } = useQuery<Option[]>({
    queryKey: ["brands"],
    queryFn: async () => (await fetch("/api/brands")).json(),
  });
  const { data: locations = [] } = useQuery<Option[]>({
    queryKey: ["locations"],
    queryFn: async () => (await fetch("/api/locations")).json(),
  });
  const { data: statuses = [] } = useQuery<Option[]>({
    queryKey: ["statuses"],
    queryFn: async () => (await fetch("/api/statuses")).json(),
  });

  useEffect(() => {
    if (!open || !statuses.length) return;
    setForm((f: any) => (f.status ? f : { ...f, status: statuses[0].name }));
  }, [open, statuses]);

  async function save() {
    const res = await fetch("/api/assets?id=" + encodeURIComponent(asset.id), {
      method: "PATCH",
      body: JSON.stringify(form),
    });
    if (res.ok) {
      push({ title: "Asset updated", kind: "success" });
      setOpen(false);
      qc.invalidateQueries({ queryKey: ["assets"] });
    } else {
      const t = await res.text().catch(() => "");
      push({ title: "Update failed", description: t || undefined, kind: "error" });
    }
  }

  return (
    <>
      <button className="ac-btn" onClick={() => setOpen(true)} title="Edit asset">
        <Edit3 size={16} />
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setOpen(false)}>
          <div className="ac-card w-full max-w-lg p-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold mb-3">Edit Asset</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs">Model</label>
                <input
                  className="ac-input"
                  value={form.model || ""}
                  onChange={(e) => setForm({ ...form, model: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs">Quantity</label>
                <input
                  className="ac-input"
                  type="number"
                  value={form.quantity ?? 1}
                  onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="text-xs">Brand</label>
                <select
                  className="ac-select"
                  value={form.brandId || ""}
                  onChange={(e) => setForm({ ...form, brandId: e.target.value || null })}
                >
                  <option value="">(none)</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs">Location</label>
                <select
                  className="ac-select"
                  value={form.locationId || ""}
                  onChange={(e) => setForm({ ...form, locationId: e.target.value || null })}
                >
                  <option value="">(none)</option>
                  {locations.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs">Status</label>
                <select
                  className="ac-select"
                  value={form.status || ""}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  disabled={!statuses.length}
                >
                  {!statuses.length && <option value="">(no statuses)</option>}
                  {statuses.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-2">
                <label className="text-xs">Assignee</label>
                <input
                  className="ac-input"
                  value={form.assignee || ""}
                  onChange={(e) => setForm({ ...form, assignee: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3">
              <button className="ac-btn" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className="ac-btn" onClick={save} disabled={!form.status || !form.model}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
