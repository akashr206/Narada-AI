import { db } from "../utils/db.js";
import { department } from "../../schema.js";
import { eq } from "drizzle-orm";

export const getAllDepartments = async (req, res) => {
    try {
        const allDepartments = await db.select().from(department);
        res.json(allDepartments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createDepartment = async (req, res) => {
    try {
        const newDepartment = await db
            .insert(department)
            .values(req.body)
            .returning();
        res.status(201).json(newDepartment[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const bulkCreateDepartments = async (req, res) => {
    try {
        const newDepartments = await db
            .insert(department)
            .values(req.body)
            .returning();
        res.status(201).json(newDepartments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDepartment = await db
            .update(department)
            .set(req.body)
            .where(eq(department.id, id))
            .returning();
        res.json(updatedDepartment[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        await db.delete(department).where(eq(department.id, id));
        res.json({ message: "Department deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
