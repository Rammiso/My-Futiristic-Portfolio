import mongoose from "mongoose";
import User from "../models/User.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../config/jwtHelper.js";

// @desc    Admin registration (ONE-TIME USE ONLY)
// @route   POST /api/admin/register
// @access  Public (but should be disabled after first use)
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password",
      });
    }

    // Check if ALLOW_REGISTRATION is disabled
    if (process.env.ALLOW_REGISTRATION === "false") {
      return res.status(403).json({
        success: false,
        message: "Admin registration is disabled",
      });
    }

    // Check if admin already exists (only ONE admin allowed)
    const existingAdmin = await User.findOne({});
    console.log("🔍 Checking for existing admin...");
    console.log("📊 Database:", mongoose.connection.name);
    console.log("👤 Existing admin found:", existingAdmin ? "YES" : "NO");
    if (existingAdmin) {
      console.log("📧 Existing admin email:", existingAdmin.email);
    }

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists. Registration is not allowed.",
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Create admin user (password will be hashed automatically by pre-save hook)
    const user = await User.create({
      name,
      email,
      password,
      role: "admin",
    });

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token to database
    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({
      success: true,
      message:
        "Admin registered successfully! IMPORTANT: Disable registration route now.",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }
    next(error);
  }
};

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public (with rate limiting)
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Check for user (include password field)
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token to database
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Refresh access token
// @route   POST /api/admin/refresh
// @access  Public (requires valid refresh token)
export const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }

    // Find user and verify refresh token matches the one in database
    const user = await User.findById(decoded.id).select("+refreshToken");

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(user._id);

    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout admin
// @route   POST /api/admin/logout
// @access  Private
export const logout = async (req, res, next) => {
  try {
    // Clear refresh token from database
    const user = await User.findById(req.user.id);

    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/admin/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export default { register, login, refreshAccessToken, logout, getMe };
