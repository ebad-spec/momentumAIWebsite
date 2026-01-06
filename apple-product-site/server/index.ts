import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { setupAuth } from "./auth";
import { setupStripe } from "./stripe";
import { pool } from "./db";
import { users } from "./schema";
import { sql } from "drizzle-orm";

const app = express();
const PORT = parseInt(process.env.PORT || "5000", 10);

app.use(cors({
  origin: true,
  credentials: true,
}));

// Stripe webhook needs raw body
app.post('/api/stripe-webhook', express.raw({ type: 'application/json' }), (req, res, next) => next());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        email_verified BOOLEAN DEFAULT FALSE,
        verification_token VARCHAR(255),
        reset_token VARCHAR(255),
        reset_token_expiry TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("Database initialized");
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}

setupAuth(app);
setupStripe(app);

app.use(express.static(path.join(__dirname, "../build")));

app.get(/^(?!\/api).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

async function startServer() {
  await initializeDatabase();
  
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
