import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { SidebarOpenProvider } from "../hooks/useSidebar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Team Arise",
    description: "Team Arise's MumbaiHacks project",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 dark:bg-zinc-950`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <SidebarOpenProvider>
                        <div className="flex h-screen">
                            <Sidebar/>
                            <div className="relative w-full">
                                <Navbar />
                                <main className="overflow-y-auto p-6">
                                    {children}
                                </main>
                            </div>
                        </div>
                    </SidebarOpenProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
