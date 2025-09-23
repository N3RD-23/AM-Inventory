"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import SidebarNav from "./nav/SidebarNav";
import {
    LayoutGrid, Package2, Users,
    Factory, MapPin, Building2, FileCog, ListTree,
    RectangleEllipsis,
    Contact,
    ClipboardCheck
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

    // Ensure we have a DOM to portal into
    useEffect(() => setMounted(true), []);

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
                       border-r border-zinc-200 dark:border-zinc-800 p-3 overflow-y-auto"
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
                        <SidebarNav role={role} onNavigate={onClose} />
                    </motion.aside>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
