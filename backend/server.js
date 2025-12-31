import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import {
  sanitizeMongo,
  sanitizeXSS,
  sanitizeInput,
} from "./middleware/sanitize.js";

// Import routes
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
// import blogRoutes from "./routes/blog.js";
import contactRoutes from "./routes/contact.js";
// import aiRoutes from "./routes/ai.js";
// import aiPlaygroundRoutes from "./routes/aiPlayground.routes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Trust proxy - Important for rate limiting and getting real IP behind proxies (Heroku, Render, etc.)
app.set("trust proxy", 1);

// Security Middleware
app.use(helmet()); // Adds various HTTP headers for security

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.CLIENT_URL
      ? process.env.CLIENT_URL.split(",").map((url) => url.trim())
      : ["http://localhost:5173"];

    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Detailed logging in development
} else {
  app.use(morgan("combined")); // Standard Apache combined log in production
}

// Body Parser Middleware
app.use(express.json({ limit: "10mb" })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Parse URL-encoded bodies

// Data Sanitization Middleware
app.use(sanitizeMongo); // Prevent MongoDB injection attacks
app.use(sanitizeXSS); // Prevent XSS attacks
app.use(sanitizeInput); // Custom input trimming and validation

// API Routes
app.use("/api/admin", authRoutes);
app.use("/api/projects", projectRoutes);
// app.use("/api/posts", blogRoutes);
app.use("/api/contact", contactRoutes);
// app.use("/api/ai", aiRoutes);
// app.use("/api/ai-playground", aiPlaygroundRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Musab Portfolio API - Futuristic Backend",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      admin: "/api/admin",
      projects: "/api/projects",
      contact: "/api/contact",
      ai: "/api/ai",
      aiPlayground: "/api/ai-playground",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `🚀 Server running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});

export default app;
