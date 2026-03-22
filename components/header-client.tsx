"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { logUserActivity } from "@/lib/user-activity";
import { Menu, LogOut, Moon } from "lucide-react";
import MobileMenu from "@/components/mobile-menu";
import DesktopNav from "@/components/desktop-nav";

export default function HeaderClient({ role }: { role?: "ADMIN" | "TECH" }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const { data: session } = useSession();

    // Force dark mode (belt-and-suspenders; keep <html className="dark"> in layout too)
    useEffect(() => {
        document.documentElement.classList.add("dark");
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        const body = document.body;
        if (menuOpen) body.classList.add("overflow-hidden");
        else body.classList.remove("overflow-hidden");
        return () => body.classList.remove("overflow-hidden");
    }, [menuOpen]);

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
        <header className="sticky top-0 z-40 border-b border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-950/70 backdrop-blur supports-[backdrop-filter]:bg-white/40 supports-[backdrop-filter]:dark:bg-zinc-950/40">
            <div className="mx-auto max-w-7xl px-3 sm:px-4">
                <div className="flex h-14 items-center justify-between">
                    {/* Left: brand */}
                    <div className="flex min-w-0 items-center gap-3">
                        <button
                            aria-label="Open menu"
                            className="ac-btn px-2 md:hidden"
                            onClick={() => setMenuOpen(true)}
                        >
                            <Menu size={18} />
                        </button>
                        <Link href="/" className="flex shrink-0 items-center gap-2">
                            <span className="truncate font-semibold">Twin Islands PVT LTD</span>
                        </Link>
                    </div>

                    {/* Center: desktop nav */}
                    <div className="hidden md:block">
                        <DesktopNav role={role} />
                    </div>

                    {/* Right: (dark indicator for spacing), logout */}
                    <div className="flex items-center gap-2">
                        {/* <span className="ac-btn px-2 pointer-events-none opacity-60" aria-hidden>
                            <Moon size={18} />
                        </span> */}
                        <button className="ac-btn px-2" onClick={handleLogout} title="Logout">
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile sheet */}
            <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} role={role} />
        </header>
    );
}
