"use client";
import React from "react";
import {
  ShoppingCart,
  AlertTriangle,
  TrendingDown,
  Package,
} from "lucide-react";

export default function InventoryDashboard() {
  // temporary placeholder data so the page renders.
  // Replace with real data or props / fetch hooks later.
  const criticalItems = 3;
  const lowStockItems = 12;
  const totalItems = 342;
  const autoOrdersActive = 5;

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Inventory Management
          </h1>
          <p>Real-time supply tracking and automated reordering</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md px-3 py-2 border">
          <ShoppingCart size={20} />
          Manual Order
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
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
            <p className="text-4xl font-bold text-amber-900">{lowStockItems}</p>
          </div>
          <TrendingDown className="text-amber-600" size={40} />
        </div>

        {/* Third card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex justify-between items-center">
          <div>
            <p className="text-blue-700 text-sm font-medium mb-1">
              Total Items
            </p>
            <p className="text-4xl font-bold text-blue-900">{totalItems}</p>
          </div>
          <Package className="text-blue-600" size={40} />
        </div>

        {/* Fourth card */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex justify-between items-center">
          <div>
            <p className="text-green-700 text-sm font-medium mb-1">
              Auto-Order Active
            </p>
            <p className="text-4xl font-bold text-green-900">
              {autoOrdersActive}
            </p>
          </div>
          <ShoppingCart className="text-green-600" size={40} />
        </div>
      </div>

      {/* Supply status */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Supply Status</h2>
        <p>Placeholder content — replace with actual table or components.</p>
      </section>
    </main>
  );
}
