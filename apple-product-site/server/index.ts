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
        created_at TIMESTAMP DEFAULT NOW(),
        subscription_plan VARCHAR(50),
        subscription_status VARCHAR(50),
        stripe_customer_id VARCHAR(255),
        stripe_subscription_id VARCHAR(255)
      )
    `);
    
    await pool.query(`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='subscription_plan') THEN
          ALTER TABLE users ADD COLUMN subscription_plan VARCHAR(50);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='subscription_status') THEN
          ALTER TABLE users ADD COLUMN subscription_status VARCHAR(50);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='stripe_customer_id') THEN
          ALTER TABLE users ADD COLUMN stripe_customer_id VARCHAR(255);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='stripe_subscription_id') THEN
          ALTER TABLE users ADD COLUMN stripe_subscription_id VARCHAR(255);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='trial_end_date') THEN
          ALTER TABLE users ADD COLUMN trial_end_date TIMESTAMP;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='subscription_end_date') THEN
          ALTER TABLE users ADD COLUMN subscription_end_date TIMESTAMP;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='supabase_refresh_token') THEN
          ALTER TABLE users ADD COLUMN supabase_refresh_token TEXT;
        END IF;
      END $$;
    `);
    
    console.log("Database initialized");
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}

setupAuth(app);
setupStripe(app);

// Serve the built slide deck at /deck.
// IMPORTANT: In production deployments (e.g. Replit), the deck must be built during the build step.
// We serve from ../public/deck because `npm run build:deck` copies the Next.js export into that folder.
const deckPublicPath = path.join(__dirname, "../public/deck");

// Serve the deck index for /deck route (with or without trailing slash)
app.get('/deck', (req, res) => {
  res.sendFile(path.join(deckPublicPath, "index.html"));
});
app.get('/deck/', (req, res) => {
  res.sendFile(path.join(deckPublicPath, "index.html"));
});

// Serve static files from the deck public directory
app.use('/deck', express.static(deckPublicPath));

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
