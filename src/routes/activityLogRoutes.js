import express from "express";
import {
    getAllActivityLogs,
    createActivityLog,
    bulkCreateActivityLogs,
    updateActivityLog,
    deleteActivityLog,
} from "../controllers/activityLogController.js";

const router = express.Router();

router.get("/", getAllActivityLogs);
router.post("/", createActivityLog);
router.post("/bulk", bulkCreateActivityLogs);
router.put("/:id", updateActivityLog);
router.delete("/:id", deleteActivityLog);

export default router;
