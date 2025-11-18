// Summarizer agent subscribes to broadcast, when it sees summary_request it runs the LangGraph node
// (we implemented as simple call function in src/langgraph/news_graph.js) and publishes 'analysis_request'.
import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();
import { summarizeIncidentsNode } from "../langgraph/news_graph.js";
const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const sub = new Redis(redisUrl);
const pub = new Redis(redisUrl);

const AGENT_ID =
    process.env.AGENT_ID || `summarizer-${Math.floor(Math.random() * 1000)}`;

console.log(`[${AGENT_ID}] subscribing to broadcast...`);
await sub.subscribe("broadcast");

sub.on("message", async (channel, message) => {
    try {
        const msg = JSON.parse(message);
        console.log(msg);
        
        if (msg.type !== "summary_request") return;
        const req = msg.payload;
        console.log(
            `[${AGENT_ID}] summarizing task ${req.taskId} from ${req.from}`
        );

        const state = { incidents: req.incidents, hospital: req.hospital };
        const out = await summarizeIncidentsNode(state);

        // publish summarized data to broadcast for analyzer
        const analysisReq = {
            id: req.id,
            from: AGENT_ID,
            taskId: req.taskId,
            hospital: req.hospital,
            critical_incidents: out.critical_incidents,
            raw_summary: out.raw_summary,
        };
        await pub.publish(
            "broadcast",
            JSON.stringify({ type: "analysis_request", payload: analysisReq })
        );

        // optionally publish to results stream for manager visibility
        await pub.xadd(
            "results:stream",
            "*",
            "payload",
            JSON.stringify({
                stage: "summarized",
                agent: AGENT_ID,
                analysisReq,
            })
        );
    } catch (e) {
        console.error(e);
    }
});
