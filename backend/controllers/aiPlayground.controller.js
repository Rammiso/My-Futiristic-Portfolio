import googleAIClient from "../utils/googleAIClient.js";

/**
 * POST /api/ai-playground/text
 * Body: { prompt: string, history?: [{role, parts:[{text}]}] }
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

    const output = await googleAIClient.generateText(prompt.trim(), history);

    res.status(200).json({
      success: true,
      data: {
        generatedText: output,
        model: "gemini-2.0-flash",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Text generation error:", error);
    res.status(error.status || 500).json({ success: false, message: error.message || "Failed to generate text" });
  }
};

/** GET /api/ai-playground/health */
export const healthCheck = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: "operational",
      model: "gemini-2.0-flash",
      configured: !!(process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    },
  });
};

// kept for route compatibility
export const generateImage = async (_req, res) => {
  res.status(400).json({ success: false, message: "Image generation is not available. Use text generation." });
};
export const getModels = async (_req, res) => {
  res.status(200).json({ success: true, data: { model: "gemini-2.0-flash", type: "text" } });
};
