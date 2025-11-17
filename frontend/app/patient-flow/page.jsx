"use client";

import PatientFlowMetrics from "@/components/extra/patient-flow-metrics";
import DepartmentCapacity from "@/components/extra/department-capacity";
import PatientQueue from "@/components/extra/patient-queue";
import AllPatientsTable from "@/components/extra/all-patients-table";
import { Button } from "@/components/ui/button";

export default function PatientFlowPage() {
  return (
    <main className="flex bg-gray-50 dark:bg-gray-950 transition-colors min-h-screen">
      <div className="p-4 sm:p-6 md:p-8 w-full">
        <div className="flex justify-between xs:flex-row gap-2 sm:gap-3 mb-6 sm:mb-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              Patient Flow
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
              Real-time patient tracking and department capacity
            </p>
          </div>
          <div className="gap-2 flex flex-col">
            <Button className="w-fit  flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium text-sm sm:text-base">
              👤 New Admission
            </Button>
            <Button className="w-fit   flex items-center justify-center gap-2 px-4 sm:px-4 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm sm:text-base">
              📤 Process Discharge
            </Button>
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <PatientFlowMetrics />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="md:col-span-2 lg:col-span-3">
            <DepartmentCapacity />
          </div>
          <div className="md:col-span-1">
            <PatientQueue />
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            All Patients
          </h2>
          <AllPatientsTable />
        </div>
      </div>
    </main>
  );
}
