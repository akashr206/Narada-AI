"use client";

import { useState } from "react";
import { Bell, Search, LogOut, User, Menu } from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [notificationCount] = useState(3);

  return (
    <nav className="sticky top-0 z-40 border-b w-screen border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950">
      <div className="flex h-16 items-center justify-between">
        {/* Sidebar Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </Button>

        {/* Search Bar */}
        <div className="max-w-md flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400 dark:text-gray-500" />
            <Input
              type="text"
              placeholder="Search patients, staff, supplies..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:bg-gray-700"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6 ml-auto">
          <ThemeToggle />

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                  {notificationCount}
                </span>
              )}
            </Button>
          </div>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Administrator
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white font-semibold">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 dark:bg-gray-800 dark:border-gray-700"
            >
              <DropdownMenuItem className="flex items-center gap-2 dark:text-gray-300 dark:focus:bg-gray-700">
                <User className="h-4 w-4" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="dark:bg-gray-700" />
              <DropdownMenuItem
                onClick={() => signOut()}
                className="flex items-center gap-2 text-red-600 focus:text-red-600 focus:bg-red-50 dark:text-red-400 dark:focus:bg-red-900/20"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
