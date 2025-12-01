import rateLimit from "express-rate-limit";

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// VERY STRICT limiter for admin registration (ONE-TIME USE)
export const registrationLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 2, // Only 2 registration attempts per IP per day
  message: {
    success: false,
    message: "Too many registration attempts. Please try again tomorrow.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limiter for contact form to prevent spam
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 contact form submissions per hour
  message: {
    success: false,
    message: "Too many contact form submissions. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limiter for login attempts
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per 15 minutes
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// AI demo limiter (to prevent API abuse)
export const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 AI requests per hour
  message: {
    success: false,
    message: "AI demo usage limit reached. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default apiLimiter;
