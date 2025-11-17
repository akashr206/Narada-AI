"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    UserCheck,
    Package,
    Lightbulb,
    Activity,
    Settings,
    X,
    Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebarOpen } from "@/app/hooks/useSidebar";
import { AnimatePresence, motion } from "framer-motion";

const SIDEBAR_ITEMS = [
    {
        section: "Operations",
        items: [
            { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
            { label: "Patient Flow", icon: Users, href: "/patient-flow" },
            {
                label: "Staff Management",
                icon: UserCheck,
                href: "/staff-management",
            },
            { label: "Inventory", icon: Package, href: "/inventory" },
            { label: "AI Decisions", icon: Lightbulb, href: "/ai-decisions" },
            { label: "Activity Log", icon: Activity, href: "/activity-log" },
        ],
    },
    {
        section: "Settings",
        items: [{ label: "Settings", icon: Settings, href: "/settings" }],
    },
];

export default function Sidebar({ isOpen, onClose }) {
    const pathname = usePathname();
    const isActive = (href) =>
        pathname === href || pathname.startsWith(href + "/");
    const { openSidebar } = useSidebarOpen();

    return (
        <AnimatePresence>
            {openSidebar && (
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 300, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ type: "tween" }}
                    role="navigation"
                    aria-label="Sidebar"
                    className=" z-50 h-screen w-[300px] border-r border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
                >
                    {/* Sidebar Header */}
                    <div className="h-20 border-b border-zinc-200 dark:border-zinc-700 px-6 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                                <Briefcase className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                                    Narada AI
                                </p>
                                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                    Hospital Operations
                                </p>
                            </div>
                        </Link>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="md:hidden hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            aria-label="Close sidebar"
                        >
                            <X className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="overflow-y-auto px-3 py-4 space-y-8 scrollbar-none overscroll-contain">
                        {SIDEBAR_ITEMS.map((section) => (
                            <div key={section.section}>
                                <p className="mb-3 px-4 text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                                    {section.section}
                                </p>

                                <div className="space-y-1">
                                    {section.items.map((item) => {
                                        const Icon = item.icon;
                                        const active = isActive(item.href);

                                        return (
                                            <Link key={item.href} href={item.href}>
                                                <Button
                                                    variant="ghost"
                                                    className={`w-full justify-start gap-3 px-4 py-2 text-sm font-medium
                                                        ${
                                                            active
                                                                ? "bg-zinc-100 text-blue-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-blue-400 dark:hover:bg-zinc-800"
                                                                : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                                                        }
                                                    `}
                                                >
                                                    <Icon className="h-5 w-5 flex-shrink-0" />
                                                    {item.label}
                                                </Button>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
