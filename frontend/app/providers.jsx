"use client";
import { SessionProvider } from "next-auth/react";
import { HospitalIdProvider } from "@/context/HospitalIdContext";

export function Providers({ children }) {
    return (
        <SessionProvider>
            <HospitalIdProvider>{children}</HospitalIdProvider>
        </SessionProvider>
    );
}
