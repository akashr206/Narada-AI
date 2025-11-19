import express from "express";
import {
    getAllDepartments,
    createDepartment,
    bulkCreateDepartments,
    updateDepartment,
    deleteDepartment,
} from "../controllers/departmentController.js";

const router = express.Router();

router.get("/", getAllDepartments);
router.post("/", createDepartment);
router.post("/bulk", bulkCreateDepartments);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);

export default router;
