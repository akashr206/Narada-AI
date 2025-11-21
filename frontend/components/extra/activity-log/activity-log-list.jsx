"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    AlertCircle,
    Info,
    CheckCircle2,
    AlertTriangle,
    Zap,
    Search,
    ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/lib/utils2";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function ActivityLogList() {
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    const getTypeIcon = (type) => {
        switch (type) {
            case "ai":
                return Zap;
            case "system":
                return AlertTriangle;
            case "user":
                return CheckCircle2;
            case "alert":
                return AlertCircle;
            default:
                return Info;
        }
    };

    const getSeverityBadge = (severity) => {
        const styles = {
            success:
                "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
            info: "bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200",
            warning:
                "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
            error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        };
        const labels = {
            success: "success",
            info: "info",
            warning: "warning",
            error: "error",
        };
        return {
            style: styles[severity] || styles.info,
            label: labels[severity] || "info",
        };
    };

    const filters = ["all", "ai", "system", "user", "alert"];

    const filtered = activities.filter((activity) => {
        const matchesFilter =
            selectedFilter === "all" || activity.type === selectedFilter;
        const matchesSearch =
            activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.user.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    async function fetchActivities() {
        try {
            const response = await fetch(`${API_URL}/api/activity-logs`);
            const data = await response.json();
            setActivities(data);
        } catch (error) {
            console.error("Error fetching activities:", error);
            toast.error("Error fetching activities");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchActivities();
    }, []);

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
                    <Input
                        placeholder="Search logs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 text-xs sm:text-sm w-full dark:bg-zinc-800 dark:border-zinc-700"
                    />
                </div>
                <div className="relative w-full sm:w-auto">
                    <Button
                        onClick={() =>
                            setShowFilterDropdown(!showFilterDropdown)
                        }
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto text-xs sm:text-sm dark:border-zinc-700 dark:bg-zinc-800"
                    >
                        All Types
                        <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                    {showFilterDropdown && (
                        <div className="absolute top-full mt-1 right-0 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg z-10 min-w-40">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => {
                                        setSelectedFilter(filter);
                                        setShowFilterDropdown(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 capitalize ${
                                        selectedFilter === filter
                                            ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                                            : ""
                                    }`}
                                >
                                    {filter === "all" ? "All Types" : filter}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                    <thead>
                        <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800">
                            <th className="px-3 sm:px-4 py-3 text-left font-semibold text-zinc-700 dark:text-zinc-300">
                                Timestamp
                            </th>
                            <th className="px-3 sm:px-4 py-3 text-left font-semibold text-zinc-700 dark:text-zinc-300">
                                Type
                            </th>
                            <th className="px-3 sm:px-4 py-3 text-left font-semibold text-zinc-700 dark:text-zinc-300">
                                Severity
                            </th>
                            <th className="px-3 sm:px-4 py-3 text-left font-semibold text-zinc-700 dark:text-zinc-300">
                                Action
                            </th>
                            <th className="px-3 sm:px-4 py-3 text-left font-semibold text-zinc-700 dark:text-zinc-300">
                                User/Source
                            </th>
                            <th className="hidden md:table-cell px-3 sm:px-4 py-3 text-left font-semibold text-zinc-700 dark:text-zinc-300">
                                Details
                            </th>
                            <th className="px-3 sm:px-4 py-3 text-left font-semibold text-zinc-700 dark:text-zinc-300">
                                Impact
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading &&
                            [...Array(6)].map((_, i) => (
                                <tr
                                    key={i}
                                    className="border-b border-zinc-100 dark:border-zinc-700"
                                >
                                    <td className="px-3 py-3">
                                        <Skeleton className="h-4 w-24" />
                                    </td>
                                    <td className="px-3 py-3">
                                        <Skeleton className="h-4 w-16" />
                                    </td>
                                    <td className="px-3 py-3">
                                        <Skeleton className="h-4 w-20" />
                                    </td>
                                    <td className="px-3 py-3">
                                        <Skeleton className="h-4 w-32" />
                                    </td>
                                    <td className="px-3 py-3">
                                        <Skeleton className="h-4 w-24" />
                                    </td>
                                    <td className="hidden md:table-cell px-3 py-3">
                                        <Skeleton className="h-4 w-40" />
                                    </td>
                                    <td className="px-3 py-3">
                                        <Skeleton className="h-4 w-16" />
                                    </td>
                                </tr>
                            ))}

                        {!loading &&
                            filtered.length > 0 &&
                            filtered.map((activity) => {
                                const TypeIcon = getTypeIcon(activity.type);
                                const severityBadge = getSeverityBadge(
                                    activity.severity
                                );
                                return (
                                    <tr
                                        key={activity.id}
                                        className="border-b border-zinc-100 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                                    >
                                        <td className="px-3 sm:px-4 py-3 text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                                            {activity.timestamp}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <TypeIcon className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                                                <span className="capitalize text-zinc-700 dark:text-zinc-300">
                                                    {activity.type}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-3 sm:px-4 py-3">
                                            <span
                                                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${severityBadge.style}`}
                                            >
                                                {severityBadge.label}
                                            </span>
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 font-medium text-zinc-900 dark:text-white">
                                            {activity.action}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-zinc-600 dark:text-zinc-400">
                                            {activity.user}
                                        </td>
                                        <td className="hidden md:table-cell px-3 sm:px-4 py-3 text-zinc-600 dark:text-zinc-400 max-w-xs truncate">
                                            {activity.details}
                                        </td>
                                        <td
                                            className={`px-3 sm:px-4 py-3 font-medium ${activity.impactColor}`}
                                        >
                                            {activity.impact}
                                        </td>
                                    </tr>
                                );
                            })}

                        {!loading && filtered.length === 0 && (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="px-4 py-8 text-center text-zinc-600 dark:text-zinc-400"
                                >
                                    No activities found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
