"use client"

import { BarChart3, Brain, Users, AlertCircle } from 'lucide-react'

export default function ActivityLogMetrics() {
  const metrics = [
    {
      icon: BarChart3,
      title: "Total Events",
      value: "1,247",
      bgColor: "bg-gray-100 dark:bg-gray-800 border-1 border-gray-400 dark:border-gray-700",
      textColor: "text-gray-900 dark:text-gray-100",
      iconBgColor: "bg-gray-200 dark:bg-gray-700"
    },
    {
      icon: Brain,
      title: "AI Actions",
      value: "342",
      bgColor: "bg-blue-100 dark:bg-blue-950 border-1 border-blue-700 dark:border-blue-700",
      textColor: "text-blue-600 dark:text-blue-400",
      iconBgColor: "bg-blue-100 dark:bg-blue-900"
    },
    {
      icon: Users,
      title: "User Actions",
      value: "518",
      bgColor: "bg-cyan-100 dark:bg-cyan-950 border-1 border-cyan-700 dark:border-cyan-700",
      textColor: "text-cyan-600 dark:text-cyan-400",
      iconBgColor: "bg-cyan-100 dark:bg-cyan-900"
    },
    {
      icon: AlertCircle,
      title: "Alerts",
      value: "87",
      bgColor: "bg-orange-100 dark:bg-orange-950 border-1 border-orange-700 dark:border-orange-700",
      textColor: "text-orange-600 dark:text-orange-400",
      iconBgColor: "bg-orange-100 dark:bg-orange-900"
    }
  ]

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {metrics.map((metric, idx) => (
        <div key={idx} className={`${metric.bgColor} rounded-lg border p-4 sm:p-6 transition-colors`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">{metric.title}</p>
              <p className={`mt-3 text-3xl sm:text-4xl font-bold ${metric.textColor}`}>{metric.value}</p>
            </div>
            <div className={`${metric.iconBgColor} rounded-lg p-2 sm:p-3 flex-shrink-0`}>
              <metric.icon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 dark:text-gray-300" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
