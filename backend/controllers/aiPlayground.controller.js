import groqClient from "../utils/groqClient.js";

const MODEL = "llama-3.3-70b-versatile";

/**
 * POST /api/ai-playground/text
 * Body: { prompt: string, history?: [{role:"user"|"assistant", content:string}] }
 */
export const generateText = async (req, res) => {
  try {
    const { prompt, history = [] } = req.body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({ success: false, message: "Please provide a valid prompt" });
    }
    if (prompt.length > 4000) {
      return res.status(400).json({ success: false, message: "Prompt too long. Max 4000 characters." });
    }

    const output = await groqClient.generateText(prompt.trim(), history);

    res.status(200).json({
      success: true,
      data: {
        generatedText: output,
        model: MODEL,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Text generation error:", error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to generate text",
    });
  }
};

/** GET /api/ai-playground/health */
export const healthCheck = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: "operational",
      provider: "Groq",
      model: MODEL,
      configured: !!process.env.GROQ_API_KEY,
      timestamp: new Date().toISOString(),
    },
  });
};

export const generateImage = async (_req, res) => {
  res.status(400).json({ success: false, message: "Image generation is not available." });
};

export const getModels = async (_req, res) => {
  res.status(200).json({ success: true, data: { model: MODEL, provider: "Groq", type: "text" } });
};

export const listModels = async (_req, res) => {
  res.status(200).json({ success: true, data: { model: MODEL, provider: "Groq" } });
};
