"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function StaffList() {
    const [searchTerm, setSearchTerm] = useState("");

    const staffData = [
        {
            id: 1,
            name: "Dr. Sarah Chen",
            role: "Physician",
            department: "Emergency",
            status: "on-duty",
            currentShift: "Day Shift (7AM-7PM)",
            hoursWorked: "4.5h",
            nextShift: "Tomorrow 7AM",
        },
        {
            id: 2,
            name: "John Martinez",
            role: "Nurse",
            department: "ICU",
            status: "on-duty",
            currentShift: "Day Shift (7AM-7PM)",
            hoursWorked: "5.2h",
            nextShift: "Tomorrow 7AM",
        },
        {
            id: 3,
            name: "Emily Watson",
            role: "Nurse",
            department: "Pediatrics",
            status: "break",
            currentShift: "Day Shift (7AM-7PM)",
            hoursWorked: "6h",
            nextShift: "Tomorrow 7AM",
        },
        {
            id: 4,
            name: "Dr. Michael Brown",
            role: "Surgeon",
            department: "Surgery",
            status: "off-duty",
            currentShift: "Night Shift (7PM-7AM)",
            hoursWorked: "0h",
            nextShift: "Today 7PM",
        },
        {
            id: 5,
            name: "Amanda Lee",
            role: "Technician",
            department: "Radiology",
            status: "on-duty",
            currentShift: "Day Shift (7AM-7PM)",
            hoursWorked: "3.8h",
            nextShift: "Tomorrow 7AM",
        },
        {
            id: 6,
            name: "Robert Taylor",
            role: "Paramedic",
            department: "Emergency",
            status: "on-duty",
            currentShift: "Day Shift (7AM-7PM)",
            hoursWorked: "4h",
            nextShift: "Tomorrow 7AM",
        },
    ];

    const getStatusBadge = (status) => {
        const styles = {
            "on-duty":
                "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
            break: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
            "off-duty":
                "bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200",
        };
        const labels = {
            "on-duty": "on-duty",
            break: "break",
            "off-duty": "off-duty",
        };
        return { style: styles[status], label: labels[status] };
    };

    const filteredStaff = staffData.filter(
        (staff) =>
            staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-200 p-4 sm:p-6 dark:border-zinc-700">
                <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white">
                        Staff Directory
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                        View and manage all hospital staff members
                    </p>
                </div>
                <Input
                    placeholder="Search staff..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 px-3 py-2 text-xs sm:text-sm border border-zinc-300 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                />
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
                            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                Name
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                Role
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                Department
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                Status
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                Current Shift
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                Hours Worked
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                Next Shift
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStaff.map((staff) => {
                            const badge = getStatusBadge(staff.status);
                            return (
                                <tr
                                    key={staff.id}
                                    className="border-b border-zinc-100 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm font-medium text-zinc-900 dark:text-white">
                                        {staff.name}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                                        {staff.role}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                                        {staff.department}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4">
                                        <span
                                            className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${badge.style}`}
                                        >
                                            {badge.label}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                                        {staff.currentShift}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                                        {staff.hoursWorked}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                                        {staff.nextShift}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-xs h-7 px-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden divide-y divide-zinc-200 dark:divide-zinc-700">
                {filteredStaff.map((staff) => {
                    const badge = getStatusBadge(staff.status);
                    return (
                        <div
                            key={staff.id}
                            className="p-3 sm:p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-2 mb-3">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                                        {staff.name}
                                    </p>
                                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                        {staff.role} • {staff.department}
                                    </p>
                                </div>
                                <span
                                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${badge.style}`}
                                >
                                    {badge.label}
                                </span>
                            </div>
                            <div className="space-y-2 text-xs sm:text-sm">
                                <div className="flex justify-between">
                                    <span className="text-zinc-600 dark:text-zinc-400">
                                        Shift:
                                    </span>
                                    <span className="font-medium text-zinc-900 dark:text-white">
                                        {staff.currentShift}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-600 dark:text-zinc-400">
                                        Hours:
                                    </span>
                                    <span className="font-medium text-zinc-900 dark:text-white">
                                        {staff.hoursWorked}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-600 dark:text-zinc-400">
                                        Next:
                                    </span>
                                    <span className="font-medium text-zinc-900 dark:text-white">
                                        {staff.nextShift}
                                    </span>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full mt-3 text-xs h-7 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Edit
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
