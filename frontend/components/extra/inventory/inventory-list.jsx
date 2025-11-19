"use client";

import { useState, useMemo } from "react";
import InventoryItem from "../inventory-item";
import InventorySearch from "../inventory-search";

export default function InventoryList() {
    const [searchTerm, setSearchTerm] = useState("");

    const inventoryItems = [
        {
            name: "Syringes (10ml)",
            statuses: ["CRITICAL", "AUTO-ORDER"],
            category: "Medical Supplies",
            location: "Supply Closet A",
            lastRestocked: "5 days ago",
            current: 156,
            total: 2000,
            unit: "boxes",
            minimum: 500,
            percentage: 8,
            status: "critical",
        },
        {
            name: "Gauze Pads (4x4)",
            statuses: ["LOW", "AUTO-ORDER"],
            category: "Medical Supplies",
            location: "Supply Closet B",
            lastRestocked: "2 days ago",
            current: 420,
            total: 1500,
            unit: "boxes",
            minimum: 300,
            percentage: 28,
            status: "low",
        },
        {
            name: "Oxygen Cylinders",
            statuses: ["ADEQUATE"],
            category: "Equipment",
            location: "Equipment Bay",
            lastRestocked: "6 hours ago",
            current: 34,
            total: 50,
            unit: "units",
            minimum: 20,
            percentage: 68,
            status: "adequate",
        },
        {
            name: "Surgical Gloves (Size M)",
            statuses: ["CRITICAL", "AUTO-ORDER"],
            category: "PPE",
            location: "Storage Room A",
            lastRestocked: "2 days ago",
            current: 45,
            total: 1000,
            unit: "boxes",
            minimum: 200,
            percentage: 5,
            status: "critical",
        },
        {
            name: "N95 Masks",
            statuses: ["LOW", "AUTO-ORDER"],
            category: "PPE",
            location: "Storage Room A",
            lastRestocked: "1 week ago",
            current: 380,
            total: 2000,
            unit: "boxes",
            minimum: 300,
            percentage: 19,
            status: "low",
        },
        {
            name: "Type O- Blood",
            statuses: ["ADEQUATE", "AUTO-ORDER"],
            category: "Blood Products",
            location: "Blood Bank",
            lastRestocked: "3 hours ago",
            current: 23,
            total: 50,
            unit: "units",
            minimum: 15,
            percentage: 46,
            status: "adequate",
        },
        {
            name: "Insulin (Regular)",
            statuses: ["ADEQUATE", "AUTO-ORDER"],
            category: "Medications",
            location: "Pharmacy",
            lastRestocked: "1 day ago",
            current: 67,
            total: 100,
            unit: "vials",
            minimum: 30,
            percentage: 67,
            status: "adequate",
        },
        {
            name: "IV Bags (Normal Saline)",
            statuses: ["FULL", "AUTO-ORDER"],
            category: "Medical Supplies",
            location: "Supply Closet B",
            lastRestocked: "12 hours ago",
            current: 890,
            total: 1000,
            unit: "units",
            minimum: 200,
            percentage: 89,
            status: "full",
        },
    ];

    const filteredItems = useMemo(() => {
        if (!searchTerm.trim()) return inventoryItems;
        return inventoryItems.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                item.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <div className="space-y-4 sm:space-y-6">
            <div>
                <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white mb-3 sm:mb-4">
                    Supply Status
                </h2>
                <InventorySearch onSearch={setSearchTerm} />
            </div>

            <div className="space-y-3 sm:space-y-4">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                        <InventoryItem key={index} item={item} />
                    ))
                ) : (
                    <div className="text-center py-12">
                        <p className="text-zinc-600 dark:text-zinc-400">
                            No supplies found matching your search.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
