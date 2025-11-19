"use client";

import React, { useState } from "react";
import NotificationItem from "./NotificationItem";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";

const NotificationList = () => {
    const [filter, setFilter] = useState("all"); // 'all', 'unread'

    // Mock data - in a real app this would come from props or a store
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "System Update Scheduled",
            message: "The system will undergo maintenance tonight at 2:00 AM EST. Expected downtime is 30 minutes.",
            time: "2 hours ago",
            type: "info",
            isRead: false,
        },
        {
            id: 2,
            title: "Low Stock Alert",
            message: "Surgical masks inventory is running low. Only 5 boxes remaining in the main storage.",
            time: "4 hours ago",
            type: "warning",
            isRead: false,
        },
        {
            id: 3,
            title: "New Staff Member Added",
            message: "Dr. Sarah Jenkins has been successfully added to the Cardiology department.",
            time: "1 day ago",
            type: "success",
            isRead: true,
        },
        {
            id: 4,
            title: "Backup Failed",
            message: "Daily data backup failed due to connection timeout. Please check server logs.",
            time: "1 day ago",
            type: "error",
            isRead: true,
        },
        {
            id: 5,
            title: "Shift Reminder",
            message: "You have an upcoming shift tomorrow at 8:00 AM.",
            time: "2 days ago",
            type: "default",
            isRead: true,
        },
    ]);

    const filteredNotifications = notifications.filter((n) => {
        if (filter === "unread") return !n.isRead;
        return true;
    });

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    return (
        <div className="w-full max-w-3xl mx-auto bg-white dark:bg-zinc-950 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
                <div className="flex items-center gap-2">
                    <Button
                        variant={filter === "all" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setFilter("all")}
                        className="text-xs"
                    >
                        All
                    </Button>
                    <Button
                        variant={filter === "unread" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setFilter("unread")}
                        className="text-xs"
                    >
                        Unread
                    </Button>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                    <CheckCheck className="h-3.5 w-3.5 mr-1.5" />
                    Mark all as read
                </Button>
            </div>

            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} />
                    ))
                ) : (
                    <div className="p-8 text-center text-zinc-500 dark:text-zinc-400">
                        <p>No notifications found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationList;
