import express from "express";
import { login, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { loginLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Public routes
router.post("/login", loginLimiter, login);

// Protected routes
router.get("/me", protect, getMe);

export default router;
