"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useSidebarOpen } from "@/hooks/useSidebar";

export default function LayoutContent({ children }) {
    const { openSidebar } = useSidebarOpen();

    return (
        <div className="flex h-screen">

            {/* Sidebar - desktop stays inline, mobile becomes overlay */}
            <Sidebar />

            {/* Main Content */}
            <div
                className={`relative transition-all duration-300 w-full
                    md:${openSidebar ? "ml-[300px]" : "ml-0"}
                `}
            >
                <Navbar />
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
