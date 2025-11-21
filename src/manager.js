// Manager enqueues a "monitor hospital" task into tasks:stream and listens to results:stream & broadcast for updates.
// Use this to start the pipeline for a hospital location.
import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();
import { v4 as uuidv4 } from "uuid";

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const r = new Redis(redisUrl);
const sub = r.duplicate();

console.log(
    "[manager] starting. type 'start' to create a monitor task, or 'exit' to quit."
);
await sub.subscribe("broadcast"); 

sub.on("message", (ch, message) => {
    try {
        const m = JSON.parse(message);
        if (m.type === "final_plan") {
            console.log(
                "[manager] final_plan received:",
                JSON.stringify(m.payload, null, 2)
            );
        } else {
            // show other events if needed
            console.log("[manager] broadcast:", m);
        }
    } catch (e) {
        // ignore non-json
    }
});


// Simple CLI to enqueue a monitor task
import readline from "readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.on("line", async (line) => {
    const cmd = line.trim();
    if (!cmd) return;
    if (cmd === "exit") process.exit(0);
    // sample usage: start <lat> <lon> <hospitalName>
    
    if (cmd === "start") {
        const task = {
            id: uuidv4(),
            type: "monitor",
            createdAt: Date.now(),
        };
        // push to stream
        await r.xadd("tasks:stream", "*", "value", JSON.stringify(task));
        console.log("[manager] enqueued monitor task:", task.id);
    } else {
        console.log(
            "Usage: start  [hospitalName]  (e.g. start 12.9716 77.5946 ApolloHospital)"
        );
    }
});
