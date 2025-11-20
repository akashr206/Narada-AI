import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Mail, Building } from "lucide-react";

const ProfileHeader = () => {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            {/* Cover Image */}
            <div className="h-32 md:h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                <div className="absolute inset-0 bg-black/10" />
            </div>

            <div className="px-6 pb-6">
                <div className="relative flex flex-col md:flex-row items-start md:items-end -mt-12 mb-4 gap-4">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-white dark:border-zinc-900 bg-white dark:bg-zinc-800 flex items-center justify-center text-3xl font-bold text-zinc-400 dark:text-zinc-500 overflow-hidden">
                            <Building className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-white dark:border-zinc-900" title="Verified" />
                    </div>

                    {/* User Info */}
                    <div className="flex-1 pt-2 md:pt-0">
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                            City General Hospital
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                            Hospital Administration • Main Branch
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-2 md:mt-0">
                        <Button variant="outline" className="dark:border-zinc-700 dark:text-zinc-300">
                            Edit Hospital Info
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            Share Profile
                        </Button>
                    </div>
                </div>

                {/* Quick Stats / Details */}
                <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-zinc-400" />
                        <span>123 Medical Center Dr, New York, NY</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Mail className="h-4 w-4 text-zinc-400" />
                        <span>admin@citygeneral.com</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-zinc-400" />
                        <span>Established 1985</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
