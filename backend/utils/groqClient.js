import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const MODEL = "llama-3.3-70b-versatile"; // best free-tier model on Groq

class GroqClient {
  constructor() {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not defined in environment variables");
    }
    this.client = new Groq({ apiKey: process.env.GROQ_API_KEY });
    this.model = MODEL;
  }

  /**
   * Generate text using Groq (chat completions)
   * @param {string} prompt  - latest user message
   * @param {Array}  history - [{role:"user"|"assistant", content:string}]
   * @returns {Promise<string>}
   */
  async generateText(prompt, history = []) {
    try {
      const messages = [
        {
          role: "system",
          content:
            "You are a helpful, knowledgeable AI assistant. Be concise, clear, and accurate. Format code with markdown code blocks.",
        },
        ...history,
        { role: "user", content: prompt },
      ];

      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages,
        max_tokens: 2048,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || "";
    } catch (error) {
      this._handleError(error);
    }
  }

  _handleError(error) {
    console.error("Groq AI Error:", error);
    let userMessage = "AI generation failed. Please try again.";
    let status = 500;

    const msg = (error.message || "").toLowerCase();
    const code = error.status || error.statusCode;

    if (code === 401 || msg.includes("api key") || msg.includes("unauthorized")) {
      status = 401;
      userMessage = "Invalid Groq API key.";
    } else if (code === 429 || msg.includes("rate limit") || msg.includes("quota")) {
      status = 429;
      userMessage = "Rate limit reached. Please wait a moment and try again.";
    } else if (code === 400 || msg.includes("safety") || msg.includes("blocked")) {
      status = 400;
      userMessage = "Content blocked by safety filters. Try a different prompt.";
    } else if (msg) {
      userMessage = error.message;
    }

    const err = new Error(userMessage);
    err.status = status;
    throw err;
  }
}

export default new GroqClient();
