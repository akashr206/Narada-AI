"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { CircleCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ResponseDialog } from "@/components/ai-status/ResponseDialog";

const socket = io("http://localhost:8000");

export default function Page() {
    const [updates, setUpdates] = useState({});
    const [isRunning, setIsRunning] = useState(false);
    const [error, setError] = useState(null);
    const [batchId, setBatchId] = useState("");
    const [finalPlan, setFinalPlan] = useState(null);
    const [selectedUpdate, setSelectedUpdate] = useState(null);

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
            setFinalPlan(data.finalPlan); // Store the full object
            console.log(data.finalPlan);

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
        setFinalPlan(null);

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
        <div className="min-h-screen py-6 px-4 sm:py-10 sm:px-6 lg:px-8 bg-background transition-colors duration-300">
            <div className="max-w-4xl mx-auto w-full">
                <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                    <div className="px-4 py-4 sm:px-8 sm:py-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                            Agentic Cycle Monitor
                        </h2>
                        {hasStarted && (
                            <div className="flex items-center gap-2">
                                <span className="text-xs sm:text-sm text-muted-foreground">Batch ID:</span>
                                <code className="bg-muted px-2 py-1 rounded text-xs font-mono text-foreground">
                                    {batchId}
                                </code>
                            </div>
                        )}
                    </div>

                    <div className="p-4 sm:p-8">
                        {!hasStarted && (
                            <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-center">
                                <div className="mb-6 p-4 bg-blue-500/10 rounded-full">
                                    <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-medium text-foreground mb-2">Ready to Start</h3>
                                <p className="text-muted-foreground mb-8 max-w-md text-sm sm:text-base">
                                    Initiate the multi-agent workflow to analyze hospital data and generate an operational plan.
                                </p>
                                <Button
                                    onClick={startBatch}
                                    disabled={isRunning}
                                    size="lg"
                                    className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto min-w-[200px]"
                                >
                                    {isRunning ? "Starting..." : "Start Batch Analysis"}
                                </Button>
                                {error && (
                                    <div className="mt-6 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm max-w-md">
                                        {error}
                                    </div>
                                )}
                            </div>
                        )}

                        {hasStarted && (
                            <motion.div className="space-y-3 sm:space-y-4">
                                {updatesList.map((u) => (
                                    <motion.div
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        key={u.id}
                                        className={cn(
                                            "p-4 rounded-lg border transition-all",
                                            u.status === "running" || u.status === "fetching" ? "bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800" :
                                                u.status === "complete" ? "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800" :
                                                    u.status === "error" ? "bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-800" :
                                                        "bg-card border-border",
                                            u.id === "exit" && "hidden"
                                        )}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                                            <div className="shrink-0 mt-1">
                                                {u.status === "running" || u.status === "fetching" ? (
                                                    <Loader2 className="animate-spin w-5 h-5 text-amber-500" />
                                                ) : u.status === "complete" ? (
                                                    <CircleCheck className="w-5 h-5 text-emerald-500" />
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-zinc-800" />
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                                    <span className="font-semibold text-foreground capitalize">
                                                        {u.agent}
                                                    </span>
                                                    <span className={cn(
                                                        "text-xs px-2 py-0.5 rounded-full uppercase tracking-wider font-medium",
                                                        u.status === "running" || u.status === "fetching" ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" :
                                                            u.status === "complete" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" :
                                                                "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400"
                                                    )}>
                                                        {u.status}
                                                    </span>
                                                </div>

                                                {u.status === "running" || u.status === "fetching" ? (
                                                    <p className="text-sm text-muted-foreground animate-pulse">
                                                        {u.message}
                                                    </p>
                                                ) : (
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-2">
                                                        <p className="text-sm text-muted-foreground truncate max-w-full sm:max-w-[300px]">
                                                            Response received
                                                        </p>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setSelectedUpdate(u)}
                                                            className="w-full sm:w-auto h-8 text-xs whitespace-nowrap"
                                                        >
                                                            View Response
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {updates.completed && (
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 items-stretch sm:items-center">
                                <div className="px-4 py-2 sm:py-2.5 flex-1 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg flex items-center justify-center">
                                    <span className="text-emerald-700 dark:text-emerald-400 font-medium text-sm sm:text-base flex items-center gap-2">
                                        <CircleCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                                        Cycle Completed
                                    </span>
                                </div>
                                <Button
                                    onClick={startBatch}
                                    disabled={isRunning}
                                    className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto px-6 sm:px-8 h-10 sm:h-auto"
                                >
                                    Start Again
                                </Button>
                            </div>
                        )}
                        {finalPlan && (
                            <div className="mt-4 sm:mt-6 px-4 py-3 sm:py-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-full">
                                            <CircleCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <p className="text-emerald-900 dark:text-emerald-100 font-semibold text-sm sm:text-base">Final Plan Generated</p>
                                            <p className="text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm">Ready for review and implementation</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setSelectedUpdate({
                                                agent: "Final Plan",
                                                message: finalPlan,
                                            })
                                        }
                                        className="w-full sm:w-auto border-emerald-200 hover:bg-emerald-100 dark:border-emerald-800 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
                                    >
                                        View Plan
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ResponseDialog
                isOpen={!!selectedUpdate}
                onClose={() => setSelectedUpdate(null)}
                title={
                    selectedUpdate?.agent
                        ? `${selectedUpdate.agent} Response`
                        : "Agent Response"
                }
                data={selectedUpdate?.message}
            />
        </div>
    );
}
