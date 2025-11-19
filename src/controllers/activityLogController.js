import { db } from "../utils/db.js";
import { activityLog } from "../../schema.js";
import { eq } from "drizzle-orm";

export const getAllActivityLogs = async (req, res) => {
    try {
        const allActivityLogs = await db.select().from(activityLog);
        res.json(allActivityLogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createActivityLog = async (req, res) => {
    try {
        const newActivityLog = await db
            .insert(activityLog)
            .values(req.body)
            .returning();
        res.status(201).json(newActivityLog[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const bulkCreateActivityLogs = async (req, res) => {
    try {
        const newActivityLogs = await db
            .insert(activityLog)
            .values(req.body)
            .returning();
        res.status(201).json(newActivityLogs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

export const updateActivityLog = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedActivityLog = await db
            .update(activityLog)
            .set(req.body)
            .where(eq(activityLog.id, id))
            .returning();
        res.json(updatedActivityLog[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteActivityLog = async (req, res) => {
    try {
        const { id } = req.params;
        await db.delete(activityLog).where(eq(activityLog.id, id));
        res.json({ message: "Activity log deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
