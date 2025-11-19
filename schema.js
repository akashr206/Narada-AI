import { pgTable, serial, text, varchar, integer } from "drizzle-orm/pg-core";

export const patients = pgTable("patients", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    age: integer("age").notNull(),
    gender: varchar("gender", { length: 10 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    department: varchar("department", { length: 100 }).notNull(),
    status: varchar("status", { length: 50 }).notNull(),
    stage: varchar("stage", { length: 50 }).notNull(),
    doctor: varchar("doctor", { length: 255 }).notNull(),
    admissionTime: text("admission_time").notNull(),
});

export const staff = pgTable("staff", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    role: varchar("role", { length: 100 }).notNull(),
    department: varchar("department", { length: 100 }).notNull(),
    status: varchar("status", { length: 50 }).notNull(),
    currentShift: varchar("current_shift", { length: 50 }).notNull(),
    nextShift: varchar("next_shift", { length: 50 }).notNull(),
});

export const inventory = pgTable("inventory", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    statuses: varchar("statuses", { length: 50 }).notNull(),
    category: varchar("category", { length: 50 }).notNull(),
    location: varchar("location", { length: 50 }).notNull(),
    lastRestocked: varchar("last_restocked", { length: 50 }).notNull(),
    current: integer("current").notNull(),
    total: integer("total").notNull(),
    unit: varchar("unit", { length: 50 }).notNull(),
    minimum: integer("minimum").notNull(),
});

export const department = pgTable("department", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    current: integer("current").notNull(),
    max: integer("max").notNull(),
    status: varchar("status", { length: 50 }).notNull(),
});

export const activityLog = pgTable("activity_log", {
    id: serial("id").primaryKey(),
    timestamp: varchar("timestamp", { length: 50 }).notNull(),
    type: varchar("type", { length: 50 }).notNull(),
    severity: varchar("severity", { length: 50 }).notNull(),
    action: varchar("action", { length: 50 }).notNull(),
    user: varchar("user", { length: 50 }).notNull(),
    details: varchar("details", { length: 200 }).notNull(),
    impact: varchar("impact", { length: 50 }).notNull(),
});

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    image: varchar("image", { length: 500 }),
    hospitalName: varchar("hospital_name", { length: 255 }),
    location: varchar("location", { length: 255 }),
    adminName: varchar("admin_name", { length: 255 }),
    isOnboarded: integer("is_onboarded").default(0).notNull(), // 0 for false, 1 for true
    createdAt: varchar("created_at", { length: 50 }).notNull(),
});
