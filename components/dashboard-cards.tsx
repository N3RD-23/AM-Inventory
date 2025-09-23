import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
    Users as UsersIcon, Monitor, HardDrive, Cpu, Factory, MapPin, Building2,
    ListTree, UserSquare2, FolderTree, PocketKnife
} from "lucide-react";
import UniversalSearch from "@/components/universal-search";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    const role: "ADMIN" | "TECH" | undefined = (session?.user as any)?.role;

    const [
        usersCount, pcsCount, monitorsCount, upsCount,
        brandsCount, locationsCount, departmentsCount,
        statusesCount, staffCount, categoriesCount,
        tasksCount
    ] = await Promise.all([
        prisma.user.count(),
        prisma.asset.count({ where: { category: "PC" } }),
        prisma.asset.count({ where: { category: "MONITOR" } }),
        prisma.asset.count({ where: { category: "UPS" } }),
        prisma.brand.count(),
        prisma.location.count(),
        prisma.department.count(),
        prisma.status.count().catch(() => 0),
        prisma.staff.count().catch(() => 0),
        prisma.category.count().catch(() => 0),
        prisma.taskLog.count().catch(() => 0),
    ]);

    // --- ranges ---
    const now = new Date();
    const since30 = new Date(now);
    since30.setDate(now.getDate() - 30);
    since30.setHours(0, 0, 0, 0);

    // --- groupings last 30d ---
    const [gIssue, gDept, gRoom, gOutlet] = await Promise.all([
        prisma.taskLog.groupBy({
            by: ["issueTypeId"],
            where: { date: { gte: since30 }, issueTypeId: { not: null } },
            _count: { _all: true },
        }),
        prisma.taskLog.groupBy({
            by: ["departmentId"],
            where: { date: { gte: since30 }, departmentId: { not: null } },
            _count: { _all: true },
        }),
        prisma.taskLog.groupBy({
            by: ["roomId"],
            where: { date: { gte: since30 }, roomId: { not: null } },
            _count: { _all: true },
        }),
        prisma.taskLog.groupBy({
            by: ["outletId"],
            where: { date: { gte: since30 }, outletId: { not: null } },
            _count: { _all: true },
        }),
    ]);

    // fetch display names for those ids
    function toMap<T extends { id: string; name: string }>(xs: T[]) {
        return Object.fromEntries(xs.map((x) => [x.id, x.name]));
    }

    const [issueTypeMap, deptMap, roomMap, outletMap] = await Promise.all([
        prisma.issueType
            .findMany({
                where: { id: { in: gIssue.map((x) => x.issueTypeId!).filter(Boolean) } },
                select: { id: true, name: true },
            })
            .then(toMap),
        prisma.department
            .findMany({
                where: { id: { in: gDept.map((x) => x.departmentId!).filter(Boolean) } },
                select: { id: true, name: true },
            })
            .then(toMap),
        prisma.room
            .findMany({
                where: { id: { in: gRoom.map((x) => x.roomId!).filter(Boolean) } },
                select: { id: true, name: true },
            })
            .then(toMap),
        prisma.outlet
            .findMany({
                where: { id: { in: gOutlet.map((x) => x.outletId!).filter(Boolean) } },
                select: { id: true, name: true },
            })
            .then(toMap),
    ]);

    // build sorted "top 5" arrays
    const topIssues = gIssue
        .map((r) => ({ id: r.issueTypeId!, name: issueTypeMap[r.issueTypeId!] ?? "Unknown", count: r._count._all }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
    const issuesTotal30 = gIssue.reduce((a, r) => a + r._count._all, 0);

    const topDepts = gDept
        .map((r) => ({ id: r.departmentId!, name: deptMap[r.departmentId!] ?? "Unknown", count: r._count._all }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
    const deptsTotal30 = gDept.reduce((a, r) => a + r._count._all, 0);

    const topRooms = gRoom
        .map((r) => ({ id: r.roomId!, name: roomMap[r.roomId!] ?? "Unknown", count: r._count._all }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    const topOutlets = gOutlet
        .map((r) => ({ id: r.outletId!, name: outletMap[r.outletId!] ?? "Unknown", count: r._count._all }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    // --- Closed This Week ---
    function startOfWeekMonday(d: Date) {
        const s = new Date(d);
        const dow = (s.getDay() + 6) % 7; // Mon=0
        s.setDate(s.getDate() - dow);
        s.setHours(0, 0, 0, 0);
        return s;
    }
    const weekStart = startOfWeekMonday(now);

    const closedStatus = await prisma.status.findFirst({
        where: { OR: [{ name: "Closed" }, { name: "CLOSED" }, { name: "closed" }] },
        select: { id: true },
    }).catch(() => null);

    const [closedThisWeek, lastClosed] = closedStatus?.id
        ? await Promise.all([
            prisma.taskLog.count({ where: { statusId: closedStatus.id, date: { gte: weekStart, lte: now } } }),
            prisma.taskLog.findMany({
                where: { statusId: closedStatus.id, date: { gte: weekStart, lte: now } },
                orderBy: { date: "desc" },
                take: 5,
                select: {
                    id: true,
                    detail: true,
                    date: true,
                    department: { select: { name: true } },
                    outlet: { select: { name: true } },
                    room: { select: { name: true } },
                    issueType: { select: { name: true } },
                },
            }),
        ])
        : [0, [] as any[]];

    // tiny date formatter
    const fmt = (d: Date) =>
        new Date(d).toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });


    // Find NEW status (case tolerant)
    const newStatus = await prisma.status.findFirst({
        where: { OR: [{ name: "NEW" }, { name: "New" }, { name: "new" }] },
        select: { id: true }
    }).catch(() => null);

    const [newTasks, newTasksCount] = newStatus?.id
        ? await Promise.all([
            prisma.taskLog.findMany({
                where: { statusId: newStatus.id },
                orderBy: { date: "desc" }, // ✅ use `date`, not `createdAt`
                take: 5,
                select: {
                    id: true,
                    detail: true,
                    date: true, // ✅ select `date`
                    department: { select: { name: true } },
                    outlet: { select: { name: true } },
                    room: { select: { name: true } },
                    issueType: { select: { name: true } },
                },
            }),
            prisma.taskLog.count({ where: { statusId: newStatus.id } }),
        ])
        : [[], 0];

    const cards = [
        //{ label: "Users", count: usersCount, href: "/admin/users", Icon: UsersIcon, adminOnly: true },
        { label: "PCs", count: pcsCount, href: "/assets?category=PC", Icon: Cpu },
        { label: "Monitors", count: monitorsCount, href: "/assets?category=MONITOR", Icon: Monitor },
        { label: "UPS", count: upsCount, href: "/assets?category=UPS", Icon: HardDrive },
        //{ label: "Brands", count: brandsCount, href: "/admin/brands", Icon: Factory, adminOnly: true },
        //{ label: "Locations", count: locationsCount, href: "/admin/locations", Icon: MapPin, adminOnly: true },
        //{ label: "Departments", count: departmentsCount, href: "/admin/departments", Icon: Building2, adminOnly: true },
        //{ label: "Statuses", count: statusesCount, href: "/admin/statuses", Icon: ListTree, adminOnly: true },
        //{ label: "Staff", count: staffCount, href: "/admin/staff", Icon: UserSquare2, adminOnly: true },
        //{ label: "Categories", count: categoriesCount, href: "/admin/categories", Icon: FolderTree, adminOnly: true },
        { label: "Tasks", count: tasksCount, href: "/tasks", Icon: PocketKnife },
    ].filter(c => (c.adminOnly ? role === "ADMIN" : true));

    return (
        <div className="p-4 space-y-6">
            {/* <UniversalSearch /> */}

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {cards.map(({ label, count, href, Icon }) => (
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

            {/* NEW Tasks card */}
            <div className="rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex h-8 items-center justify-center rounded-lg bg-zinc-100 px-2.5 text-xs font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                            NEW
                        </span>
                        <h3 className="text-sm font-semibold">New Tasks</h3>
                        <span className="ml-1 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                            {newTasksCount}
                        </span>
                    </div>
                    <Link
                        href="/tasks"
                        className="text-xs font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
                    >
                        View all
                    </Link>
                </div>

                {newTasks.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-zinc-200 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                        {newStatus?.id ? "No new tasks right now." : "No “NEW” status found yet."}
                    </div>
                ) : (
                    <ul className="divide-y divide-zinc-100 dark:divide-zinc-900">
                        {newTasks.map((t) => {
                            const meta = [t.issueType?.name, t.department?.name, t.outlet?.name, t.room?.name]
                                .filter(Boolean)
                                .join(" • ");
                            return (
                                <li key={t.id} className="py-2 first:pt-0 last:pb-0">
                                    <div className="flex items-start justify-between gap-3 rounded-xl px-1">
                                        <div className="min-w-0">
                                            <div className="truncate text-sm font-medium">{t.detail || "(no detail)"}</div>
                                            <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                                                {fmt(t.date)}{meta ? ` • ${meta}` : ""}
                                            </div>
                                        </div>
                                        <Link
                                            href="/tasks"
                                            className="shrink-0 rounded-lg border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900/60"
                                            title="Open Tasks"
                                        >
                                            Open
                                        </Link>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {/* Top Issue Types (last 30d) */}
                <div className="rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-semibold">Top Issue Types (last 30d)</h3>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{issuesTotal30} total</span>
                    </div>
                    {topIssues.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-zinc-200 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                            No data in the last 30 days.
                        </div>
                    ) : (
                        <ul className="space-y-2">
                            {topIssues.map((row) => {
                                const pct = issuesTotal30 ? Math.round((row.count / issuesTotal30) * 100) : 0;
                                return (
                                    <li key={row.id} className="flex items-center gap-3">
                                        <span className="w-44 truncate text-sm">{row.name}</span>
                                        <div className="h-2 w-full rounded bg-zinc-200 dark:bg-zinc-800">
                                            <div className="h-2 rounded bg-zinc-800 dark:bg-zinc-200" style={{ width: `${pct}%` }} />
                                        </div>
                                        <span className="w-14 text-right tabular-nums text-sm">{row.count}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                {/* Departments with Most Tickets (last 30d) */}
                <div className="rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-semibold">Departments with Most Tickets (last 30d)</h3>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{deptsTotal30} total</span>
                    </div>
                    {topDepts.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-zinc-200 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                            No data in the last 30 days.
                        </div>
                    ) : (
                        <ul className="space-y-2">
                            {topDepts.map((row) => {
                                const pct = deptsTotal30 ? Math.round((row.count / deptsTotal30) * 100) : 0;
                                return (
                                    <li key={row.id} className="flex items-center gap-3">
                                        <span className="w-44 truncate text-sm">{row.name}</span>
                                        <div className="h-2 w-full rounded bg-zinc-200 dark:bg-zinc-800">
                                            <div className="h-2 rounded bg-zinc-800 dark:bg-zinc-200" style={{ width: `${pct}%` }} />
                                        </div>
                                        <span className="w-14 text-right tabular-nums text-sm">{row.count}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                {/* Rooms / Outlets Hotspots (last 30d) */}
                <div className="rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-semibold">Hotspots (last 30d)</h3>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">Rooms &amp; Outlets</span>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Rooms */}
                        <div>
                            <div className="mb-2 text-xs font-medium opacity-70">Top Rooms</div>
                            {topRooms.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-zinc-200 p-3 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                                    No room data.
                                </div>
                            ) : (
                                <ul className="space-y-2">
                                    {topRooms.map((row) => (
                                        <li key={row.id} className="flex items-center justify-between gap-3">
                                            <span className="truncate text-sm">{row.name}</span>
                                            <span className="w-10 text-right tabular-nums text-sm">{row.count}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {/* Outlets */}
                        <div>
                            <div className="mb-2 text-xs font-medium opacity-70">Top Outlets</div>
                            {topOutlets.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-zinc-200 p-3 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                                    No outlet data.
                                </div>
                            ) : (
                                <ul className="space-y-2">
                                    {topOutlets.map((row) => (
                                        <li key={row.id} className="flex items-center justify-between gap-3">
                                            <span className="truncate text-sm">{row.name}</span>
                                            <span className="w-10 text-right tabular-nums text-sm">{row.count}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                {/* Closed This Week */}
                <div className="rounded-2xl border border-emerald-300/50 bg-emerald-50 p-4 shadow-sm dark:border-emerald-400/30 dark:bg-emerald-950/20">
                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-semibold">Closed This Week</h3>
                        <span className="rounded-full bg-white/70 px-2 py-0.5 text-xs font-semibold text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200">
                            {closedThisWeek}
                        </span>
                    </div>

                    {lastClosed.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-emerald-200 p-4 text-sm text-emerald-900/80 dark:border-emerald-400/30 dark:text-emerald-200/80">
                            {closedStatus?.id ? "No tickets closed so far this week." : "No “Closed” status found."}
                        </div>
                    ) : (
                        <ul className="divide-y divide-emerald-200/70 dark:divide-emerald-400/20">
                            {lastClosed.map((t) => {
                                const meta = [t.issueType?.name, t.department?.name, t.outlet?.name, t.room?.name]
                                    .filter(Boolean)
                                    .join(" • ");
                                return (
                                    <li key={t.id} className="py-2 first:pt-0 last:pb-0">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <div className="truncate text-sm font-medium">{t.detail || "(no detail)"}</div>
                                                <div className="mt-0.5 text-xs text-emerald-900/80 dark:text-emerald-200/80">
                                                    {fmt(t.date)}{meta ? ` • ${meta}` : ""}
                                                </div>
                                            </div>
                                            <Link
                                                href="/tasks"
                                                className="shrink-0 rounded-lg border border-emerald-300/60 bg-white px-2 py-1 text-xs font-medium text-emerald-900 hover:bg-emerald-100 dark:border-emerald-400/30 dark:bg-emerald-950/30 dark:text-emerald-200 dark:hover:bg-emerald-900/40"
                                            >
                                                View
                                            </Link>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
