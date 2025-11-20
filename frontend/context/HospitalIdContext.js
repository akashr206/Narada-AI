"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { API_URL } from "@/lib/utils2";

const HospitalIdContext = createContext();

export function HospitalIdProvider({ children }) {
    const { data: session } = useSession();
    const [hospitalId, setHospitalId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHospitalId = async () => {
            if (session?.user?.email) {
                setLoading(true);
                try {
                    const response = await fetch(
                        `${API_URL}/api/auth/hospital-id?email=${session.user.email}`
                    );
                    if (!response.ok) {
                        throw new Error("Failed to fetch hospital ID");
                    }
                    const data = await response.json();
                    console.log("HospitalId fetched:", data.hospitalId);
                    setHospitalId(data.hospitalId);
                } catch (err) {
                    setError(err.message);
                    console.error("Error fetching hospital ID:", err);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchHospitalId();
    }, [session]);

    return (
        <HospitalIdContext.Provider value={{ hospitalId, loading, error }}>
            {children}
        </HospitalIdContext.Provider>
    );
}

export function useHospitalId() {
    return useContext(HospitalIdContext);
}
