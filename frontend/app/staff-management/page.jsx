"use client"

import { useState } from "react"
import { UserPlus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import StaffMetrics from "@/components/extra/staff-management/staff-metrics"
import StaffList from "@/components/extra/staff-management/staff-list"

export default function StaffManagementPage() {
  return (
    <div className="w-full sm:px-4 md:px-6 lg:px-8 sm:py-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Staff Management</h1>
          <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">Manage hospital staff, schedules, and assignments</p>
        </div>
        <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg flex items-center justify-center gap-2">
          <UserPlus className="h-4 w-4" />
          <span>Add Staff Member</span>
        </Button>
      </div>

      {/* Metrics Section */}
      <StaffMetrics />

      {/* Staff Directory Section */}
      <div>
        <StaffList />
      </div>
    </div>
  )
}
