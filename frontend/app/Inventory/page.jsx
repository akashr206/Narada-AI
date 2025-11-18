"use client";
import React, { useState } from "react";
import {
  ShoppingCart,
  AlertTriangle,
  TrendingDown,
  Package,
  Search,
} from "lucide-react";

export default function InventoryDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const criticalItems = 3;
  const lowStockItems = 12;
  const totalItems = 342;
  const autoOrdersActive = 5;

  const supplies = [
    {
      id: 1,
      name: "Surgical Gloves (Size M)",
      category: "PPE",
      location: "Storage Room A",
      lastRestocked: "1 week ago",
      currentStock: 380,
      maxStock: 2000,
      minStock: 300,
      unit: "boxes",
      status: "LOW",
      autoOrder: true,
    },
    {
      id: 2,
      name: "N95 Masks",
      category: "PPE",
      location: "Storage Room A",
      lastRestocked: "1 week ago",
      currentStock: 380,
      maxStock: 2000,
      minStock: 300,
      unit: "boxes",
      status: "LOW",
      autoOrder: true,
    },
    {
      id: 3,
      name: "Type O- Blood",
      category: "Blood Products",
      location: "Blood Bank",
      lastRestocked: "3 hours ago",
      currentStock: 23,
      maxStock: 50,
      minStock: 15,
      unit: "units",
      status: "ADEQUATE",
      autoOrder: true,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "CRITICAL":
        return "bg-red-100 text-red-700";
      case "LOW":
        return "bg-yellow-100 text-yellow-700";
      case "ADEQUATE":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case "CRITICAL":
        return "bg-red-500";
      case "LOW":
        return "bg-yellow-500";
      case "ADEQUATE":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCapacityPercentage = (current, max) => {
    return Math.round((current / max) * 100);
  };

  const filteredSupplies = supplies.filter((supply) =>
    supply.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Inventory Management
          </h1>
          <p className="text-gray-600">
            Real-time supply tracking and automated reordering
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50">
          <ShoppingCart size={20} />
          Manual Order
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* First card */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-red-700">Critical Items</p>
            <p className="text-2xl font-bold text-red-900">{criticalItems}</p>
          </div>
          <AlertTriangle className="text-red-600" size={40} />
        </div>

        {/* Second card */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex justify-between items-center">
          <div>
            <p className="text-amber-700 text-sm font-medium mb-1">Low Stock</p>
            <p className="text-2xl font-bold text-amber-900">{lowStockItems}</p>
          </div>
          <TrendingDown className="text-amber-600" size={40} />
        </div>

        {/* Third card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex justify-between items-center">
          <div>
            <p className="text-blue-700 text-sm font-medium mb-1">
              Total Items
            </p>
            <p className="text-2xl font-bold text-blue-900">{totalItems}</p>
          </div>
          <Package className="text-blue-600" size={40} />
        </div>

        {/* Fourth card */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex justify-between items-center">
          <div>
            <p className="text-green-700 text-sm font-medium mb-1">
              Auto-Order Active
            </p>
            <p className="text-2xl font-bold text-green-900">
              {autoOrdersActive}
            </p>
          </div>
          <ShoppingCart className="text-green-600" size={40} />
        </div>
      </div>

      {/* Supply status */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Supply Status</h2>
            {/* Search Bar */}
            <div className="relative w-64">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search supplies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Supply Cards */}
          <div className="space-y-4">
            {filteredSupplies.map((supply) => {
              const capacityPercent = getCapacityPercentage(
                supply.currentStock,
                supply.maxStock
              );

              return (
                <div
                  key={supply.id}
                  className="bg-gray-50 rounded-lg border border-gray-200 p-6"
                >
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {supply.name}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            supply.status
                          )}`}
                        >
                          {supply.status}
                        </span>
                        {supply.autoOrder && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-700">
                            AUTO-ORDER
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{supply.category}</span>
                        <span>•</span>
                        <span>{supply.location}</span>
                        <span>•</span>
                        <span>Last restocked: {supply.lastRestocked}</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors bg-white">
                      Reorder
                    </button>
                  </div>

                  {/* Stock Level Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Stock Level
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {supply.currentStock} / {supply.maxStock} {supply.unit}
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                      <div
                        className={`h-full ${getProgressColor(
                          supply.status
                        )} transition-all duration-300`}
                        style={{ width: `${capacityPercent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>
                        Min: {supply.minStock} {supply.unit}
                      </span>
                      <span>{capacityPercent}% capacity</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSupplies.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                No supplies found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
