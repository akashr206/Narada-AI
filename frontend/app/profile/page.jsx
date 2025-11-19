import React from "react";
import ProfileHeader from "@/components/extra/profile/ProfileHeader";
import ProfileDetails from "@/components/extra/profile/ProfileDetails";

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12">
            <div className="max-w-5xl mx-auto space-y-6">
                <ProfileHeader />
                <ProfileDetails />
            </div>
        </div>
    );
}
