function DashboardSection() {
    return (
        <div>
            {/* Top Metrics Row */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <MetricBox
                    title="Total Patients"
                    value="8"
                    icon="👥"
                    bg="bg-blue-50"
                />
                <MetricBox
                    title="Avg Wait Time"
                    value="29m"
                    icon="⏰"
                    bg="bg-yellow-50"
                />
                <MetricBox
                    title="Critical Cases"
                    value="3"
                    icon="💓"
                    bg="bg-red-50"
                />
                <MetricBox
                    title="Discharge Ready"
                    value="1"
                    icon="➡️"
                    bg="bg-green-50"
                />
            </div>
            {/* Capacity + Queue Row */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="col-span-2">
                    <DepartmentCapacity />
                </div>
                <div>
                    <PatientQueue />
                </div>
            </div>
            {/* All Patients Table */}
            <AllPatients />
        </div>
    );
}

// --- Metric Box ---
function MetricBox({ title, value, icon, bg }) {
    return (
        <div className={`rounded-lg ${bg} p-6 flex flex-col items-start`}>
            <div className="mb-2 text-2xl">{icon}</div>
            <div className="uppercase text-sm text-gray-500 mb-1">{title}</div>
            <div className="text-2xl font-bold">{value}</div>
        </div>
    );
}

// --- Department Capacity ---
function DepartmentCapacity() {
    const departments = [
        { name: "Emergency", waiting: 7, current: 23, total: 30 },
        { name: "ICU", waiting: 2, current: 18, total: 20 },
        { name: "Surgery", waiting: 3, current: 12, total: 15 },
        { name: "Cardiology", waiting: 1, current: 8, total: 12 },
        { name: "Orthopedics", waiting: 4, current: 15, total: 20 },
        { name: "Pediatrics", waiting: 2, current: 9, total: 15 },
    ];
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border mb-4">
            <h3 className="font-semibold text-lg mb-6">Department Capacity</h3>
            <div className="space-y-4">
                {departments.map((d) => (
                    <div key={d.name}>
                        <div className="flex justify-between items-center mb-1">
                            <span>{d.name}</span>
                            <span className="text-xs text-gray-600 ml-2">
                                {d.waiting} waiting
                            </span>
                            <span className="font-semibold text-sm">
                                {d.current} / {d.total}
                            </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded">
                            <div
                                className="h-2 bg-blue-600 rounded"
                                style={{
                                    width: `${(d.current / d.total) * 100}%`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// --- Patient Queue ---
function PatientQueue() {
    const queue = [
        {
            name: "John Smith",
            status: ["critical", "in-treatment"],
            department: "Emergency",
            id: "P001",
            admitted: "14:30",
            doctor: "Dr. Williams",
            wait: "",
        },
        {
            name: "Sarah Johnson",
            status: ["urgent", "waiting"],
            department: "Emergency",
            id: "P002",
            admitted: "14:45",
            doctor: "",
            wait: "28min",
        },
        {
            name: "Emma Wilson",
            status: ["routine", "waiting"],
            department: "Orthopedics",
            id: "P004",
            admitted: "13:30",
            doctor: "",
            wait: "42min",
        },
        {
            name: "David Brown",
            status: ["urgent", "waiting"],
            department: "Emergency",
            id: "P007",
            admitted: "14:55",
            doctor: "",
            wait: "18min",
        },
    ];
    const statusColors = {
        critical: "bg-red-100 text-red-600",
        "in-treatment": "bg-blue-100 text-blue-600",
        urgent: "bg-yellow-100 text-yellow-700",
        waiting: "bg-yellow-50 text-yellow-800",
        routine: "bg-blue-100 text-blue-800",
    };
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="font-semibold text-lg mb-6">Patient Queue</h3>
            <div className="space-y-4">
                {queue.map((p) => (
                    <div
                        key={p.id}
                        className="flex flex-col border-b pb-3 mb-3 last:border-b-0 last:pb-0 last:mb-0"
                    >
                        <div className="flex justify-between items-center w-full">
                            <div>
                                <span className="font-semibold">{p.name}</span>
                                {p.status.map((s) => (
                                    <span
                                        key={s}
                                        className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                                            statusColors[s] ||
                                            "bg-gray-100 text-gray-700"
                                        }`}
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                            {p.doctor && (
                                <span className="text-xs text-blue-800">
                                    {p.doctor}
                                </span>
                            )}
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                                {p.age}y • {p.department} • {p.id}
                            </span>
                            <span className="text-xs text-gray-600">
                                {p.admitted && `Admitted: ${p.admitted}`}
                            </span>
                            {p.wait && (
                                <span className="ml-2 px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-semibold">
                                    Wait: {p.wait}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function AllPatients(){}

export default DashboardSection;
