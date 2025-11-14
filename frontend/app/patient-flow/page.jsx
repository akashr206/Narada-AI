"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Activity, Users, ArrowRight } from "lucide-react";

export default function PatientFlow() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Patient Flow
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Real-time patient tracking and department capacity
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            + New Admission
          </Button>
          <Button variant="outline">Process Discharge</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 overflow-hidden">
            <p className="truncate text-sm text-gray-500">Total Patients</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-semibold">8</span>
              <Users className="text-blue-600 w-6 h-6" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 overflow-hidden">
            <p className="truncate text-sm text-gray-500">Avg Wait Time</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-semibold">29m</span>
              <Clock className="text-yellow-500 w-6 h-6" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 overflow-hidden">
            <p className="truncate text-sm text-gray-500">Critical Cases</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-semibold text-red-500">3</span>
              <Activity className="text-red-500 w-6 h-6" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 overflow-hidden">
            <p className="truncate text-sm text-gray-500">Discharge Ready</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-semibold text-green-500">1</span>
              <ArrowRight className="text-green-500 w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Capacity */}
      <Card>
        <CardContent className="p-4 sm:p-6 overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4">Department Capacity</h2>
          <div className="space-y-4">
            {[
              { name: "Emergency", used: 23, total: 30, waiting: 7 },
              { name: "ICU", used: 18, total: 20, waiting: 2 },
              { name: "Surgery", used: 12, total: 15, waiting: 3 },
              { name: "Cardiology", used: 8, total: 12, waiting: 1 },
              { name: "Orthopedics", used: 15, total: 20, waiting: 4 },
              { name: "Pediatrics", used: 9, total: 15, waiting: 2 },
            ].map((dept) => (
              <div key={dept.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{dept.name}</span>
                  <span className="text-gray-500">
                    {dept.used}/{dept.total} ({dept.waiting} waiting)
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${(dept.used / dept.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
