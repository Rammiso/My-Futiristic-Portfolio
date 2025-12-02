import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

/**
 * Google AI (Gemini) Client
 * Simple and free AI generation using Google's Gemini models
 */
class GoogleAIClient {
  constructor() {
    if (!GOOGLE_API_KEY) {
      throw new Error(
        "GOOGLE_API_KEY or GEMINI_API_KEY is not defined in environment variables"
      );
    }

    // Initialize Google AI
    this.genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
  }

  /**
   * Generate text using Gemini
   * @param {string} prompt - The text prompt
   * @returns {Promise<string>} Generated text
   */
  async generateText(prompt) {
    try {
      // Use Gemini 1.5 Flash 002 (v1 model)
      const model = this.genAI.getGenerativeModel({
        model: "gemini-1.5-flash-002",
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return text || "";
    } catch (error) {
      this._handleError(error, "Text generation failed");
    }
  }

  /**
   * Generate image using Gemini
   * Note: Gemini doesn't support image generation in free tier
   * This will return a helpful message instead
   * @param {string} prompt - The image description
   * @returns {Promise<string>} Image URL or message
   */
  async generateImage(prompt) {
    try {
      // Gemini free tier doesn't support image generation
      // Return a placeholder or use text-based description
      const model = this.genAI.getGenerativeModel({
        model: "gemini-1.5-flash-002",
      });

      const enhancedPrompt = `Create a detailed visual description for this image concept: "${prompt}". Describe it as if you were explaining it to an artist.`;

      const result = await model.generateContent(enhancedPrompt);
      const response = await result.response;
      const description = response.text();

      // Return a message explaining image generation limitation
      return {
        type: "description",
        content: description,
        message:
          "Image generation is not available in Gemini free tier. Here's a detailed description instead:",
      };
    } catch (error) {
      this._handleError(error, "Image description generation failed");
    }
  }

  /**
   * Handle API errors
   * @private
   */
  _handleError(error, defaultMessage) {
    console.error("Google AI Error:", error);

    let userMessage = defaultMessage;
    let status = 500;

    if (error.message) {
      const msg = error.message.toLowerCase();

      if (msg.includes("api key") || msg.includes("invalid key")) {
        status = 401;
        userMessage =
          "Invalid Google API key. Please check your configuration.";
      } else if (msg.includes("quota") || msg.includes("rate limit")) {
        status = 429;
        userMessage = "Rate limit exceeded. Please try again later.";
      } else if (msg.includes("safety") || msg.includes("blocked")) {
        status = 400;
        userMessage =
          "Content was blocked by safety filters. Please try a different prompt.";
      } else {
        userMessage = error.message;
      }
    }

    const err = new Error(userMessage);
    err.status = status;
    throw err;
  }
}

// Export singleton instance
export default new GoogleAIClient();
