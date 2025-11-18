"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useSidebarOpen } from "./hooks/useSidebar";

export default function LayoutContent({ children }) {
    const { openSidebar } = useSidebarOpen();

    return (
        <div className="flex h-screen ">
            <Sidebar />

            <div
                className={`relative transition-all duration-300
                    ${openSidebar ? " w-[calc(100%-240px)]" : "ml-0 w-full"}
                `}
            >
                <Navbar />
                <main className=" p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
