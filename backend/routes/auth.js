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

// ⚠️ REGISTRATION DISABLED FOR SECURITY
// Registration route is permanently disabled after admin account creation
// router.post("/register", register);

// Public routes
router.post("/login", loginLimiter, login);
router.post("/refresh", refreshAccessToken);

// Protected routes (require authentication)
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

export default router;
