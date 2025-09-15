import express from "express";
import { getDbConnection } from "../db.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Validation middleware
const validateNote = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({
      message: "Validation Error",
      error: "Title is required and must be a non-empty string",
    });
  }

  if (!content || typeof content !== "string" || content.trim().length === 0) {
    return res.status(400).json({
      message: "Validation Error",
      error: "Content is required and must be a non-empty string",
    });
  }

  // Trim whitespace
  req.body.title = title.trim();
  req.body.content = content.trim();

  next();
};

// Apply auth middleware to all routes
router.use(auth);

// GET all notes for the authenticated user
router.get("/", async (req, res, next) => {
  try {
    const db = await getDbConnection();
    const notes = await db.all(
      "SELECT * FROM notes WHERE userId = ? ORDER BY createdAt DESC",
      req.user.userId
    );
    res.json(notes);
  } catch (err) {
    next(err);
  }
});

// GET a specific note
router.get("/:id", async (req, res, next) => {
  try {
    const db = await getDbConnection();
    const note = await db.get(
      "SELECT * FROM notes WHERE id = ? AND userId = ?",
      req.params.id,
      req.user.userId
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (err) {
    next(err);
  }
});

// CREATE a new note
router.post("/", validateNote, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const now = new Date().toISOString();

    const db = await getDbConnection();

    const result = await db.run(
      "INSERT INTO notes (title, content, createdAt, updatedAt, userId) VALUES (?, ?, ?, ?, ?)",
      title,
      content,
      now,
      now,
      req.user.userId
    );

    const newNote = await db.get(
      "SELECT * FROM notes WHERE id = ?",
      result.lastID
    );

    res.status(201).json(newNote);
  } catch (err) {
    next(err);
  }
});

// UPDATE a note
router.put("/:id", validateNote, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    const now = new Date().toISOString();

    const db = await getDbConnection();

    // Check if note exists and belongs to user
    const existingNote = await db.get(
      "SELECT * FROM notes WHERE id = ? AND userId = ?",
      id,
      req.user.userId
    );

    if (!existingNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    await db.run(
      "UPDATE notes SET title = ?, content = ?, updatedAt = ? WHERE id = ? AND userId = ?",
      title,
      content,
      now,
      id,
      req.user.userId
    );

    const updatedNote = await db.get("SELECT * FROM notes WHERE id = ?", id);

    res.json(updatedNote);
  } catch (err) {
    next(err);
  }
});

// DELETE a note
router.delete("/:id", async (req, res, next) => {
  try {
    const db = await getDbConnection();

    // Check if note exists and belongs to user
    const note = await db.get(
      "SELECT * FROM notes WHERE id = ? AND userId = ?",
      req.params.id,
      req.user.userId
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await db.run(
      "DELETE FROM notes WHERE id = ? AND userId = ?",
      req.params.id,
      req.user.userId
    );

    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
