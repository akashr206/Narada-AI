'use client'
import { Button } from "../ui/button"

export default function AllPatientsTable() {
  const patients = [
    {
      id: 'P001',
      name: 'John Smith',
      age: 45,
      department: 'Emergency',
      status: 'critical',
      stage: 'in-treatment',
      doctor: 'Dr. Williams',
      time: '14:30'
    },
    {
      id: 'P002',
      name: 'Sarah Johnson',
      age: 32,
      department: 'Emergency',
      status: 'urgent',
      stage: 'waiting',
      doctor: 'N/A',
      time: '14:45'
    },
    {
      id: 'P003',
      name: 'Michael Chen',
      age: 67,
      department: 'Cardiology',
      status: 'urgent',
      stage: 'admitted',
      doctor: 'Dr. Patel',
      time: '09:15'
    },
    {
      id: 'P004',
      name: 'Emma Wilson',
      age: 28,
      department: 'Orthopedics',
      status: 'routine',
      stage: 'waiting',
      doctor: 'N/A',
      time: '13:30'
    },
    {
      id: 'P005',
      name: 'Robert Davis',
      age: 54,
      department: 'Surgery',
      status: 'critical',
      stage: 'admitted',
      doctor: 'Dr. Martinez',
      time: '08:00'
    },
    {
      id: 'P006',
      name: 'Lisa Anderson',
      age: 39,
      department: 'Pediatrics',
      status: 'routine',
      stage: 'discharge-ready',
      doctor: 'Dr. Lee',
      time: '10:30'
    },
    {
      id: 'P007',
      name: 'David Brown',
      age: 71,
      department: 'Emergency',
      status: 'urgent',
      stage: 'waiting',
      doctor: 'N/A',
      time: '14:55'
    },
    {
      id: 'P008',
      name: 'Jennifer Taylor',
      age: 43,
      department: 'ICU',
      status: 'critical',
      stage: 'admitted',
      doctor: 'Dr. Kumar',
      time: '06:00'
    }
  ]

  const getStatusColor = (status) => {
    const colors = {
      'critical': 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
      'urgent': 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
      'routine': 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
    }
    return colors[status] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
  }

  const getStageColor = (stage) => {
    const colors = {
      'in-treatment': 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
      'waiting': 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
      'admitted': 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
      'discharge-ready': 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
    }
    return colors[stage] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-400 dark:border-gray-700 overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-400 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <th className="text-left px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Patient</th>
              <th className="text-left px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Department</th>
              <th className="text-left px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Status</th>
              <th className="text-left px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Stage</th>
              <th className="text-left px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Doctor</th>
              <th className="text-left px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Time</th>
              <th className="text-left px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, idx) => (
              <tr key={idx} className="border-b border-gray-400 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="px-4 sm:px-6 py-3 sm:py-4">
                  <div>
                    <p className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white truncate">{patient.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{patient.id} • {patient.age}y</p>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">{patient.department}</td>
                <td className="px-4 sm:px-6 py-3 sm:py-4">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium inline-block ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-3 sm:py-4">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium inline-block ${getStageColor(patient.stage)}`}>
                    {patient.stage}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-blue-600 dark:text-blue-400">{patient.doctor}</td>
                <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">{patient.time}</td>
                <td className="px-4 sm:px-6 py-3 sm:py-4">
                  <Button className="text-blue-600 bg-white dark:bg-black hover:bg-gray-300 dark:hover:bg-gray-900 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-xs sm:text-sm">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden p-4 space-y-4">
        {patients.map((patient, idx) => (
          <div key={idx} className="border border-gray-400 dark:border-gray-700 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{patient.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{patient.id} • {patient.age}y</p>
              </div>
              <Button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-xs flex-shrink-0">
                View
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-1">Department</p>
                <p className="font-medium text-gray-900 dark:text-white">{patient.department}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-1">Doctor</p>
                <p className="font-medium text-blue-600 dark:text-blue-400">{patient.doctor}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-1">Time</p>
                <p className="font-medium text-gray-900 dark:text-white">{patient.time}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-1">Status</p>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium inline-block ${getStatusColor(patient.status)}`}>
                  {patient.status}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStageColor(patient.stage)}`}>
                {patient.stage}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
