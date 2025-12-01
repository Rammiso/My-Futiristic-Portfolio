import express from "express";
import {
  submitContact,
  getContacts,
  markAsRead,
  deleteContact,
} from "../controllers/contactController.js";
import { protect } from "../middleware/auth.js";
import { contactLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Public route - Contact form submission (with rate limiting)
router.post("/", contactLimiter, submitContact);

// Admin-only routes (require authentication)
router.get("/", protect, getContacts);
router.patch("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteContact);

export default router;
