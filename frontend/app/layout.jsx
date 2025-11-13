
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar"; // ← make sure you have this component

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
  description: "Team Arise's Codefury project",
};

export default function RootLayout({ children }) {

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-950`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex h-screen overflow-hidden">
              {/* Sidebar */}
                <aside className="w-64 border-r mt-20 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <Sidebar />
                </aside>

              {/* Main Content Area */}
              <div className="flex flex-col relative flex-1">
                <Navbar/>
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
