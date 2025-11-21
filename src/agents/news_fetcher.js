// Agent that claims a "monitor" task from the task stream, fetches nearby news,
// publishes a 'summary_request' on broadcast so summarizer can act, and posts result to results stream.
import Redis from "ioredis";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { fetchNearbyNews } from "../utils/geonews.js";
dotenv.config();

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const redis = new Redis(redisUrl);
const pub = redis.duplicate(); 

const AGENT_ID =`news_fetcher`;
console.log(`[${AGENT_ID}] started. Claiming tasks from tasks:stream...`);

// Claiming/consumer group setup helpers
const STREAM = "tasks:stream";
const GROUP = "task_consumers";
async function ensureGroup() {
    try {
        await redis.xgroup("CREATE", STREAM, GROUP, "$", "MKSTREAM");
    } catch (e) {
        // already exists => ignore
    }
} 
await ensureGroup();

async function claimAndProcess() {
    // read one message for this consumer
    const res = await redis.xreadgroup(
        "GROUP",
        GROUP,
        AGENT_ID,
        "COUNT",
        1,
        "BLOCK",
        2000,
        "STREAMS",
        STREAM,
        ">"
    );
    if (!res) return;
    const [stream, messages] = res[0];
    for (const [id, fields] of messages) {
        const obj = JSON.parse(fields[1]); // fields are [key, value] pairs; we put value at index 1
        console.log(`[${AGENT_ID}] claimed task ${id}`, obj);
        try {
            const incidents = await fetchNearbyNews();
            // publish to broadcast for summarizers
            const summaryRequest = {
                id: uuidv4(),
                from: AGENT_ID,
                taskId: id,
                incidents,
            };
            await pub.publish(
                "broadcast",
                JSON.stringify({
                    type: "summary_request",
                    payload: summaryRequest,
                })
            );
            // Acknowledge stream entry
            await redis.xack(STREAM, GROUP, id);
        } catch (e) {
            console.error("processing error", e);
            // don't ack to allow retries / manual inspection
        }
    }
}

setInterval(claimAndProcess, 1000);

// also listen to broadcast for coordination
const sub = redis.duplicate();
await sub.subscribe("broadcast");
sub.on("message", (ch, message) => {
    // optional: react to conversation
    // console.log(`[${AGENT_ID}] heard: ${message}`);
});
