'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import InventoryMetrics from '@/components/extra/inventory-metrics';
import InventoryList from '@/components/extra/inventory-list';
import { Button } from '../../components/ui/button';

export default function InventoryPage() {
  return (
    <main className="flex-1 min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white truncate">
              Inventory Management
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
              Real-time supply tracking and automated reordering
            </p>
          </div>
          <Button className="flex items-center justify-center gap-2 px-3 sm:px-4 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg font-medium text-xs sm:text-sm md:text-base transition-colors whitespace-nowrap flex-shrink-0">
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            <span>Manual Order</span>
          </Button>
        </div>

        {/* Metrics */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <InventoryMetrics />
        </div>

        {/* Inventory List */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border-1 border-gray-400 dark:border-gray-800 p-3 sm:p-4 md:p-6 lg:p-8">
          <InventoryList />
        </div>
      </div>
    </main>
  );
}
