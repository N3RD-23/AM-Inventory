"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Upload, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface OntZoneEntry {
  id: string;
  room: string;
  fsanNo: string;
  mac: string;
  serialNo: string;
  zone: string;
}

export default function ONTZoneDetailPage() {
  const { zone: zoneParam } = useParams();
  const zoneValue = Array.isArray(zoneParam) ? zoneParam[0] : zoneParam;
  const zone = zoneValue ? decodeURIComponent(zoneValue) : "";
  const router = useRouter();
  const { push } = useToast();

  const [items, setItems] = useState<OntZoneEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<OntZoneEntry | null>(null);
  const [formData, setFormData] = useState<Partial<OntZoneEntry>>({ room: "", fsanNo: "", mac: "", serialNo: "", zone });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!zone) return;
    fetchEntries();
    setFormData({ room: "", fsanNo: "", mac: "", serialNo: "", zone });
  }, [zone]);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      // Pull entries directly from the API endpoint, optionally filtered by zone
      const url = zone ? `/api/ont-zones?zone=${encodeURIComponent(zone)}` : "/api/ont-zones";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to load entries");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setItems([]);
      push({ title: "Failed to fetch ONT entries", kind: "error" });
    } finally {
      setLoading(false);
    }
  };

  const upsertItem = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = { ...formData, zone };
    try {
      const url = editItem ? "/api/ont-zones" : "/api/ont-zones";
      const method = editItem ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, id: editItem?.id }),
      });

      if (res.ok) {
        fetchEntries();
        setShowModal(false);
        setEditItem(null);
        setFormData({ room: "", fsanNo: "", mac: "", serialNo: "", zone });
        push({ title: editItem ? "ONT entry updated" : "ONT entry added", kind: "success" });
      } else {
        const err = await res.json().catch(() => ({ error: "Unknown" }));
        push({ title: `Save failed: ${err.error || "Unknown"}`, kind: "error" });
      }
    } catch (error) {
      console.error(error);
      push({ title: "Save failed", kind: "error" });
    }
  };

  const deleteEntry = async (id: string) => {
    if (!confirm("Delete this ONT entry?")) return;
    try {
      const res = await fetch(`/api/ont-zones?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      fetchEntries();
      push({ title: "ONT entry deleted", kind: "success" });
    } catch (error) {
      console.error(error);
      push({ title: "Delete failed", kind: "error" });
    }
  };

  const importCsv = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("zone", zone);

      const res = await fetch("/api/ont-zones/import", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        fetchEntries();
        push({ title: `Imported ${data.count || 0} ONT entries`, kind: "success" });
      } else {
        push({ title: `Import failed: ${data.error || "unknown"}`, kind: "error" });
      }
    } catch (error) {
      console.error(error);
      push({ title: "Import failed", kind: "error" });
    } finally {
      setUploading(false);
    }
  };

  if (!zone) {
    return (
      <div className="p-4">
        <p>Zone not provided.</p>
        <Link href="/network/ont-zone" className="text-blue-600">Back to ONT zones</Link>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link href="/network/ont-zone" className="text-zinc-500 hover:text-blue-600">
            <ArrowLeft size={18} /> Back
          </Link>
          <h1 className="text-2xl font-semibold">ONT Zone: {zone}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
          <Upload size={16} />
          <span>{uploading ? "Uploading..." : "Import CSV"}</span>
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) importCsv(file);
              e.target.value = "";
            }}
            disabled={uploading}
          />
        </label>

        <button
          onClick={() => {
            setEditItem(null);
            setFormData({ room: "", fsanNo: "", mac: "", serialNo: "", zone });
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus size={16} /> Add Entry
        </button>
      </div>

      <div className="rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 h-[550px] overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1 overflow-y-auto min-w-0">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="text-left p-2 font-medium">ROOM</th>
                <th className="text-left p-2 font-medium">FSAN NO</th>
                <th className="text-left p-2 font-medium">MAC</th>
                <th className="text-left p-2 font-medium">SERIAL NO</th>
                <th className="text-left p-2 font-medium">ZONE</th>
                <th className="text-left p-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-4">Loading...</td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4">No ONT entries found</td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="p-2 break-words max-w-[140px]">{item.room}</td>
                    <td className="p-2 break-words max-w-[120px]">{item.fsanNo}</td>
                    <td className="p-2 break-words max-w-[140px]">{item.mac}</td>
                    <td className="p-2 break-words max-w-[140px]">{item.serialNo}</td>
                    <td className="p-2 break-words max-w-[130px]">{item.zone}</td>
                    <td className="p-2 flex gap-2">
                      <button
                        onClick={() => {
                          setEditItem(item);
                          setFormData(item);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteEntry(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-950 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">{editItem ? "Edit" : "Add"} ONT Entry</h3>
            <form onSubmit={upsertItem} className="space-y-3">
              <input
                type="text"
                placeholder="Room"
                value={formData.room ?? ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, room: e.target.value }))}
                className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                required
              />
              <input
                type="text"
                placeholder="FSAN NO"
                value={formData.fsanNo ?? ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, fsanNo: e.target.value }))}
                className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                required
              />
              <input
                type="text"
                placeholder="MAC"
                value={formData.mac ?? ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, mac: e.target.value }))}
                className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                required
              />
              <input
                type="text"
                placeholder="SERIAL NO"
                value={formData.serialNo ?? ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, serialNo: e.target.value }))}
                className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                required
              />
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
