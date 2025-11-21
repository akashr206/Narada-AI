"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { CircleCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const socket = io("http://localhost:8000");

export default function Page() {
    const [updates, setUpdates] = useState({});
    const [isRunning, setIsRunning] = useState(false);
    const [error, setError] = useState(null);
    const [batchId, setBatchId] = useState("");

    useEffect(() => {
        const handleBatchUpdate = (data) => {
            if (!data.batchId) return;

            const item = data.payload;

            setUpdates((prev) => {
                const newUpdates = {
                    ...prev,
                    [item.id]: item,
                };
                delete newUpdates.completed;
                return newUpdates;
            });
        };

        const handleBatchCompleted = (data) => {
            setUpdates((prev) => ({
                ...prev,
                completed: true,
            }));
            setIsRunning(false);
        };

        socket.on("batch:update", handleBatchUpdate);
        socket.on("batch:completed", handleBatchCompleted);

        return () => {
            socket.off("batch:update", handleBatchUpdate);
            socket.off("batch:completed", handleBatchCompleted);
        };
    }, []);

    const startBatch = async () => {
        setError(null);
        setIsRunning(true);
        setUpdates({});

        try {
            const response = await fetch("http://localhost:8000/run_batch", {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error(
                    `Failed to start batch: ${response.statusText}`
                );
            }

            const result = await response.json();
            setBatchId(result.batchId);
            console.log("Batch started:", result.batchId);
        } catch (err) {
            setError(err.message);
            setIsRunning(false);
        }
    };

    const getStatusColor = (status) => {
        if (!status) return "text-gray-400 border-gray-400";
        if (status === "running" || status === "fetching")
            return "text-amber-500 border-amber-500";
        if (status === "complete") return "text-emerald-500 border-emerald-500";
        if (status === "error" || status === "failed")
            return "text-red-500 border-red-500";
        return "text-gray-400 border-gray-400";
    };

    const updatesList = Object.entries(updates)
        .filter(([key]) => key !== "completed")
        .map(([_, value]) => value);

    const hasStarted = updatesList.length > 0 || updates.completed;

    return (
        <div className="min-h-screen py-10 px-5">
            <div className="max-w-3xl mx-auto">
                <div className="bg-card rounded-xl shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b ">
                        <h2 className="text-2xl font-semibold">
                            Agentic Cycle Monitor
                        </h2>
                        {hasStarted && (
                            <p className="mt-2 text-sm text-muted-foreground">
                                Batch ID:{" "}
                                <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                                    {batchId}
                                </code>
                            </p>
                        )}
                    </div>

                    <div className="p-8">
                        {!hasStarted && (
                            <div className="flex flex-col items-center justify-center py-16">
                                <Button
                                    onClick={startBatch}
                                    disabled={isRunning}
                                    className={`bg-blue-500/90 text-white hover:bg-blue-600`}
                                >
                                    {isRunning ? "Starting..." : "Start Batch"}
                                </Button>
                                {error && (
                                    <div className="mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                        {error}
                                    </div>
                                )}
                            </div>
                        )}

                        {hasStarted && (
                            <motion.div className="space-y-3">
                                {updatesList.map((u) => (
                                    <motion.div
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        key={u.id}
                                        className={`p-4 bg-zinc-100/60 dark:bg-background rounded-lg  ${
                                            getStatusColor(u.status).split(
                                                " "
                                            )[1]
                                        } ${u.id==="exit" && "hidden"}`}
                                    >
                                        <div>
                                            <p
                                                className={
                                                    getStatusColor(
                                                        u.status
                                                    ).split(" ")[0] +
                                                    " flex items-center gap-2"
                                                }
                                            >
                                                {u.status === "running" ||
                                                u.status === "fetching" ? (
                                                    <Loader2 className="animate-spin ease-in w-5 h-5" />
                                                ) : (
                                                    <CircleCheck className="w-5 h-5" />
                                                )}
                                                <span
                                                    className={`text-lg  font-semibold capitalize flex items-center gap-1`}
                                                >
                                                    <span>{u.agent}</span>:
                                                    <span>{u.status}</span>
                                                </span>
                                            </p>
                                        </div>
                                        <p
                                            className={cn(
                                                "ml-8",
                                                u.status === "running" ||
                                                    u.status === "fetching"
                                                    ? "animate-pulse duration-100"
                                                    : "text-foreground"
                                            )}
                                        >
                                            {u.message + u.id}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {updates.completed && (
                            <div className="mt-6 px-4 py-3 bg-emerald-50 border dark:bg-emerald-950/70 dark:border-emerald-800 border-emerald-200 rounded-lg text-center">
                                <span className="text-emerald-700  dark:text-green-400">
                                    Agentic Cycle Completed Successfully
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
