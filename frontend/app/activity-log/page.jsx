"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ActivityLogMetrics from "@/components/extra/activity-log/activity-log-metrics";
import ActivityLogList from "@/components/extra/activity-log/activity-log-list";

export default function ActivityLogPage() {
    return (
        <div className="w-full sm:px-4 md:px-6 lg:px-8 sm:py-8">
            {/* Page Header */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
                        Activity Log
                    </h1>
                    <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                        Complete audit trail of all system activities
                    </p>
                </div>
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    <span>Export Logs</span>
                </Button>
            </div>

            {/* Metrics Section */}
            <ActivityLogMetrics />

            {/* Activity Timeline Section */}
            <div className="rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900 p-4 sm:p-6">
                <div className="mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white">
                        Activity Timeline
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                        Real-time log of all system activities and events
                    </p>
                </div>
                <ActivityLogList />
            </div>
        </div>
    );
}
