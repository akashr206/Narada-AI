import React from "react";
import { User, Phone, Building, Mail, MapPin } from "lucide-react";

const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
        <div className="mt-0.5 p-2 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
            <Icon className="h-4 w-4" />
        </div>
        <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                {label}
            </p>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-200 mt-0.5">
                {value}
            </p>
        </div>
    </div>
);

const ProfileDetails = () => {
    return (
        <div className="space-y-6">
            {/* Hospital Information */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-500" />
                    Hospital Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailItem icon={Building} label="Hospital Name" value="City General Hospital" />
                    <DetailItem icon={User} label="Administrator" value="Dr. Alex Morgan" />
                    <DetailItem icon={MapPin} label="Address" value="123 Medical Center Dr, New York, NY 10001" />
                    <DetailItem icon={Phone} label="Contact Number" value="+1 (555) 123-4567" />
                    <DetailItem icon={Mail} label="Email" value="admin@citygeneral.com" />
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;
