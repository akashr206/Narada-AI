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
await sub.subscribe("broadcast"); // to listen to final plans and updates

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

// listen to results stream (acknowledgements)
async function tailResults() {
    const STREAM = "results:stream";
    // create group if missing
    try {
        await r.xgroup("CREATE", STREAM, "manager_group", "$", "MKSTREAM");
    } catch (e) {}
    while (true) {
        try {
            const res = await r.xreadgroup(
                "GROUP",
                "manager_group",
                "manager",
                "COUNT",
                5,
                "BLOCK",
                5000,
                "STREAMS",
                STREAM,
                ">"
            );
            if (!res) continue;
            for (const [, messages] of res) {
                for (const [id, fields] of messages) {
                    const payload = JSON.parse(fields[1]);
                    console.log("[manager] result-stream:", payload);
                    await r.xack(STREAM, "manager_group", id);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
}
tailResults();

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
    const parts = cmd.split(" ");
    if (parts[0] === "start" && parts.length >= 3) {
        const lat = Number(parts[1]);
        const lon = Number(parts[2]);
        const name = parts.slice(3).join(" ") || "My Hospital";
        const task = {
            id: uuidv4(),
            type: "monitor",
            hospital: { name, lat, lon },
            createdAt: Date.now(),
        };
        // push to stream
        await r.xadd("tasks:stream", "*", "value", JSON.stringify(task));
        console.log("[manager] enqueued monitor task:", task.id);
    } else {
        console.log(
            "Usage: start <lat> <lon> [hospitalName]  (e.g. start 12.9716 77.5946 ApolloHospital)"
        );
    }
});
