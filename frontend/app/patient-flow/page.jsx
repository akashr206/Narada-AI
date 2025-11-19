"use client";

import PatientFlowMetrics from "@/components/extra/patient-flow/patient-flow-metrics";
import DepartmentCapacity from "@/components/extra/patient-flow/department-capacity";
import PatientQueue from "@/components/extra/patient-flow/patient-queue";
import AllPatientsTable from "@/components/extra/patient-flow/all-patients-table";
import { ClipboardX } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddPatientDialog from "@/components/extra/patient-flow/add-patient-dialog";

export default function PatientFlowPage() {
    return (
        <main className="flex bg-zinc-50 dark:bg-zinc-950 transition-colors min-h-screen">
            <div className="sm:p-6 w-full">
                <div className="flex justify-between xs:flex-row gap-2 sm:gap-3 mb-6 sm:mb-8">
                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-2">
                            Patient Flow
                        </h1>
                        <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400">
                            Real-time patient tracking and department capacity
                        </p>
                    </div>
                    <div className="gap-2 flex flex-col items-center">
                        <AddPatientDialog />
                        <Button className="w-fit   flex items-center justify-center gap-2 px-4 sm:px-4 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm sm:text-base">
                            <ClipboardX />
                            Process Discharge
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
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-3 sm:mb-4">
                        All Patients
                    </h2>
                    <AllPatientsTable />
                </div>
            </div>
        </main>
    );
}
