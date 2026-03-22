"use client";

import { useState } from "react";
import Link from "next/link";
import SidebarNav from "@/components/nav/SidebarNav"; // the component with sub-menus
import type { Role } from "@/components/nav/nav-data";
import { LogOut, Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { logUserActivity } from "@/lib/user-activity";

export default function LayoutShell({
    role,
    children,
}: {
    role?: Role;
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: session } = useSession();

    const handleLogout = async () => {
        // Log logout activity
        if (session?.user) {
            await logUserActivity({
                userId: (session.user as any).id || "unknown",
                userEmail: session.user.email || "unknown",
                userName: session.user.name || undefined,
                action: "logout",
            }).catch(console.error);
        }
        // Sign out
        await signOut({ callbackUrl: "/sign-in" });
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr]">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="px-4 py-3 font-semibold">AM Inventory</div>
                <SidebarNav role={role} />
            </aside>

            {/* Right column: header + content */}
            <div className="flex min-h-screen flex-col">
                {/* Header */}
                <header className="sticky top-0 z-40 flex items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur px-3 py-2">
                    <div className="flex items-center gap-2">
                        {/* Mobile menu button */}
                        <button
                            className="lg:hidden ac-btn px-3"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu size={18} />
                        </button>
                        <Link href="/" className="font-semibold">Dashboard</Link>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* your theme toggle, breadcrumbs, etc can live here */}
                        <button 
                            onClick={handleLogout}
                            className="ac-btn px-3" 
                            aria-label="Sign out"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-4">{children}</main>
            </div>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* scrim */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setMobileOpen(false)}
                    />
                    {/* panel */}
                    <div className="absolute left-0 top-0 h-full w-[85%] max-w-[320px] bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 shadow-xl">
                        <div className="px-4 py-3 font-semibold">AM Inventory</div>
                        <SidebarNav role={role} onNavigate={() => setMobileOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}
