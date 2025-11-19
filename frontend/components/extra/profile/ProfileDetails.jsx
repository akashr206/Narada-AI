import React from "react";
import { User, Phone, Building, Award, Clock, FileText } from "lucide-react";

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Personal Information */}
            <div className="md:col-span-2 space-y-6">
                <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                        <User className="h-5 w-5 text-blue-500" />
                        Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DetailItem icon={User} label="Full Name" value="Alex Morgan" />
                        <DetailItem icon={Building} label="Department" value="Cardiology" />
                        <DetailItem icon={Phone} label="Phone" value="+1 (555) 123-4567" />
                        <DetailItem icon={Clock} label="Timezone" value="EST (UTC-5)" />
                        <DetailItem icon={Award} label="Role" value="Senior Administrator" />
                        <DetailItem icon={FileText} label="Employee ID" value="EMP-2024-892" />
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                        Bio
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        Dr. Alex Morgan is a dedicated Senior Cardiologist with over 15 years of experience in cardiovascular medicine.
                        Specializing in interventional cardiology, Dr. Morgan has led numerous successful procedures and research initiatives.
                        Passionate about patient care and medical innovation, he actively mentors junior staff and contributes to improving hospital operational efficiency.
                    </p>
                </div>
            </div>

            {/* Sidebar / Additional Info */}
            <div className="space-y-6">
                <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4 uppercase tracking-wider">
                        Skills & Expertise
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {["Cardiology", "Surgery", "Patient Care", "Team Leadership", "Medical Research", "Emergency Response"].map((skill) => (
                            <span
                                key={skill}
                                className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4 uppercase tracking-wider">
                        Current Shift
                    </h3>
                    <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase">Active Now</span>
                            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        </div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-200">
                            Emergency Ward - Wing A
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            08:00 AM - 08:00 PM
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;
