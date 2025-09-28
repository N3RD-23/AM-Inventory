import { ReactNode } from "react";
import {
    LayoutDashboard, Boxes, Settings, Users, UserCircle2, Building2,
    Landmark, BadgeCheck, ListChecks, ClipboardList, Monitor, Cpu, BatteryCharging,
    ListTodo,
    LandPlot,
    Columns3Icon,
    Bug,
    HousePlug,
    GitBranch,
    TicketSlash
} from "lucide-react";

export type Role = "ADMIN" | "TECH";

export type NavItem = {
    key: string;
    label: string;
    href?: string;
    icon?: ReactNode;
    roles?: Role[];
    children?: NavItem[];
};

export const NAV_ITEMS: NavItem[] = [
    {
        key: "dash",
        label: "Dashboard",
        href: "/",
        icon: <LayoutDashboard size={18} />,
    },
    {
        key: "inventory",
        label: "Inventory",
        icon: <Boxes size={18} />,
        children: [
            { key: "inv-all", label: "Inventory", href: "/inventory" },
            { key: "ass-add", label: "Assets Management", href: "/assets" },
        ],
    },
    {
        key: "task",
        label: "Tasks",
        href: "/tasks",
        icon: <ListTodo size={18} />,
    },
    {
        key: "log",
        label: "Logs",
        href: "/logs",
        icon: <GitBranch size={18} />,
    },
    {
        key: "admin",
        label: "Admin",
        icon: <Settings size={18} />,
        roles: ["ADMIN"],
        children: [
            { key: "adm-users", label: "Users", href: "/admin/users", icon: <Users size={16} /> },
            { key: "adm-staff", label: "Staff", href: "/admin/staff", icon: <UserCircle2 size={16} /> },
            { key: "adm-brands", label: "Brands", href: "/admin/brands", icon: <BadgeCheck size={16} /> },
            { key: "adm-models", label: "Models", href: "/admin/models", icon: <TicketSlash size={16} /> },
            { key: "adm-locs", label: "Locations", href: "/admin/locations", icon: <Building2 size={16} /> },
            { key: "adm-outlets", label: "Outlets", href: "/admin/outlets", icon: <LandPlot size={16} /> },
            { key: "adm-rooms", label: "Rooms", href: "/admin/rooms", icon: <HousePlug size={16} /> },
            { key: "adm-depts", label: "Departments", href: "/admin/departments", icon: <Landmark size={16} /> },
            { key: "adm-desig", label: "Designations", href: "/admin/designations", icon: <BadgeCheck size={16} /> },
            { key: "adm-status", label: "Statuses", href: "/admin/statuses", icon: <ListChecks size={16} /> },
            { key: "adm-cats", label: "Categories", href: "/admin/categories", icon: <ClipboardList size={16} /> },
            { key: "adm-issue", label: "Issue Types", href: "/admin/issue-types", icon: <Bug size={16} /> },
            { key: "adm-fields", label: "Custom Fields", href: "/admin/fields", icon: <Columns3Icon size={16} /> },
        ],
    },
];
