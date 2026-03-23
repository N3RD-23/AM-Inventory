"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";
import { Wifi, Router, Server, Network, Plus, Edit, Trash2, Upload } from "lucide-react";

interface NetworkDevice {
  id: string;
  type: "access" | "details";
  switchName?: string;
  mac?: string;
  serialNo?: string;
  port?: string;
  uplink?: string;
  sfpCoreSwPort?: string;
  ipAddress?: string;
  password?: string;
}

export default function NetworkPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [accessDevices, setAccessDevices] = useState<NetworkDevice[]>([]);
    const [detailsDevices, setDetailsDevices] = useState<NetworkDevice[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingDevice, setEditingDevice] = useState<NetworkDevice | null>(null);
    const [formData, setFormData] = useState<Partial<NetworkDevice>>({ type: "access" });
    const [uploadingAccess, setUploadingAccess] = useState(false);
    const [uploadingDetails, setUploadingDetails] = useState(false);
    const { push } = useToast();

    const networkItems = [
        { label: "ONT Zones", href: "/network/ont-zone", Icon: Wifi, count: 7 },
        { label: "AP Zones", href: "/network/ap", Icon: Router, count: 4 },
        { label: "Rack Zones", href: "/network/rack", Icon: Server, count: 23 },
    ];

    useEffect(() => {
        if (status === "loading") return;
        if (!session || (session.user as any)?.role !== "ADMIN") {
            router.push("/");
            return;
        }
        fetchDevices();
    }, [session, status, router]);

    const fetchDevices = async () => {
        try {
            const [accessRes, detailsRes] = await Promise.all([
                fetch("/api/network-devices?type=access"),
                fetch("/api/network-devices?type=details"),
            ]);
            if (accessRes.ok && detailsRes.ok) {
                const access = await accessRes.json();
                const details = await detailsRes.json();
                setAccessDevices(Array.isArray(access) ? access : []);
                setDetailsDevices(Array.isArray(details) ? details : []);
            } else {
                console.error("Failed to fetch devices");
                setAccessDevices([]);
                setDetailsDevices([]);
            }
        } catch (error) {
            console.error("Failed to fetch devices:", error);
            setAccessDevices([]);
            setDetailsDevices([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = editingDevice ? "PUT" : "POST";
            const url = editingDevice ? `/api/network-devices/${editingDevice.id}` : "/api/network-devices";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                fetchDevices();
                setShowModal(false);
                setEditingDevice(null);
                setFormData({ type: "access" });
                push({ title: editingDevice ? "Device updated successfully" : "Device added successfully", kind: "success" });
            } else {
                push({ title: "Failed to save device", kind: "error" });
            }
        } catch (error) {
            console.error("Failed to save device:", error);
            push({ title: "Failed to save device", kind: "error" });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this device?")) return;
        try {
            await fetch(`/api/network-devices/${id}`, { method: "DELETE" });
            fetchDevices();
            push({ title: "Device deleted successfully", kind: "success" });
        } catch (error) {
            console.error("Failed to delete device:", error);
            push({ title: "Failed to delete device", kind: "error" });
        }
    };

    const handleCsvImport = async (file: File, type: "access" | "details") => {
        const setUploading = type === "access" ? setUploadingAccess : setUploadingDetails;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("type", type);

            const res = await fetch("/api/network-devices/import", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                fetchDevices();
                push({ title: `${type === "access" ? "Network Access Details" : "Network Details"} imported successfully!`, kind: "success" });
            } else {
                const error = await res.json().catch(() => ({ error: "Unknown error" }));
                push({ title: `Import failed: ${error.error || "Unknown error"}`, kind: "error" });
            }
        } catch (error) {
            console.error("Failed to import CSV:", error);
            push({ title: "Failed to import CSV", kind: "error" });
        } finally {
            setUploading(false);
        }
    };

    const openModal = (device?: NetworkDevice) => {
        setEditingDevice(device || null);
        setFormData(device || { type: "access" });
        setShowModal(true);
    };

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="p-4 space-y-6">
            <div className="flex items-center gap-2">
                <Network size={24} />
                <h1 className="text-2xl font-semibold">Network</h1>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {networkItems.map(({ label, href, Icon, count }) => (
                    <Link
                        key={label}
                        href={href}
                        className="group relative rounded-2xl border border-zinc-200/70 dark:border-zinc-800
                       bg-white dark:bg-zinc-950 p-4 shadow-sm hover:shadow-md transition
                       focus:outline-none focus:ring-2 focus:ring-zinc-400/50 dark:focus:ring-zinc-600/50"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl
                                 bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300
                                 group-hover:scale-105 transition">
                                    <Icon size={18} />
                                </span>
                                <span className="text-sm font-medium opacity-80">{label}</span>
                            </div>
                            <div className="text-2xl font-semibold tabular-nums">{count}</div>
                        </div>
                        <div className="pointer-events-none absolute inset-x-0 -bottom-[1px] h-[2px] scale-x-0 origin-left
                            bg-gradient-to-r from-zinc-400/60 to-zinc-800/60 dark:from-zinc-700/60 dark:to-zinc-300/60
                            transition-transform group-hover:scale-x-100" />
                    </Link>
                ))}
            </div>

            {/* Network Access Details Table */}
            <div className="rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 h-[334px] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Network Access Details</h3>
                    <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
                            <Upload size={16} />
                            <span className="text-sm">{uploadingAccess ? "Uploading..." : "Import CSV"}</span>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleCsvImport(file, "access");
                                    e.target.value = "";
                                }}
                                className="hidden"
                                disabled={uploadingAccess}
                            />
                        </label>
                        <button onClick={() => openModal()} className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                            <Plus size={16} /> Add
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto flex-1 overflow-y-auto min-w-0">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-zinc-200 dark:border-zinc-800">
                                <th className="text-left p-2 font-medium">SWITCH</th>
                                <th className="text-left p-2 font-medium">MAC</th>
                                <th className="text-left p-2 font-medium">SERIAL NO</th>
                                <th className="text-left p-2 font-medium">PORT</th>
                                <th className="text-left p-2 font-medium">UPLINK</th>
                                <th className="text-left p-2 font-medium">SFP CORE SW PORT</th>
                                <th className="text-left p-2 font-medium">IP ADDRESS</th>
                                <th className="text-left p-2 font-medium">PASSWORD</th>
                                <th className="text-left p-2 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accessDevices.map((device) => (
                                <tr key={device.id} className="border-b border-zinc-100 dark:border-zinc-800">
                                    <td className="p-2 break-words max-w-[150px]">{device.switchName || "-"}</td>
                                    <td className="p-2 break-words max-w-[130px]">{device.mac || "-"}</td>
                                    <td className="p-2 break-words max-w-[140px]">{device.serialNo || "-"}</td>
                                    <td className="p-2 break-words max-w-[90px]">{device.port || "-"}</td>
                                    <td className="p-2 break-words max-w-[120px]">{device.uplink || "-"}</td>
                                    <td className="p-2 break-words max-w-[130px]">{device.sfpCoreSwPort || "-"}</td>
                                    <td className="p-2 break-words max-w-[140px]">{device.ipAddress || "-"}</td>
                                    <td className="p-2 break-words max-w-[130px]">{device.password || "-"}</td>
                                    <td className="p-2 flex gap-2">
                                        <button onClick={() => openModal(device)} className="text-blue-600 hover:text-blue-800">
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(device.id)} className="text-red-600 hover:text-red-800">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Network Details Table */}
            <div className="rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 h-[330px] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Network Details</h3>
                    <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
                            <Upload size={16} />
                            <span className="text-sm">{uploadingDetails ? "Uploading..." : "Import CSV"}</span>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleCsvImport(file, "details");
                                    e.target.value = "";
                                }}
                                className="hidden"
                                disabled={uploadingDetails}
                            />
                        </label>
                        <button onClick={() => openModal()} className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                            <Plus size={16} /> Add
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto flex-1 overflow-y-auto min-w-0">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-zinc-200 dark:border-zinc-800">
                                <th className="text-left p-2 font-medium">SWITCH</th>
                                <th className="text-left p-2 font-medium">MAC</th>
                                <th className="text-left p-2 font-medium">SERIAL NO</th>
                                <th className="text-left p-2 font-medium">PORT</th>
                                <th className="text-left p-2 font-medium">IP ADDRESS</th>
                                <th className="text-left p-2 font-medium">PASSWORD</th>
                                <th className="text-left p-2 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailsDevices.map((device) => (
                                <tr key={device.id} className="border-b border-zinc-100 dark:border-zinc-800">
                                    <td className="p-2 break-words max-w-[150px]">{device.switchName || "-"}</td>
                                    <td className="p-2 break-words max-w-[130px]">{device.mac || "-"}</td>
                                    <td className="p-2 break-words max-w-[140px]">{device.serialNo || "-"}</td>
                                    <td className="p-2 break-words max-w-[90px]">{device.port || "-"}</td>
                                    <td className="p-2 break-words max-w-[140px]">{device.ipAddress || "-"}</td>
                                    <td className="p-2 break-words max-w-[130px]">{device.password || "-"}</td>
                                    <td className="p-2 flex gap-2">
                                        <button onClick={() => openModal(device)} className="text-blue-600 hover:text-blue-800">
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(device.id)} className="text-red-600 hover:text-red-800">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-zinc-950 p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">{editingDevice ? "Edit" : "Add"} Network Device</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as "access" | "details" })}
                                className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                            >
                                <option value="access">Access</option>
                                <option value="details">Details</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Switch Name"
                                value={formData.switchName || ""}
                                onChange={(e) => setFormData({ ...formData, switchName: e.target.value })}
                                className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                            />
                            <input
                                type="text"
                                placeholder="MAC"
                                value={formData.mac || ""}
                                onChange={(e) => setFormData({ ...formData, mac: e.target.value })}
                                className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                            />
                            <input
                                type="text"
                                placeholder="Serial No"
                                value={formData.serialNo || ""}
                                onChange={(e) => setFormData({ ...formData, serialNo: e.target.value })}
                                className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                            />
                            <input
                                type="text"
                                placeholder="Port"
                                value={formData.port || ""}
                                onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                                className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                            />
                            {formData.type === "access" && (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Uplink"
                                        value={formData.uplink || ""}
                                        onChange={(e) => setFormData({ ...formData, uplink: e.target.value })}
                                        className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                                    />
                                    <input
                                        type="text"
                                        placeholder="SFP Core SW Port"
                                        value={formData.sfpCoreSwPort || ""}
                                        onChange={(e) => setFormData({ ...formData, sfpCoreSwPort: e.target.value })}
                                        className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                                    />
                                </>
                            )}
                            <input
                                type="text"
                                placeholder="IP Address"
                                value={formData.ipAddress || ""}
                                onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
                                className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={formData.password || ""}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                            />
                            <div className="flex gap-2">
                                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                                    {editingDevice ? "Update" : "Add"}
                                </button>
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700">
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