import Link from "next/link";
import { Wifi } from "lucide-react";

export default function ONTPage() {
    const zones = [
        "ONT ZONE-1 Family Beach Villa",
        "ONT ZONE-2 Water Villa",
        "ONT ZONE-3 Beach Villa",
        "ONT ZONE-4 Deluxe Beach Villa",
        "ONT ZONE-5 Deluxe Water Villa",
        "ONT ZONE-6 Executive Block",
        "ONT-ZONE-7 TMA",
    ];

    return (
        <div className="p-4 space-y-6">
            <div className="flex items-center gap-2">
                <Wifi size={24} />
                <h1 className="text-2xl font-semibold">ONT ZONES</h1>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {zones.map((zone) => (
                    <Link
                        key={zone}
                        href={`/network/ont-zone/${encodeURIComponent(zone)}`}
                        className="group relative rounded-2xl border border-zinc-200/70 dark:border-zinc-800
                       bg-white dark:bg-zinc-950 p-4 shadow-sm hover:shadow-md transition
                       focus:outline-none focus:ring-2 focus:ring-zinc-400/50 dark:focus:ring-zinc-600/50"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl
                                 bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300
                                 group-hover:scale-105 transition">
                                    <Wifi size={18} />
                                </span>
                                <span className="text-sm font-medium opacity-80">{zone}</span>
                            </div>
                            <div className="text-2xl font-semibold tabular-nums">0</div>
                        </div>
                        <div className="pointer-events-none absolute inset-x-0 -bottom-[1px] h-[2px] scale-x-0 origin-left
                            bg-gradient-to-r from-zinc-400/60 to-zinc-800/60 dark:from-zinc-700/60 dark:to-zinc-300/60
                            transition-transform group-hover:scale-x-100" />
                    </Link>
                ))}
            </div>
        </div>
    );
}