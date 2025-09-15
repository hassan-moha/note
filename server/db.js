import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database file path
const DB_PATH = join(__dirname, "notes.db");

// Custom error class for database errors
export class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = "DatabaseError";
  }
}

// Create and initialize database
export async function createDatabase() {
  try {
    // Check if database file exists
    const dbExists = fs.existsSync(DB_PATH);

    // Open database connection
    const db = await open({
      filename: DB_PATH,
      driver: sqlite3.Database,
    });

    // Enable foreign keys
    await db.exec("PRAGMA foreign_keys = ON");

    // Create tables if they don't exist
    if (!dbExists) {
      await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          createdAt TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          createdAt TEXT NOT NULL,
          updatedAt TEXT NOT NULL,
          userId INTEGER NOT NULL,
          FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
        );

        CREATE INDEX IF NOT EXISTS idx_notes_userId ON notes(userId);
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      `);
    }

    return db;
  } catch (error) {
    console.error("Database initialization error:", error);
    throw new DatabaseError("Failed to initialize database");
  }
}

// Get database connection
let dbInstance = null;

export async function getDbConnection() {
  if (!dbInstance) {
    dbInstance = await createDatabase();
  }
  return dbInstance;
}

// Close database connection
export async function closeDatabase() {
  if (dbInstance) {
    try {
      await dbInstance.close();
      dbInstance = null;
    } catch (error) {
      throw new DatabaseError(`Failed to close database: ${error.message}`);
    }
  }
}
