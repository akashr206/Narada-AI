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

export const hospitalStaff = pgTable("hospital_staff", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    role: varchar("role", { length: 100 }).notNull(),
    department: varchar("department", { length: 100 }).notNull(),
    status: varchar("status", { length: 50 }).notNull(),
    currentShift: varchar("current_shift", { length: 50 }).notNull(),
    hoursWorked: varchar("hours_worked", { length: 50 }).notNull(),
    nextShift: varchar("next_shift", { length: 50 }).notNull(),
});

