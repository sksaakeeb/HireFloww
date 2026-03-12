import { GoogleGenerativeAI } from "@google/generative-ai";

import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getCompanyDetails = async (req, res) => {
  const { name } = req.params;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // The prompt
    const prompt = `Provide professional details for the company, very specific for an interview: "${name}". 
    Return ONLY a JSON object with: "description", "techStack" (array of 5), "branches" (array of 3), "name of the CEO", and "website". 
    Do not include markdown formatting or backticks.`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse the result
    const data = JSON.parse(text);

    res.status(200).json(data);
  } catch (error) {
    // THIS WILL LOG THE EXACT ERROR CODE (429, 403, etc.)
    console.error("--- GEMINI ERROR LOG ---");
    console.error("Status Code:", error.status);
    console.error("Error Message:", error.message);
    
    if (error.status === 429) {
      return res.status(429).json({ message: "API Limit reached. Please wait 1 minute." });
    }
    
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
