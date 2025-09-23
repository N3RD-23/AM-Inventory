"use client";


import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm";


export default function ManageFields() {
  const { push } = useToast();
  const qc = useQueryClient();
  const [form, setForm] = useState({ name: "", type: "text", category: "PC" });


  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [pendingName, setPendingName] = useState<string>("");


  const { data } = useQuery<any[]>({
    queryKey: ["fields"],
    queryFn: async () => (await fetch("/api/admin/fields/list")).json(),
  });


  async function add() {
    const res = await fetch("/api/admin/fields", { method: "POST", body: JSON.stringify(form) });
    if (res.ok) { push({ title: "Field added", kind: "success" }); setForm({ name: "", type: "text", category: "PC" }); qc.invalidateQueries({ queryKey: ["fields"] }); }
    else push({ title: "Error", kind: "error" });
  }

  async function save(f: any) {
    const res = await fetch("/api/admin/fields", { method: "PATCH", body: JSON.stringify(f) });
    if (res.ok) { push({ title: "Saved", kind: "success" }); qc.invalidateQueries({ queryKey: ["fields"] }); }
    else push({ title: "Save failed", kind: "error" });
  }


  function askDelete(id: string, name: string) {
    setPendingId(id);
    setPendingName(name);
    setConfirmOpen(true);
  }


  async function removeNow(id: string) {
    const res = await fetch(`/api/admin/fields?id=${id}`, { method: "DELETE" });
    if (res.ok) { push({ title: "Deleted", kind: "success" }); qc.invalidateQueries({ queryKey: ["fields"] }); }
    else push({ title: "Delete failed", kind: "error" });
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2">
        <input className="ac-input col-span-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <select className="ac-select" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option>text</option><option>number</option><option>date</option>
        </select>
        <select className="ac-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          <option>PC</option><option>MONITOR</option><option>UPS</option>
        </select>
      </div>
      <div><button className="ac-btn" onClick={add}>Add</button></div>


      <div className="ac-card p-3">
        <table className="ac-table">
          <thead><tr><th className="ac-th px-3">name</th><th className="ac-th px-3">type</th><th className="ac-th px-3">category</th><th className="ac-th px-3">actions</th></tr></thead>
          <tbody>
            {(data || []).map((f) => (
              <tr key={f.id}>
                <td className="ac-td px-3"><input className="ac-input" defaultValue={f.name} onBlur={(e) => save({ ...f, name: e.currentTarget.value })} /></td>
                <td className="ac-td px-3">
                  <select className="ac-select" defaultValue={f.type} onChange={(e) => save({ ...f, type: e.currentTarget.value })}>
                    <option>text</option><option>number</option><option>date</option>
                  </select>
                </td>
                <td className="ac-td px-3">
                  <select className="ac-select" defaultValue={f.category} onChange={(e) => save({ ...f, category: e.currentTarget.value })}>
                    <option>PC</option><option>MONITOR</option><option>UPS</option>
                  </select>
                </td>
                <td className="ac-td px-3"><button className="ac-btn" onClick={() => askDelete(f.id, f.name)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete custom field?"
        description={`This will permanently delete “${pendingName}” and all of its values.`}
        confirmText="Confirm Delete"
        cancelText="Cancel"
        onCancel={() => { setConfirmOpen(false); setPendingId(null); setPendingName(""); }}
        onConfirm={() => { if (pendingId) removeNow(pendingId); setConfirmOpen(false); setPendingId(null); setPendingName(""); }}
      />
    </div>
  );
}