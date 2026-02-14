import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const testFinalLite = async () => {
    console.log("--- Gemini High-Quota (Lite) Verification ---");
    const key = process.env.GEMINI_API_KEY;

    if (!key) {
        console.error("❌ Error: GEMINI_API_KEY not found in .env file");
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        console.log("Sending test prompt to gemini-2.5-flash-lite...");
        const result = await model.generateContent("Confirm you are Gemini 2.5 Flash Lite and ready for 1000 daily requests.");
        const response = await result.response;
        const text = response.text();

        console.log("✅ Success! Gemini Lite Response:");
        console.log(text);
        console.log("-----------------------------------");
    } catch (error) {
        console.error("❌ Test Failed!");
        console.error("Status:", error.status);
        console.error("Message:", error.message);
    }
};

testFinalLite();
