import { callGemini } from "../utils/gemini-client.js";

export async function predictLoadNode(state) {
    const { critical_incidents, hospital, inventory, wards } = state;
    console.log(hospital);
    const prompt = [
        `You are an expert hospital operations analyst. Given the hospital metadata, hospital inventory, a list of critical incidents (with estimated additional patients), predict:`,
        `1) short predicted patient load increase over next 24 hours (number)`,
        `2) suggested staff redeployment or staff-addition plan for each ward, including recommended staffing numbers.`,
        `3) essential inventory items likely to run low and suggested reorder quantities.`,
        `Return a JSON object: { predictedPatientIncrease: number, staffPlan: {...}, inventoryPlan: [...] }`,
        `\nHospital metadata:\n${JSON.stringify(hospital, null, 2)}`,
        `\nHospital wards data:\n${JSON.stringify(wards, null, 2)}`,
        `\nHospital inventory:\n${JSON.stringify(inventory, null, 2)}`,
        `\nCritical incidents:\n${JSON.stringify(critical_incidents, null, 2)}`,
    ];

    const text = await callGemini(prompt);
    try {
        const start = text.indexOf("{");
        const jsonStr = text.slice(start);
        const parsed = JSON.parse(jsonStr);
        return { analysis: parsed, raw: text };
    } catch (e) {
        return { analysis: null, raw: text };
    }
}
