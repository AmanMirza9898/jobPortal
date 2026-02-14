import { GoogleGenerativeAI } from "@google/generative-ai";
import { PDFParse } from "pdf-parse";

export const scoreResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a resume (PDF)",
                success: false
            });
        }

        // Check for API Key
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("❌ GEMINI_API_KEY is undefined! Please check your .env file.");
            return res.status(500).json({
                message: "Server configuration error: API Key missing",
                success: false
            });
        }
        console.log("✅ GEMINI_API_KEY loaded successfully.");

        // Extract text from PDF
        const parser = new PDFParse({ data: req.file.buffer });
        const pdfData = await parser.getText();
        const resumeText = pdfData.text;

        if (!resumeText || resumeText.trim().length === 0) {
            return res.status(400).json({
                message: "Could not extract text from PDF. Please ensure the PDF is not an image-only scan.",
                success: false
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // Using gemini-2.5-flash-lite for higher quota (1000 RPD)
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        const prompt = `
            You are an Expert Recruiter with 20 years of experience in technical hiring. 
            Evaluate the following resume text and provide a score out of 100.
            Provide the response strictly in JSON format with the following keys:
            {
              "score": number,
              "summary": "a brief 2-3 sentence summary of the candidate's profile",
              "tips": ["at least 3 actionable tips to improve the resume"],
              "missing_skills": ["a list of relevant industry skills that are missing based on the profile"]
            }

            Resume Text:
            ${resumeText}
        `;

        let result;
        try {
            console.log("Attempting analysis with gemini-2.5-flash-lite...");
            result = await model.generateContent(prompt);
        } catch (error) {
            console.error("Gemini 2.5 Flash Error:", error.message);
            throw error;
        }

        const response = await result.response;
        const text = response.text();

        // Clean up response text
        const cleanText = text.replace(/```json|```/g, "").trim();

        let jsonData;
        try {
            jsonData = JSON.parse(cleanText);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError, "Raw Text:", text);
            return res.status(500).json({
                message: "Failed to parse AI response. Please try again.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Resume scored successfully",
            data: jsonData,
            success: true
        });

    } catch (error) {
        console.error("AI Scorer Error Details:", error);
        return res.status(500).json({
            message: error.message || "Internal server error during resume scoring",
            success: false
        });
    }
}
