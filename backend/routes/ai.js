import express from "express";
import { aiDemo, getAIStats } from "../controllers/aiController.js";
import { protect } from "../middleware/auth.js";
import { aiLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Public route (rate limited to prevent API abuse)
router.post("/demo", aiLimiter, aiDemo);

// Admin route for statistics
router.get("/stats", protect, getAIStats);

export default router;
