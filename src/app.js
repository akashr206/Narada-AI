import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import staffRoutes from "./routes/staffRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import activityLogRoutes from "./routes/activityLogRoutes.js";
import authRoutes from "./routes/auth.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/staff", staffRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/activity-logs", activityLogRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
