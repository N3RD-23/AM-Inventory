"use client";


import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm";


export default function ManageUsers() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string>("");

  const { push } = useToast();
  const qc = useQueryClient();


  // Create form
  const [form, setForm] = useState({ email: "", name: "", role: "TECH", password: "" });


  // Row editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<{ email: string; name: string; role: string; password?: string }>({
    email: "",
    name: "",
    role: "TECH",
    password: "",
  });


  const { data } = useQuery<any[]>({
    queryKey: ["users"],
    queryFn: async () => (await fetch("/api/admin/users")).json(),
  });

  async function add() {
    const res = await fetch("/api/admin/users", { method: "POST", body: JSON.stringify(form) });
    if (res.ok) {
      push({ title: "User created", kind: "success" });
      setForm({ email: "", name: "", role: "TECH", password: "" });
      qc.invalidateQueries({ queryKey: ["users"] });
    } else push({ title: "Error", kind: "error" });
  }

  function askDelete(u: any) {
    setPendingId(u.id);
    setPendingEmail(u.email);
    setConfirmOpen(true);
  }


  async function removeNow(id: string) {
    const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    if (res.ok) { push({ title: "Deleted", kind: "success" }); qc.invalidateQueries({ queryKey: ["users"] }); }
    else push({ title: "Delete failed", kind: "error" });
  }


  async function save(u: any) {
    const res = await fetch("/api/admin/users", { method: "PATCH", body: JSON.stringify(u) });
    if (res.ok) {
      push({ title: "Saved", kind: "success" });
      setEditingId(null);
      setDraft({ email: "", name: "", role: "TECH", password: "" });
      qc.invalidateQueries({ queryKey: ["users"] });
    } else push({ title: "Save failed", kind: "error" });
  }

  function startEdit(u: any) {
    setEditingId(u.id);
    setDraft({ email: u.email ?? "", name: u.name ?? "", role: u.role ?? "TECH", password: "" });
  }


  function cancelEdit() {
    setEditingId(null);
    setDraft({ email: "", name: "", role: "TECH", password: "" });
  }


  return (
    <div className="space-y-3">
      {/* Create new user */}
      <div className="grid grid-cols-4 gap-2">
        <input className="ac-input" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="ac-input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <select className="ac-select" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option>TECH</option>
          <option>ADMIN</option>
        </select>
        <input className="ac-input" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      </div>
      <div>
        <button className="ac-btn" onClick={add}>
          Create
        </button>
      </div>

      {/* Users table */}
      <div className="ac-card p-3 overflow-auto">
        <table className="ac-table">
          <thead>
            <tr>
              <th className="ac-th px-3">email</th>
              <th className="ac-th px-3">name</th>
              <th className="ac-th px-3">role</th>
              <th className="ac-th px-3">new password</th>
              <th className="ac-th px-3">actions</th>
            </tr>
          </thead>
          <tbody>
            {(data || []).map((u) => {
              const isEditing = editingId === u.id;
              return (
                <tr key={u.id}>
                  <td className="ac-td px-3">
                    {isEditing ? (
                      <input
                        className="ac-input min-w-64"
                        value={draft.email}
                        onChange={(e) => setDraft({ ...draft, email: e.currentTarget.value })}
                      />
                    ) : (
                      <span>{u.email}</span>
                    )}
                  </td>
                  <td className="ac-td px-3">
                    {isEditing ? (
                      <input
                        className="ac-input"
                        value={draft.name}
                        onChange={(e) => setDraft({ ...draft, name: e.currentTarget.value })}
                      />
                    ) : (
                      <span>{u.name ?? ""}</span>
                    )}
                  </td>
                  <td className="ac-td px-3">
                    {isEditing ? (
                      <select
                        className="ac-select"
                        value={draft.role}
                        onChange={(e) => setDraft({ ...draft, role: (e.target as HTMLSelectElement).value })}
                      >
                        <option>TECH</option>
                        <option>ADMIN</option>
                      </select>
                    ) : (
                      <span>{u.role}</span>
                    )}
                  </td>
                  <td className="ac-td px-3">
                    {isEditing ? (
                      <input
                        className="ac-input"
                        type="password"
                        placeholder="Set new password"
                        value={draft.password ?? ""}
                        onChange={(e) => setDraft({ ...draft, password: e.currentTarget.value })}
                      />
                    ) : (
                      <span className="opacity-60">—</span>
                    )}
                  </td>
                  <td className="ac-td px-3 space-x-2 whitespace-nowrap">
                    {isEditing ? (
                      <>
                        <button
                          className="ac-btn"
                          onClick={() => save({ id: u.id, email: draft.email, name: draft.name, role: draft.role, password: draft.password })}
                        >
                          Save
                        </button>
                        <button className="ac-btn" onClick={cancelEdit}>Cancel</button>
                        <button className="ac-btn" onClick={() => askDelete(u)}>Delete</button>
                      </>
                    ) : (
                      <>
                        <button className="ac-btn" onClick={() => startEdit(u)}>Edit</button>
                        <button className="ac-btn" onClick={() => askDelete(u)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete user?"
        description={`This will permanently delete “${pendingEmail}”.`}
        confirmText="Confirm Delete"
        cancelText="Cancel"
        onCancel={() => { setConfirmOpen(false); setPendingId(null); setPendingEmail(""); }}
        onConfirm={() => { if (pendingId) removeNow(pendingId); setConfirmOpen(false); setPendingId(null); setPendingEmail(""); }}
      />
    </div>
  );
}