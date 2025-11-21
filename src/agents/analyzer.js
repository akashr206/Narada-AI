import Redis from "ioredis";
import dotenv from "dotenv";
import { db } from "../utils/db.js";
import { hospital, wards } from "../../schema.js";
dotenv.config();
import { predictLoadNode } from "../langgraph/analyze_graph.js";
const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";
import { addToStream } from "../utils/addToStream.js";
const sub = new Redis(redisUrl);
const pub = new Redis(redisUrl);
const r = sub.duplicate();
const AGENT_ID = `analyzer`;

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
        const STREAM = await r.get("current-stream");
        await addToStream(STREAM, {
            batch: STREAM,
            id: "hospital-data",
            agent : "Analyzer",
            status: "fetching",
            message: "Fetching hospital details",
        });
        let hospitalData = await db.select().from(hospital);
        let wardsData = await db.select().from(wards);
        hospitalData.wards = wardsData;
        await addToStream(STREAM, {
            batch: STREAM,
            id: "hospital-data",
            agent: "Analyzer",
            status: "complete",
            message: "Hospital details fetched",
        });
        await addToStream(STREAM, {
            batch: STREAM,
            id: AGENT_ID,
            agent: "Analyzer",
            status: "running",
            message: "Analyzing and predicting the surges",
        });

        const state = {
            critical_incidents: req.critical_incidents,
            hospital: hospitalData,
        }; 
        const out = await predictLoadNode(state);
        // const out = { analysis: "", raw: "" };
        const finalPlan = {
            taskId: req.taskId,
            agent: AGENT_ID,
            predicted: out.analysis,
            raw: out.raw,
            timestamp: Date.now(),
        };
        await addToStream(STREAM, {
            batch: STREAM,
            id: AGENT_ID,
            status: "complete",
            agent: "Analyzer",
            message: "Completed the final plan",
        });
        await addToStream(STREAM, {
            batch: STREAM,
            id: "exit",
            status: "complete",
        });

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
