import { db } from "./utils/db.js";
import { hospital, wards } from "../schema.js";

async function insertMockData() {
    const hospitalData = {
        id: 1,
        name: "CityCare Super Specialty Hospital",
        totalDoctors: 42, 
        totalNurses: 116, 
        icuCapacity: 20,
        updatedAt: new Date(),
    };

    const wardData = [
        {
            id: 1,
            name: "Emergency Ward",
            capacity: 25,
            occupied: 22,
            nurses: 18,
            doctors: 8,
            criticality: 5, // high urgency
            updatedAt: new Date(),
        },
        {
            id: 2,
            name: "ICU Ward",
            capacity: 20,
            occupied: 17,
            nurses: 32,
            doctors: 10,
            criticality: 5,
            updatedAt: new Date(),
        },
        {
            id: 3,
            name: "General Ward A",
            capacity: 40,
            occupied: 31,
            nurses: 15,
            doctors: 5,
            criticality: 2,
            updatedAt: new Date(),
        },
        {
            id: 4,
            name: "General Ward B",
            capacity: 40,
            occupied: 28,
            nurses: 14,
            doctors: 4,
            criticality: 1,
            updatedAt: new Date(),
        },
        {
            id: 5,
            name: "Maternity Ward",
            capacity: 30,
            occupied: 24,
            nurses: 20,
            doctors: 6,
            criticality: 3,
            updatedAt: new Date(),
        },
        {
            id: 6,
            name: "Pediatrics Ward",
            capacity: 28,
            occupied: 21,
            nurses: 17,
            doctors: 4,
            criticality: 3,
            updatedAt: new Date(),
        },
    ];

    try {
        await db
            .insert(hospital)
            .values(hospitalData)
        await db.insert(wards).values(wardData);

        console.log("Mock data inserted successfully!");
    } catch (error) {
        console.error("Error inserting mock data:", error);
    }
}

insertMockData();
