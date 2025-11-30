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

// Public route (rate limited to prevent spam)
router.post("/", contactLimiter, submitContact);

// Admin routes (protected)
router.get("/", protect, getContacts);
router.patch("/:id", protect, markAsRead);
router.delete("/:id", protect, deleteContact);

export default router;
