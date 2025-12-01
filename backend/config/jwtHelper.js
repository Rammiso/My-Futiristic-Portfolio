import jwt from "jsonwebtoken";

/**
 * Generate JWT Access Token
 * @param {string} userId - User ID to encode in token
 * @returns {string} - JWT access token valid for 30 minutes
 */
export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRE || "30m",
  });
};

/**
 * Generate JWT Refresh Token
 * @param {string} userId - User ID to encode in token
 * @returns {string} - JWT refresh token valid for 7 days
 */
export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || "7d",
  });
};

/**
 * Verify JWT Token
 * @param {string} token - Token to verify
 * @param {string} secret - Secret key to verify against
 * @returns {Object} - Decoded token payload
 * @throws {Error} - If token is invalid or expired
 */
export const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

/**
 * Decode JWT Token without verification
 * Useful for getting token payload without validating
 * @param {string} token - Token to decode
 * @returns {Object} - Decoded token payload
 */
export const decodeToken = (token) => {
  return jwt.decode(token);
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  decodeToken,
};
