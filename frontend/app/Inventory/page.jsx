import React from "react";
import StateCard from "../Inventory/component/StateCard";
import {
  ShoppingCart,
  Search,
  AlertTriangle,
  TrendingDown,
  Package,
} from "lucide-react";

export const InventoryDashboard = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        /* Header */
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Inventory Management
            </h1>
            <p>Real-time supply tracking and automated reordering</p>
          </div>
          <button>
            <ShoppingCart size={20} />
            Manual Order
          </button>
        </div>
        /* Stats Cards */
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          /* First card */
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex justify-between items-center">
            <div>
              <p>Critical Items</p>
              <p>{criticalItems}</p>
            </div>
            <AlertTriangle className="text-red-600" size={40} />
          </div>
          /* Second card */
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex justify-between items-center">
            <div>
              <p className="text-amber-700 text-sm font-medium mb-1">
                Low Stock
              </p>
              <p className="text-amber-900 text-4xl font-bold">
                {lowStockItems}
              </p>
            </div>
            <TrendingDown className="text-amber-600" size={40} />
          </div>
          /* Third card */
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex justify-between items-center">
            <div>
              <p className="text-blue-700 text-sm font-medium mb-1">
                Total Items
              </p>
              <p className="text-blue-900 text-4xl font-bold">{totalItems}</p>
            </div>
            <Package className="text-blue-600" size={40} />
          </div>
          /* Fourth card */
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex justify-between items-center">
            <div>
              <p className="text-green-700 text-sm font-medium mb-1">
                Auto-Order Active
              </p>
              <p className="text-green-900 text-4xl font-bold">
                {autoOrdersActive}
              </p>
            </div>
            <ShoppingCart className="text-green-600" size={40} />
          </div>
        </div>
        /*Supply status*/
        <div></div>
      </div>
    </>
  );
};
