import express from "express";
import {
    getAllPatients,
    createPatient,
    bulkCreatePatients,
    updatePatient,
    deletePatient,
} from "../controllers/patientController.js";

const router = express.Router();

router.get("/", getAllPatients);
router.post("/", createPatient);
router.post("/bulk", bulkCreatePatients);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;
