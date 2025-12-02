import express from "express";
import rateLimit from "express-rate-limit";
import {
  generateText,
  generateImage,
  getModels,
  healthCheck,
} from "../controllers/aiPlayground.controller.js";

const router = express.Router();

/**
 * Rate limiter for AI generation endpoints
 * Prevents abuse and excessive API usage
 */
const aiGenerationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per windowMs
  message: {
    success: false,
    message: "Too many AI generation requests. Please try again in 15 minutes",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Skip rate limiting for health check and model listing
  skip: (req) => {
    return req.path === "/health" || req.path === "/models";
  },
});

/**
 * Stricter rate limiter for image generation
 * Image generation is more resource-intensive
 */
const imageGenerationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 image requests per windowMs
  message: {
    success: false,
    message:
      "Too many image generation requests. Please try again in 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply general rate limiting to all AI playground routes
router.use(aiGenerationLimiter);

/**
 * @route   GET /api/ai-playground/health
 * @desc    Health check for AI Playground
 * @access  Public
 */
router.get("/health", healthCheck);

/**
 * @route   GET /api/ai-playground/models
 * @desc    Get available AI models
 * @access  Public
 */
router.get("/models", getModels);

/**
 * @route   POST /api/ai-playground/text
 * @desc    Generate text using AI
 * @access  Public
 * @body    { prompt: string, model?: string, options?: object }
 */
router.post("/text", generateText);

/**
 * @route   POST /api/ai-playground/image
 * @desc    Generate image using AI
 * @access  Public
 * @body    { prompt: string, model?: string, options?: object }
 */
router.post("/image", imageGenerationLimiter, generateImage);

export default router;
