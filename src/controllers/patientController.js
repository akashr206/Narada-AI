import { db } from "../utils/db.js";
import { patients } from "../../schema.js";
import { eq } from "drizzle-orm";

export const getAllPatients = async (req, res) => {
    try {
        const allPatients = await db.select().from(patients);
        res.json(allPatients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createPatient = async (req, res) => {
    try {
        const newPatient = await db
            .insert(patients)
            .values(req.body)
            .returning();
        res.status(201).json(newPatient[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const bulkCreatePatients = async (req, res) => {
    try {
        const newPatients = await db
            .insert(patients)
            .values(req.body)
            .returning();
        res.status(201).json(newPatients);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ error: error.message });
    }
};

export const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPatient = await db
            .update(patients)
            .set(req.body)
            .where(eq(patients.id, id))
            .returning();
        res.json(updatedPatient[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        await db.delete(patients).where(eq(patients.id, id));
        res.json({ message: "Patient deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
