import express from "express";
import { db } from "../utils/db.js";
import { users } from "../../schema.js";
import { eq } from "drizzle-orm";

const router = express.Router();

// Sync user from Google Auth
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

// Onboard user
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

export default router;
