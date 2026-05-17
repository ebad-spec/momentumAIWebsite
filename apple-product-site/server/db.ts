import { Pool } from "pg";

// This pool is used only for the express-session store (connect-pg-simple).
// All user/profile data lives in Supabase; see storage.ts.
// NOTE: We use SESSION_DATABASE_URL instead of DATABASE_URL because Replit
// runtime-manages DATABASE_URL to its internal "helium" host, which is
// unreachable from the production deployment environment.
export const pool = new Pool({
  connectionString: process.env.SESSION_DATABASE_URL || process.env.DATABASE_URL,
});
