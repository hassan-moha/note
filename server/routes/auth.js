import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db.js";
import { DatabaseError } from "../db.js";
import { validateEmail, validatePassword } from "../utils/validation.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Cookie options
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
};

// Validation middleware
const validateUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({
      message: "Validation Error",
      error: "Valid email is required",
    });
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    return res.status(400).json({
      message: "Validation Error",
      error: "Password must be at least 6 characters long",
    });
  }

  next();
};

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await getDbConnection();

    
    // Check if user already exists
    const existingUser = await db.get("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const result = await db.run(
      "INSERT INTO users (email, password, createdAt) VALUES (?, ?, ?)",
      [email, hashedPassword, new Date().toISOString()]
    );

    // Create token
    const token = jwt.sign({ userId: result.lastID }, JWT_SECRET, {
      expiresIn: "24h",
    });

    // Set cookie
    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      message: "User registered successfully",
      user: { id: result.lastID, email },
    });
  } catch (error) {
    console.error("Registration error:", error);
    if (error instanceof DatabaseError) {
      res.status(500).json({ message: "Database error occurred" });
    } else {
      res.status(500).json({ message: "Server error occurred" });
    }
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await getDbConnection();

    // Validate input
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Get user
    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    // Set cookie
    res.cookie("token", token, cookieOptions);

    res.json({
      message: "Login successful",
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof DatabaseError) {
      res.status(500).json({ message: "Database error occurred" });
    } else {
      res.status(500).json({ message: "Server error occurred" });
    }
  }
});

// Check authentication status
router.get("/check", async (req, res) => {
  try {
    const token = req.cookies.token;
    const db = await getDbConnection();

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await db.get("SELECT id, email FROM users WHERE id = ?", [
      decoded.userId,
    ]);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Auth check error:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Server error occurred" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.json({ message: "Logged out successfully" });
});

export default router;
