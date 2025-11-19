import dotenv from "dotenv";
dotenv.config();

async function checkSchema() {
    const { db } = await import("./utils/db.js");
    const { sql } = await import("drizzle-orm");

    try {
        console.log("Checking schema for table 'staff'...");
        const result = await db.execute(sql`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns 
            WHERE table_name = 'staff';
        `);

        if (result.length === 0) {
            console.log("Table 'staff' does NOT exist.");
        } else {
            console.log("Table 'staff' columns (JSON):");
            console.log(JSON.stringify(result, null, 2));
        }
        process.exit(0);
    } catch (error) {
        console.error("Error checking schema:", error);
        process.exit(1);
    }
}

checkSchema();
