// src/components/desktop-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, Role } from "./nav/nav-data";
import { ChevronDown } from "lucide-react";
import { useMemo, useState, isValidElement, cloneElement, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function clsx(...xs: Array<string | false | null | undefined>) {
    return xs.filter(Boolean).join(" ");
}

function IconBox({ node }: { node: React.ReactNode }) {
    if (isValidElement(node)) {
        const prev = (node as any).props ?? {};
        return cloneElement(node as any, {
            size: 16,
            className: clsx("shrink-0 opacity-80", prev.className),
        });
    }
    return <span className="shrink-0" />;
}

const CHIP_BASE =
    "inline-flex h-9 items-center gap-2 rounded-xl border px-3 text-sm font-medium leading-none transition";
const CHIP_IDLE =
    "border-zinc-200/70 bg-white text-zinc-800 hover:bg-zinc-100/70 " +
    "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-800/70";
const CHIP_ACTIVE = "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-white";

// --- hover-intent helpers ---
const CLOSE_DELAY_MS = 180;

export default function DesktopNav({ role }: { role: Role | undefined }) {
    const pathname = usePathname();
    const roleEff = (role ?? "TECH") as Role;

    const items = useMemo(
        () => NAV_ITEMS.filter((i) => !i.roles || i.roles.includes(roleEff)),
        [roleEff]
    );

    const [openKey, setOpenKey] = useState<string | null>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    function openMenu(key: string) {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
        setOpenKey(key);
    }
    function scheduleClose() {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => setOpenKey(null), CLOSE_DELAY_MS);
    }
    useEffect(() => () => closeTimer.current && clearTimeout(closeTimer.current), []);

    return (
        <div className="relative">
            <ul className="flex items-center gap-2">
                {items.map((it) => {
                    const hasChildren = !!it.children?.length;
                    const active = it.href
                        ? isActive(it.href, pathname)
                        : it.children?.some((c) => c.href && isActive(c.href, pathname));

                    if (!hasChildren && it.href) {
                        return (
                            <li key={it.key} className="relative">
                                <Link href={it.href} className={clsx(CHIP_BASE, active ? CHIP_ACTIVE : CHIP_IDLE)}>
                                    <IconBox node={it.icon} />
                                    <span className="whitespace-nowrap">{it.label}</span>
                                </Link>
                            </li>
                        );
                    }

                    return (
                        <li
                            key={it.key}
                            className="relative"
                            onMouseEnter={() => openMenu(it.key)}
                            onMouseLeave={scheduleClose}
                        >
                            <button
                                type="button"
                                aria-haspopup="menu"
                                aria-expanded={openKey === it.key}
                                onClick={() => (openKey === it.key ? setOpenKey(null) : openMenu(it.key))}
                                className={clsx(CHIP_BASE, active ? CHIP_ACTIVE : CHIP_IDLE)}
                            >
                                <IconBox node={it.icon} />
                                <span className="whitespace-nowrap">{it.label}</span>
                                <ChevronDown
                                    size={14}
                                    className={clsx(
                                        "ml-0.5 shrink-0 opacity-70 transition-transform",
                                        openKey === it.key && "rotate-180"
                                    )}
                                />
                            </button>

                            {/* Dropdown */}
                            <AnimatePresence>
                                {openKey === it.key && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 4 }}
                                        transition={{ duration: 0.14 }}
                                        // 🔒 anchor directly under chip; add pt-1 as a hover buffer so there’s no gap
                                        className="absolute left-0 top-full z-50 pt-1"
                                        // keep open while pointer is over the dropdown
                                        onMouseEnter={() => openMenu(it.key)}
                                        onMouseLeave={scheduleClose}
                                    >
                                        <ul className="min-w-[220px] rounded-lg border border-zinc-200 bg-white p-1 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                                            {it.children!.map((c) => (
                                                <li key={c.key}>
                                                    <Link
                                                        href={c.href!}
                                                        className={clsx(
                                                            "flex h-9 items-center gap-2 rounded-md px-3 text-sm leading-none",
                                                            c.href && isActive(c.href, pathname)
                                                                ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                                                                : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/70"
                                                        )}
                                                        onClick={() => setOpenKey(null)}
                                                    >
                                                        <IconBox node={c.icon} />
                                                        <span className="truncate">{c.label}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function isActive(href: string, path: string) {
    if (href === "/") return path === "/";
    const base = href.split("?")[0];
    return path === href || path.startsWith(base);
}
