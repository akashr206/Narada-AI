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

const SIDEBAR_ITEMS = [
  {
    section: "Operations",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
      },
      {
        label: "Patient Flow",
        icon: Users,
        href: "/patient-flow",
      },
      {
        label: "Staff Management",
        icon: UserCheck,
        href: "/staff-management",
      },
      {
        label: "Inventory",
        icon: Package,
        href: "/inventory",
      },
      {
        label: "AI Decisions",
        icon: Lightbulb,
        href: "/ai-decisions",
      },
      {
        label: "Activity Log",
        icon: Activity,
        href: "/activity-log",
      },
    ],
  },
  {
    section: "Settings",
    items: [
      {
        label: "Settings",
        icon: Settings,
        href: "/settings",
      },
    ],
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const isActive = (href) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-20 z-30 h-screen w-64 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 pt-0 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Section */}
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Narada AI
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Hospital Operations
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="md:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </Button>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="overflow-y-auto px-3 py-4 space-y-8">
          {SIDEBAR_ITEMS.map((section) => (
            <div key={section.section}>
              <p className="mb-3 px-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
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
                        className={`w-full justify-start gap-3 px-4 py-2 ${
                          active
                            ? "bg-gray-100 text-blue-600 hover:bg-gray-100 hover:text-blue-600 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                        }`}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
