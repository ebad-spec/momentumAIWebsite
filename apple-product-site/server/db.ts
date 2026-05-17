import { Pool } from "pg";

// This pool is used only for the express-session store (connect-pg-simple).
// All user/profile data lives in Supabase; see storage.ts.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
