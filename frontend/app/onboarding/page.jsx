"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { token } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function Onboarding() {
    const { data: session, update } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const data = {
            email: session?.user?.email,
            hospitalName: formData.get("hospitalName"),
            location: formData.get("location"),
            adminName: formData.get("adminName"),
        };

        try {
            const t = await token();
            const response = await fetch(
                `${
                    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
                }/api/auth/onboard`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${t}`,
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) throw new Error("Failed to onboard");

            await update({ isOnboarded: 1 });
            router.push("/dashboard");
            toast.success("Onboarding complete!");
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Welcome to NaradaAI</CardTitle>
                    <CardDescription>
                        Please provide your hospital details to get started.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="hospitalName">Hospital Name</Label>
                            <Input
                                id="hospitalName"
                                name="hospitalName"
                                required
                                placeholder="e.g. City General Hospital"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                required
                                placeholder="e.g. New York, NY"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="adminName">Admin Name</Label>
                            <Input
                                id="adminName"
                                name="adminName"
                                required
                                placeholder="Your Name"
                            />
                        </div>
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Setting up..." : "Complete Setup"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
