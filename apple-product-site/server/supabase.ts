/**
 * Supabase Auth integration for Replit → Momentum-AI session handoff.
 * Uses the same Supabase project as Momentum-AI. Service role key must only
 * be used on the backend (never in frontend).
 */

import crypto from "crypto";

const SUPABASE_URL = "https://nintqyjbyfonoiwrjkvp.supabase.co";
const AUTH_PATH = "/auth/v1";

function getServiceRoleKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  return key;
}

function getAnonKey(): string {
  const key = process.env.SUPABASE_ANON_KEY;
  if (!key) {
    throw new Error("SUPABASE_ANON_KEY is not set");
  }
  return key;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SUPABASE_ANON_KEY);
}

export interface SupabaseTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
}

/**
 * Create a Supabase user via Admin API (server-side only).
 * Use email_confirm: true so Supabase does not send a separate confirmation email.
 */
export async function createSupabaseUser(
  email: string,
  password: string
): Promise<{ id: string } | { error: string; status: number }> {
  const serviceRoleKey = getServiceRoleKey();
  const anonKey = getAnonKey();

  const res = await fetch(`${SUPABASE_URL}${AUTH_PATH}/admin/users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      apikey: anonKey,
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
      email_confirm: true,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return { error: data.msg || data.message || res.statusText, status: res.status };
  }

  return { id: data.id };
}

/**
 * Get Supabase session (access_token + refresh_token) using email/password.
 */
export async function getSupabaseSessionWithPassword(
  email: string,
  password: string
): Promise<SupabaseTokenResponse | { error: string }> {
  const anonKey = getAnonKey();

  const res = await fetch(`${SUPABASE_URL}${AUTH_PATH}/token?grant_type=password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: anonKey,
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return { error: data.error_description || data.msg || res.statusText };
  }

  if (!data.access_token || !data.refresh_token) {
    return { error: "Invalid token response" };
  }

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in,
  };
}

/**
 * Refresh Supabase session using refresh_token.
 */
export async function refreshSupabaseSession(
  refreshToken: string
): Promise<SupabaseTokenResponse | { error: string }> {
  const anonKey = getAnonKey();

  const res = await fetch(`${SUPABASE_URL}${AUTH_PATH}/token?grant_type=refresh_token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: anonKey,
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return { error: data.error_description || data.msg || res.statusText };
  }

  if (!data.access_token || !data.refresh_token) {
    return { error: "Invalid token response" };
  }

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in,
  };
}

// --- One-time code store for secure session handoff to Momentum-AI ---
const CODE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const oneTimeCodes = new Map<
  string,
  { access_token: string; refresh_token: string; expiresAt: number }
>();

function cleanupExpiredCodes(): void {
  const now = Date.now();
  for (const [code, entry] of oneTimeCodes.entries()) {
    if (entry.expiresAt < now) oneTimeCodes.delete(code);
  }
}

/**
 * Create a one-time code that can be exchanged for Supabase tokens.
 * Momentum-AI's /auth/callback should call the exchange endpoint with this code.
 */
export function createOneTimeCode(tokens: SupabaseTokenResponse): string {
  cleanupExpiredCodes();
  const code = crypto.randomBytes(24).toString("hex");
  oneTimeCodes.set(code, {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expiresAt: Date.now() + CODE_TTL_MS,
  });
  return code;
}

/**
 * Exchange a one-time code for tokens. Invalidates the code. Returns null if invalid or expired.
 */
export function exchangeOneTimeCode(
  code: string
): { access_token: string; refresh_token: string } | null {
  cleanupExpiredCodes();
  const entry = oneTimeCodes.get(code);
  if (!entry) return null;
  if (entry.expiresAt < Date.now()) {
    oneTimeCodes.delete(code);
    return null;
  }
  oneTimeCodes.delete(code);
  return {
    access_token: entry.access_token,
    refresh_token: entry.refresh_token,
  };
}
