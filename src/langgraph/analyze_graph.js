import { callGemini } from "../utils/gemini-client.js";

export async function predictLoadNode(state) {
    const { critical_incidents, hospital } = state;

    const prompt = [
        `You are an expert hospital operations analyst. Given the hospital metadata and a list of critical incidents (with estimated additional patients), predict:`,
        `1) short predicted patient load increase over next 24 hours (number)`,
        `2) suggested staff redeployment plan by department (ER, Surgery, ICU, General wards) with numbers`,
        `3) essential inventory items likely to run low and suggested reorder quantities.`,
        `Return a JSON object: { predicted_increase: number, staff_plan: {...}, inventory_plan: [...] }`,
        `\nHospital metadata:\n${JSON.stringify(hospital, null, 2)}`,
        `\nCritical incidents:\n${JSON.stringify(critical_incidents, null, 2)}`,
    ];

    const text = await callGemini(prompt);
    // console.log(text);
    
    try {
        const start = text.indexOf("{");
        const jsonStr = text.slice(start);
        const parsed = JSON.parse(jsonStr);
        return { analysis: parsed, raw: text };
    } catch (e) {
        return { analysis: null, raw: text };
    }
}
