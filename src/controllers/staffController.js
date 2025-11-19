import { db } from "../utils/db.js";
import { staff } from "../../schema.js";
import { eq } from "drizzle-orm";

export const getAllStaff = async (req, res) => {
    try {
        const allStaff = await db.select().from(staff);
        res.json(allStaff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOneStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const oneStaff = await db.select().from(staff).where(eq(staff.id, id));
        res.json(oneStaff[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createStaff = async (req, res) => {
    try {
        console.log(req.body);

        const newStaff = await db.insert(staff).values(req.body).returning();
        res.status(201).json(newStaff[0]);
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: error.message });
    }
};

export const bulkCreateStaff = async (req, res) => {
    try {
        console.log(req.body);

        const newStaff = await db.insert(staff).values(req.body).returning();
        res.status(201).json(newStaff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStaff = await db
            .update(staff)
            .set(req.body)
            .where(eq(staff.id, id))
            .returning();
        res.json(updatedStaff[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;
        await db.delete(staff).where(eq(staff.id, id));
        res.json({ message: "Staff deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
