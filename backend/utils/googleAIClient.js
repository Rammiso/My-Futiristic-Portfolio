// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";

// dotenv.config();

// const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

// class GoogleAIClient {
//   constructor() {
//     if (!GOOGLE_API_KEY) {
//       throw new Error("GOOGLE_API_KEY is not defined in environment variables");
//     }
//     // Force v1 API — newer keys don't support v1beta for some models
//     this.genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
//     this.modelName = "gemini-1.5-flash-latest";
//   }

//   getModel() {
//     return this.genAI.getGenerativeModel(
//       { model: this.modelName },
//       { apiVersion: "v1" }
//     );
//   }

//   /**
//    * Generate text using Gemini
//    * @param {string} prompt
//    * @param {Array}  history  [{role:"user"|"model", parts:[{text}]}]
//    * @returns {Promise<string>}
//    */
//   async generateText(prompt, history = []) {
//     try {
//       const model = this.getModel();
//       const chat = model.startChat({ history });
//       const result = await chat.sendMessage(prompt);
//       return result.response.text() || "";
//     } catch (error) {
//       this._handleError(error, "Text generation failed");
//     }
//   }

//   _handleError(error, defaultMessage) {
//     console.error("Google AI Error:", error);
//     let userMessage = defaultMessage;
//     let status = 500;

//     if (error.message) {
//       const msg = error.message.toLowerCase();
//       if (msg.includes("api key") || msg.includes("invalid key")) {
//         status = 401;
//         userMessage = "Invalid Google API key.";
//       } else if (msg.includes("quota") || msg.includes("rate limit") || msg.includes("429")) {
//         status = 429;
//         userMessage = "Rate limit exceeded. Please wait a moment and try again.";
//       } else if (msg.includes("safety") || msg.includes("blocked")) {
//         status = 400;
//         userMessage = "Content blocked by safety filters. Try a different prompt.";
//       } else if (msg.includes("not found") || msg.includes("404")) {
//         status = 503;
//         userMessage = "AI model unavailable. Please try again shortly.";
//       } else {
//         userMessage = error.message;
//       }
//     }

//     const err = new Error(userMessage);
//     err.status = status;
//     throw err;
//   }
// }

// export default new GoogleAIClient();


import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

class GoogleAIClient {
  constructor() {
    if (!GOOGLE_API_KEY) {
      throw new Error("GOOGLE_API_KEY is not defined in environment variables");
    }
    
    // Initialize the SDK - Let the SDK handle the base configuration
    this.genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
    
    /** * Use "gemini-1.5-flash" instead of "-latest". 
     * The stable alias is more reliable across different API versions.
     */
    this.modelName = "gemini-1.5-flash"; 
  }

  /**
   * Helper to get the model.
   * Removed the hard-coded { apiVersion: "v1" } as it causes 404s 
   * when mismatched with newer model aliases.
   */
 getModel() {
  return this.genAI.getGenerativeModel(
    { model: this.modelName },
    { apiVersion: "v1beta" } // Sometimes v1beta is more 'lenient' with regional blocks
  );
}

  /**
   * Generate text using Gemini
   * @param {string} prompt
   * @param {Array}  history  [{role:"user"|"model", parts:[{text:"..."}]}]
   * @returns {Promise<string>}
   */
  async generateText(prompt, history = []) {
    try {
      const model = this.getModel();
      
      // Safety: Ensure history is formatted correctly for the SDK
      const chat = model.startChat({ 
        history: history,
        generationConfig: {
          maxOutputTokens: 2048, // Good default for a "Playground"
        }
      });

      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      // Re-throw the error to be handled by the specialized error handler
      this._handleError(error, "Text generation failed");
    }
  }

  _handleError(error, defaultMessage) {
    // Log the full error for server-side debugging
    console.error(">>> Google AI API Error:", error);

    let userMessage = defaultMessage;
    let status = 500;

    // The SDK error response usually contains a status or message
    const errorMessage = error.message || "";
    const errorCode = error.status || 0;

    if (errorCode === 401 || errorMessage.includes("API_KEY_INVALID")) {
      status = 401;
      userMessage = "Invalid Google API key. Please check your .env file.";
    } else if (errorCode === 429 || errorMessage.includes("429")) {
      status = 429;
      userMessage = "Rate limit exceeded (Free Tier). Please wait 60 seconds.";
    } else if (errorMessage.includes("safety") || errorCode === 400) {
      status = 400;
      userMessage = "Content flagged by safety filters. Please try a different prompt.";
    } else if (errorCode === 404) {
      status = 404;
      userMessage = `Model "${this.modelName}" not found. Verify your API version or region.`;
    } else if (errorCode === 503) {
      status = 503;
      userMessage = "Google AI service is temporarily overloaded. Try again in a moment.";
    } else {
      userMessage = errorMessage || defaultMessage;
    }

    const err = new Error(userMessage);
    err.status = status;
    throw err;
  }
}

export default new GoogleAIClient();