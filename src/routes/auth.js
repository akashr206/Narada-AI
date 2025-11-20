import express from "express";
import { db } from "../utils/db.js";
import { users } from "../../schema.js";
import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";

const router = express.Router();

router.post("/sync", async (req, res) => {
    const { email, name, image } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (existingUser.length > 0) {
            return res.json({ user: existingUser[0] });
        }

        const newUser = await db
            .insert(users)
            .values({
                email,
                name,
                image,
                createdAt: new Date().toISOString(),
                isOnboarded: 0,
            })
            .returning();

        res.json({ user: newUser[0] });
    } catch (error) {
        console.error("Error syncing user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/onboard", async (req, res) => {
    const { email, hospitalName, location, adminName } = req.body;

    if (!email || !hospitalName || !location || !adminName) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const updatedUser = await db
            .update(users)
            .set({
                hospitalName,
                location,
                adminName,
                hospitalId: uuid(),
                isOnboarded: 1,
            })
            .where(eq(users.email, email))
            .returning();

        if (updatedUser.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ user: updatedUser[0] });
    } catch (error) {
        console.error("Error onboarding user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/hospital-id", async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const user = await db
            .select({ hospitalId: users.hospitalId })
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (user.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ hospitalId: user[0].hospitalId });
    } catch (error) {
        console.error("Error getting hospital ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
