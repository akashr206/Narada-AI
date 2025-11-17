"use client"

import StatCard from "@/components/extra/stat-card"
import ActivityFeedItem from "@/components/extra/activity-feed-item"
import ManualOverrideButton from "@/components/extra/manual-override-button"
import { Users, UserCheck, Package, TrendingUp, Activity, AlertCircle, CheckCircle, Bell } from "lucide-react"

export default function DashboardPage() {
  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Operations Dashboard</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">Real-time hospital operations powered by AI</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          title="Active Patients"
          value="234"
          change="12%"
          changeType="positive"
          bgColor="bg-green-100 dark:bg-green-950 border-1 border-green-700 dark:border-green-700"
        />
        <StatCard
          icon={UserCheck}
          title="Staff on Duty"
          value="89"
          change="5%"
          changeType="positive"
          bgColor="bg-blue-100 dark:bg-blue-950 border-1 border-blue-700 dark:border-blue-700"
        />
        <StatCard
          icon={Package}
          title="Critical Supplies"
          value="7"
          change="2%"
          changeType="negative"
          bgColor="bg-orange-100 dark:bg-orange-950 border-1 border-orange-700 dark:border-orange-700"
        />
        <StatCard
          icon={TrendingUp}
          title="Efficiency Score"
          value="94%"
          change="3%"
          changeType="positive"
          bgColor="bg-green-100 dark:bg-green-950 border-1 border-green-700 dark:border-green-700"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* AI Activity Feed */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-6 dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-6 flex items-center gap-2">
              <Activity className="h-5 w-5 text-gray-900 dark:text-white" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Activity Feed</h2>
            </div>
            <div className="space-y-4">
              <ActivityFeedItem
                icon={UserCheck}
                title="Staff Reallocation"
                description="AI adjusted nurse assignments in ER due to increased patient volume"
                time="2 min ago"
                bgColor="bg-green-500"
              />
              <ActivityFeedItem
                icon={AlertCircle}
                title="Supply Alert"
                description="Low inventory detected for surgical gloves - Auto-order initiated"
                time="15 min ago"
                bgColor="bg-orange-500"
              />
              <ActivityFeedItem
                icon={Bell}
                title="Patient Notification"
                description="Automated check-in reminders sent to 23 scheduled patients"
                time="1 hour ago"
                bgColor="bg-blue-500"
              />
              <ActivityFeedItem
                icon={CheckCircle}
                title="Capacity Optimization"
                description="Predicted surge in admissions. Prepared additional beds in Wing B"
                time="2 hours ago"
                bgColor="bg-green-500"
              />
            </div>
          </div>
        </div>

        {/* Manual Override Section */}
        <div>
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-6 dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Manual Override</h2>
            <ManualOverrideButton />
          </div>
        </div>
      </div>
    </>
  )
}
