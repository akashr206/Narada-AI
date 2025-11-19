"use client";

import { Users, Clock, AlertTriangle, CheckCircle } from "lucide-react";

export default function PatientFlowMetrics() {
    const metrics = [
        {
            label: "Total Patients",
            value: "8",
            icon: Users,
            bgColor:
                "bg-blue-50 dark:bg-blue-950  border-1 border-blue-700 dark:border-blue-700",
            iconBg: "bg-blue-100 dark:bg-blue-900",
            textColor: "text-blue-600 dark:text-blue-400",
        },
        {
            label: "Avg Wait Time",
            value: "29m",
            icon: Clock,
            bgColor:
                "bg-yellow-50 dark:bg-yellow-950  border-1 border-yellow-700 dark:border-yellow-700",
            iconBg: "bg-yellow-100 dark:bg-yellow-900",
            textColor: "text-yellow-600 dark:text-yellow-400",
        },
        {
            label: "Critical Cases",
            value: "3",
            icon: AlertTriangle,
            bgColor:
                "bg-red-50 dark:bg-red-950  border-1 border-red-700 dark:border-red-700",
            iconBg: "bg-red-100 dark:bg-red-900",
            textColor: "text-red-600 dark:text-red-400",
        },
        {
            label: "Discharge Ready",
            value: "1",
            icon: CheckCircle,
            bgColor:
                "bg-green-50 dark:bg-green-950  border-1 border-green-700 dark:border-green-700",
            iconBg: "bg-green-100 dark:bg-green-900",
            textColor: "text-green-600 dark:text-green-400",
        },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {metrics.map((metric, idx) => {
                const Icon = metric.icon;

                return (
                    <div
                        key={idx}
                        className={`${metric.bgColor} rounded-lg p-3 sm:p-4 md:p-6 border `}
                    >
                        <div className="flex flex-col sm:flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                            <div className="min-w-0">
                                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-1 sm:mb-2 truncate">
                                    {metric.label}
                                </p>
                                <p
                                    className={`text-xl sm:text-2xl md:text-3xl font-bold ${metric.textColor} truncate`}
                                >
                                    {metric.value}
                                </p>
                            </div>

                            <div
                                className={`${metric.iconBg} w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0`}
                            >
                                <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
