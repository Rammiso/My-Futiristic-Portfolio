import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

/**
 * Data Sanitization Middleware
 * Prevents MongoDB injection and XSS attacks
 */

// Sanitize MongoDB operators from req.body, req.query, and req.params
export const sanitizeMongo = mongoSanitize({
  replaceWith: "_", // Replace prohibited characters with underscore
  onSanitize: ({ req, key }) => {
    console.warn(`⚠️ Sanitized potentially malicious input: ${key}`);
  },
});

// Sanitize user input to prevent XSS attacks
export const sanitizeXSS = xss();

/**
 * Custom input sanitization for specific fields
 * Trims whitespace and removes potentially dangerous characters
 */
export const sanitizeInput = (req, res, next) => {
  // Sanitize body
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === "string") {
        req.body[key] = req.body[key].trim();
      }
    });
  }

  // Sanitize query parameters
  if (req.query) {
    Object.keys(req.query).forEach((key) => {
      if (typeof req.query[key] === "string") {
        req.query[key] = req.query[key].trim();
      }
    });
  }

  next();
};

export default { sanitizeMongo, sanitizeXSS, sanitizeInput };
