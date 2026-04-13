import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

class GoogleAIClient {
  constructor() {
    if (!GOOGLE_API_KEY) {
      throw new Error("GOOGLE_API_KEY is not defined in environment variables");
    }
    this.genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  /**
   * Generate text using Gemini 2.0 Flash
   * @param {string} prompt
   * @param {Array}  history  - [{role:"user"|"model", parts:[{text}]}]
   * @returns {Promise<string>}
   */
  async generateText(prompt, history = []) {
    try {
      const chat = this.model.startChat({ history });
      const result = await chat.sendMessage(prompt);
      return result.response.text() || "";
    } catch (error) {
      this._handleError(error, "Text generation failed");
    }
  }

  _handleError(error, defaultMessage) {
    console.error("Google AI Error:", error);
    let userMessage = defaultMessage;
    let status = 500;

    if (error.message) {
      const msg = error.message.toLowerCase();
      if (msg.includes("api key") || msg.includes("invalid key")) {
        status = 401;
        userMessage = "Invalid Google API key.";
      } else if (msg.includes("quota") || msg.includes("rate limit")) {
        status = 429;
        userMessage = "Rate limit exceeded. Please try again later.";
      } else if (msg.includes("safety") || msg.includes("blocked")) {
        status = 400;
        userMessage = "Content blocked by safety filters. Try a different prompt.";
      } else {
        userMessage = error.message;
      }
    }

    const err = new Error(userMessage);
    err.status = status;
    throw err;
  }
}

export default new GoogleAIClient();
