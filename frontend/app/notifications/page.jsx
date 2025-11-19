import React from "react";
import NotificationList from "@/components/extra/notifications/NotificationList";

export default function NotificationsPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Notifications
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Stay updated with the latest alerts, system messages, and team activities.
                    </p>
                </div>

                <NotificationList />
            </div>
        </div>
    );
}
