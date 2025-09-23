// components/nav/SidebarNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, NavItem, Role } from "./nav-data";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";

export default function SidebarNav({
    role,
    onNavigate,
}: {
    role: Role | undefined;
    onNavigate?: () => void;
}) {
    const pathname = usePathname();
    const roleEff = (role ?? "TECH") as Role;
    const items = useMemo(
        () => NAV_ITEMS.filter((i) => !i.roles || i.roles.includes(roleEff)),
        [roleEff]
    );
    return (
        <nav className="px-2 py-3 space-y-1">
            {items.map((item) => (
                <TreeNode
                    key={item.key}
                    item={item}
                    depth={0}
                    path={pathname}
                    onNavigate={onNavigate}
                />
            ))}
        </nav>
    );
}

function TreeNode({
    item,
    depth,
    path,
    onNavigate,
}: {
    item: NavItem;
    depth: number;
    path: string;
    onNavigate?: () => void;
}) {
    const hasChildren = !!item.children?.length;
    const active =
        (item.href && isActive(item.href, path)) ||
        (item.children ?? []).some((c) => isBranchActive(c, path));

    // Collapsible state for groups
    const [open, setOpen] = useState(active);

    // Leaf
    if (!hasChildren && item.href) {
        return (
            <Link
                href={item.href}
                onClick={onNavigate}
                className={[
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                        ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                        : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/70",
                ].join(" ")}
                style={{ paddingLeft: 12 + depth * 12 }}
            >
                <span className="truncate">{item.label}</span>
            </Link>
        );
    }

    // Group
    return (
        <div className="rounded-lg">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg
                   text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/70"
                style={{ paddingLeft: 12 + depth * 12 }}
            >
                <span className="truncate">{item.label}</span>
                <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="overflow-hidden"
                    >
                        {(item.children ?? []).map((child) => (
                            <li key={child.key}>
                                <TreeNode
                                    item={child}
                                    depth={depth + 1}
                                    path={path}
                                    onNavigate={onNavigate}
                                />
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}

function isBranchActive(item: NavItem, path: string): boolean {
    if (item.href && isActive(item.href, path)) return true;
    return (item.children ?? []).some((c) => isBranchActive(c, path));
}

function isActive(href: string, path: string) {
    if (href === "/") return path === "/";
    const base = href.split("?")[0];
    return path === href || path.startsWith(base);
}
