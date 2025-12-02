import googleAIClient from "../utils/googleAIClient.js";

/**
 * AI Playground Controller - Google Gemini Integration
 */

/**
 * Generate text using Google Gemini
 * POST /api/ai-playground/text
 */
export const generateText = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate input
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid text prompt",
      });
    }

    if (prompt.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Prompt is too long. Maximum 2000 characters allowed",
      });
    }

    // Generate text with Google Gemini
    const output = await googleAIClient.generateText(prompt.trim());

    res.status(200).json({
      success: true,
      output: output,
      data: {
        prompt: prompt.trim(),
        generatedText: output,
        provider: "Google Gemini",
        model: "gemini-1.5-flash-002",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Text generation error:", error);

    const status = error.status || 500;
    res.status(status).json({
      success: false,
      message: error.message || "Failed to generate text",
    });
  }
};

/**
 * Generate image description using Google Gemini
 * POST /api/ai-playground/image
 * Note: Returns detailed description instead of actual image (free tier limitation)
 */
export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate input
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid image description",
      });
    }

    if (prompt.length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Prompt is too long. Maximum 1000 characters allowed",
      });
    }

    // Generate image description with Google Gemini
    const result = await googleAIClient.generateImage(prompt.trim());

    res.status(200).json({
      success: true,
      output: result.content,
      data: {
        prompt: prompt.trim(),
        description: result.content,
        message: result.message,
        provider: "Google Gemini",
        model: "gemini-1.5-flash-002",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Image description error:", error);

    const status = error.status || 500;
    res.status(status).json({
      success: false,
      message: error.message || "Failed to generate image description",
    });
  }
};

/**
 * Get available models
 * GET /api/ai-playground/models
 */
export const getModels = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      text: {
        name: "Google Gemini 1.5 Flash",
        description: "Fast and intelligent text generation (Free tier)",
      },
      image: {
        name: "Gemini Image Description",
        description:
          "Detailed visual descriptions (Image generation not available in free tier)",
      },
    },
  });
};

/**
 * Health check
 * GET /api/ai-playground/health
 */
export const healthCheck = async (req, res) => {
  const hasApiKey = !!(
    process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY
  );

  res.status(200).json({
    success: true,
    data: {
      status: "operational",
      provider: "Google Gemini",
      model: "gemini-1.5-flash-002",
      configured: hasApiKey,
      timestamp: new Date().toISOString(),
    },
  });
};
