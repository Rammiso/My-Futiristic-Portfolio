import express from "express";
import {
  register,
  login,
  refreshAccessToken,
  logout,
  getMe,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import {
  loginLimiter,
  registrationLimiter,
} from "../middleware/rateLimiter.js";

const router = express.Router();

// ⚠️ IMPORTANT: Comment out or remove this route after creating your admin account
// This prevents unauthorized users from creating admin accounts
// Temporarily without rate limiter for initial setup - add it back after first registration
router.post("/register", register);

// Public routes
router.post("/login", loginLimiter, login);
router.post("/refresh", refreshAccessToken);

// Protected routes (require authentication)
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

export default router;
