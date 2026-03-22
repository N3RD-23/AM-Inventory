"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import SidebarNav from "./nav/SidebarNav";
import { signOut, useSession } from "next-auth/react";
import { logUserActivity } from "@/lib/user-activity";
import {
    LayoutGrid, Package2, Users,
    Factory, MapPin, Building2, FileCog, ListTree,
    RectangleEllipsis,
    Contact,
    ClipboardCheck,
    LogOut
} from "lucide-react";

type Role = "ADMIN" | "TECH" | undefined;

export default function MobileMenu({
    open,
    onClose,
    role,
}: {
    open: boolean;
    onClose: () => void;
    role?: Role;
}) {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const { data: session } = useSession();

    // Ensure we have a DOM to portal into
    useEffect(() => setMounted(true), []);

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
        // Close menu and sign out
        onClose();
        await signOut({ callbackUrl: "/sign-in" });
    };

    const NavItem = ({
        href,
        label,
        icon: Icon,
    }: {
        href: string;
        label: string;
        icon: any;
    }) => (
        <Link
            href={href}
            onClick={onClose}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 ${pathname === href
                ? "bg-zinc-100 dark:bg-zinc-900"
                : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
                }`}
        >
            <Icon size={18} />
            <span>{label}</span>
        </Link>
    );

    // Nothing to render on server
    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[9999] md:hidden" // <-- full viewport overlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Dim background */}
                    <div className="absolute inset-0 bg-black/50" onClick={onClose} />

                    {/* Left drawer */}
                    <motion.aside
                        className="fixed left-0 top-0 h-screen w-[86%] max-w-xs bg-white dark:bg-zinc-950
                       border-r border-zinc-200 dark:border-zinc-800 p-3 flex flex-col"
                        initial={{ x: -24, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -24, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="mb-2 px-1">
                            <div className="text-xs uppercase tracking-wide opacity-60">Menu</div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <SidebarNav role={role} onNavigate={onClose} />
                        </div>
                        
                        {/* Logout button at bottom */}
                        <div className="flex-shrink-0 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium
                                         text-red-600 dark:text-red-400 
                                         border border-red-200 dark:border-red-800
                                         hover:bg-red-50 dark:hover:bg-red-950/50
                                         hover:border-red-300 dark:hover:border-red-700
                                         transition-colors"
                            >
                                <LogOut size={18} />
                                <span>Log Out</span>
                            </button>
                        </div>
                    </motion.aside>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
