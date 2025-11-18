"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, Info, CheckCircle2, AlertTriangle, Zap, Search, ChevronDown } from 'lucide-react'
import { Input } from "@/components/ui/input"

export default function ActivityLogList() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  const activities = [
    {
      id: 1,
      timestamp: "2024-01-15 14:32:15",
      type: "ai",
      typeLabel: "AI",
      severity: "success",
      severityLabel: "success",
      action: "Staff Schedule Adjusted",
      user: "Narada AI",
      details: "Automatically added 2 nurses to ICU due to increased patient load",
      impact: "High",
      impactColor: "text-orange-600 dark:text-orange-400"
    },
    {
      id: 2,
      timestamp: "2024-01-15 14:28:43",
      type: "system",
      typeLabel: "System",
      severity: "info",
      severityLabel: "info",
      action: "Inventory Updated",
      user: "System",
      details: "Received supply delivery: 500 units of surgical masks",
      impact: "Medium",
      impactColor: "text-blue-600 dark:text-blue-400"
    },
    {
      id: 3,
      timestamp: "2024-01-15 14:15:22",
      type: "user",
      typeLabel: "User",
      severity: "warning",
      severityLabel: "warning",
      action: "Manual Override",
      user: "Dr. Sarah Chen",
      details: "Override AI recommendation for patient transfer to ICU",
      impact: "High",
      impactColor: "text-orange-600 dark:text-orange-400"
    },
    {
      id: 4,
      timestamp: "2024-01-15 13:58:09",
      type: "alert",
      typeLabel: "Alert",
      severity: "error",
      severityLabel: "error",
      action: "Critical Supply Low",
      user: "Narada AI",
      details: "Oxygen tanks below critical threshold in Emergency Department",
      impact: "Critical",
      impactColor: "text-red-600 dark:text-red-400"
    },
    {
      id: 5,
      timestamp: "2024-01-15 13:45:31",
      type: "ai",
      typeLabel: "AI",
      severity: "success",
      severityLabel: "success",
      action: "Patient Flow Optimized",
      user: "Narada AI",
      details: "Redirected 3 patients to alternate departments to reduce wait times",
      impact: "Medium",
      impactColor: "text-blue-600 dark:text-blue-400"
    },
    {
      id: 6,
      timestamp: "2024-01-15 13:30:18",
      type: "system",
      typeLabel: "System",
      severity: "info",
      severityLabel: "info",
      action: "System Update",
      user: "System",
      details: "Database backup completed with warnings",
      impact: "Low",
      impactColor: "text-gray-600 dark:text-gray-400"
    },
    {
      id: 7,
      timestamp: "2024-01-15 13:15:47",
      type: "ai",
      typeLabel: "AI",
      severity: "info",
      severityLabel: "info",
      action: "Predictive Alert",
      user: "Narada AI",
      details: "Predicted 20% increase in ER admissions in next 4 hours",
      impact: "Medium",
      impactColor: "text-blue-600 dark:text-blue-400"
    }
  ]

  const getTypeIcon = (type) => {
    switch (type) {
      case "ai":
        return Zap
      case "system":
        return AlertTriangle
      case "user":
        return CheckCircle2
      case "alert":
        return AlertCircle
      default:
        return Info
    }
  }

  const getSeverityBadge = (severity) => {
    const styles = {
      success: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      info: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
      warning: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    }
    const labels = {
      success: "success",
      info: "info",
      warning: "warning",
      error: "error"
    }
    return { style: styles[severity] || styles.info, label: labels[severity] || "info" }
  }

  const filters = ["all", "ai", "system", "user", "alert"]

  const filtered = activities.filter(activity => {
    const matchesFilter = selectedFilter === "all" || activity.type === selectedFilter
    const matchesSearch = activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          activity.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          activity.user.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <Input
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-xs sm:text-sm w-full dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <div className="relative w-full sm:w-auto">
          <Button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            variant="outline"
            size="sm"
            className="w-full sm:w-auto text-xs sm:text-sm dark:border-gray-700 dark:bg-gray-800"
          >
            All Types
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
          {showFilterDropdown && (
            <div className="absolute top-full mt-1 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 min-w-40">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setSelectedFilter(filter)
                    setShowFilterDropdown(false)
                  }}
                  className={`w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-gray-700 capitalize ${
                    selectedFilter === filter ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : ""
                  }`}
                >
                  {filter === "all" ? "All Types" : filter}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Activity Timeline Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <th className="px-3 sm:px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Timestamp</th>
              <th className="px-3 sm:px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Type</th>
              <th className="px-3 sm:px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Severity</th>
              <th className="px-3 sm:px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Action</th>
              <th className="px-3 sm:px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">User/Source</th>
              <th className="hidden md:table-cell px-3 sm:px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Details</th>
              <th className="px-3 sm:px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Impact</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((activity) => {
                const TypeIcon = getTypeIcon(activity.type)
                const severityBadge = getSeverityBadge(activity.severity)
                return (
                  <tr key={activity.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-3 sm:px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{activity.timestamp}</td>
                    <td className="px-3 sm:px-4 py-3">
                      <div className="flex items-center gap-2">
                        <TypeIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        <span className="capitalize text-gray-700 dark:text-gray-300">{activity.typeLabel}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${severityBadge.style}`}>
                        {severityBadge.label}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 font-medium text-gray-900 dark:text-white">{activity.action}</td>
                    <td className="px-3 sm:px-4 py-3 text-gray-600 dark:text-gray-400">{activity.user}</td>
                    <td className="hidden md:table-cell px-3 sm:px-4 py-3 text-gray-600 dark:text-gray-400 max-w-xs truncate">{activity.details}</td>
                    <td className={`px-3 sm:px-4 py-3 font-medium ${activity.impactColor}`}>{activity.impact}</td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-600 dark:text-gray-400">
                  No activities found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
