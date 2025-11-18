// Analyzer agent watches broadcast for analysis_request and runs the analyze_graph
// to predict patient load and staff/inventory needs; it then publishes final plan back on broadcast and results stream.
import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();
import { predictLoadNode } from "../langgraph/analyze_graph.js";
const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const sub = new Redis(redisUrl);
const pub = new Redis(redisUrl);
const AGENT_ID =
    process.env.AGENT_ID || `analyzer-${Math.floor(Math.random() * 1000)}`;

console.log(`[${AGENT_ID}] subscribing to broadcast...`);
await sub.subscribe("broadcast");

sub.on("message", async (channel, message) => {
    try {
        const msg = JSON.parse(message);
        if (msg.type !== "analysis_request") return;
        const req = msg.payload;
        console.log(
            `[${AGENT_ID}] analyzing task ${req.taskId} from ${req.from}`
        );

        const hospital = {
            name: req.hospital.name || "Unknown",
            beds: Number(process.env.HOSPITAL_BEDS || 100),
            doctors: Number(process.env.HOSPITAL_DOCTORS || 20),
            nurses: Number(process.env.HOSPITAL_NURSES || 60),
        };

        const state = { critical_incidents: req.critical_incidents, hospital };
        const out = await predictLoadNode(state);

        const finalPlan = {
            taskId: req.taskId,
            agent: AGENT_ID,
            predicted: out.analysis,
            raw: out.raw,
            timestamp: Date.now(),
        };

        await pub.publish(
            "broadcast",
            JSON.stringify({ type: "final_plan", payload: finalPlan })
        );
        await pub.xadd(
            "results:stream",
            "*",
            "payload",
            JSON.stringify({ stage: "final_plan", finalPlan })
        );
    } catch (e) {
        console.error(e);
    }
});
