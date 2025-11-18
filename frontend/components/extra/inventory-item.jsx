'use client';

export default function InventoryItem({ item }) {
  const getStatusColor = (status) => {
    const colors = {
      critical: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
      low: 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200',
      adequate: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      full: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    };
    return colors[status] || colors.adequate;
  };

  const getProgressColor = (status) => {
    const colors = {
      critical: 'bg-red-600',
      low: 'bg-amber-500',
      adequate: 'bg-blue-600',
      full: 'bg-green-600',
    };
    return colors[status] || colors.adequate;
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 bg-white dark:bg-gray-900 hover:shadow-md dark:hover:shadow-gray-800 transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
              {item.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.statuses?.map((status, idx) => (
                <span
                  key={idx}
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(
                    status.toLowerCase()
                  )}`}
                >
                  {status}
                </span>
              ))}
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex flex-wrap gap-1">
            <span>{item.category}</span>
            <span>•</span>
            <span>{item.location}</span>
            <span>•</span>
            <span>Last restocked: {item.lastRestocked}</span>
          </p>
        </div>
        <button className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors whitespace-nowrap">
          Reorder
        </button>
      </div>

      <div className="mb-3">
        <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Stock Level
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full ${getProgressColor(item.status)} rounded-full transition-all`}
            style={{ width: `${item.percentage}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm">
        <p className="text-gray-600 dark:text-gray-400">
          Min: {item.minimum} {item.unit}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <p className="font-semibold text-gray-900 dark:text-white">
            {item.current} / {item.total} {item.unit}
          </p>
          <p className="text-gray-600 dark:text-gray-400">{item.percentage}% capacity</p>
        </div>
      </div>

      <button className="sm:hidden w-full mt-3 px-3 py-2 text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        Reorder
      </button>
    </div>
  );
}
