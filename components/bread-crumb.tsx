"use client"

import { Home } from "lucide-react";
import { usePathname } from "next/navigation";

export default function BreadCrumbs() {
    const pathname = usePathname()

    return (
        <div className="lg:flex items-center gap-2 text-sm opacity-50 min-w-0">
            <Home size={14} className="shrink-0" />
            <span className="truncate">{pathname === "/" ? "Dashboard" : pathname}</span>
        </div>
    )
}