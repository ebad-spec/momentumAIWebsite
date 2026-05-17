/**
 * Supabase Auth + REST API integration.
 * Handles user auth operations and profile CRUD against the momentum-ai Supabase project.
 * Service role key must only ever be used on the backend.
 */

import crypto from "crypto";

export const SUPABASE_URL = "https://cijfjnravhbtjeviubra.supabase.co";
const AUTH_PATH = "/auth/v1";
const REST_PATH = "/rest/v1";

export function getServiceRoleKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  return key;
}

export function getAnonKey(): string {
  const key = process.env.SUPABASE_ANON_KEY;
  if (!key) throw new Error("SUPABASE_ANON_KEY is not set");
  return key;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SUPABASE_ANON_KEY);
}

function adminHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getServiceRoleKey()}`,
    apikey: getServiceRoleKey(), // admin endpoints require service role key in both headers
  };
}

export function restHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getServiceRoleKey()}`,
    apikey: getAnonKey(),
    Prefer: "return=representation",
  };
}

export interface SupabaseTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
}

// ---------------------------------------------------------------------------
// Auth Admin API
// ---------------------------------------------------------------------------

/**
 * Create a Supabase auth user. Passes full_name in user_metadata so the
 * handle_new_user trigger populates profiles.full_name automatically.
 */
export async function createSupabaseUser(
  email: string,
  password: string,
  name?: string
): Promise<{ id: string } | { error: string; status: number }> {
  const res = await fetch(`${SUPABASE_URL}${AUTH_PATH}/admin/users`, {
    method: "POST",
    headers: adminHeaders(),
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
      email_confirm: true,
      user_metadata: name ? { full_name: name } : undefined,
    }),
  });

  const data = (await res.json().catch(() => ({}))) as any;
  if (!res.ok) {
    return { error: data.msg || data.message || res.statusText, status: res.status };
  }
  return { id: data.id };
}

/**
 * Get a Supabase auth user by UUID.
 */
export async function getSupabaseAuthUser(
  id: string
): Promise<{ id: string; email: string; email_confirmed_at: string | null } | null> {
  const res = await fetch(`${SUPABASE_URL}${AUTH_PATH}/admin/users/${id}`, {
    headers: adminHeaders(),
  });
  if (!res.ok) return null;
  return (res.json().catch(() => null)) as any;
}

/**
 * Update a Supabase auth user's password via Admin API.
 */
export async function updateSupabaseUserPassword(
  id: string,
  password: string
): Promise<boolean> {
  const res = await fetch(`${SUPABASE_URL}${AUTH_PATH}/admin/users/${id}`, {
    method: "PUT",
    headers: adminHeaders(),
    body: JSON.stringify({ password }),
  });
  return res.ok;
}

/**
 * Verify credentials and get a Supabase session (access + refresh tokens).
 */
export async function getSupabaseSessionWithPassword(
  email: string,
  password: string
): Promise<SupabaseTokenResponse | { error: string }> {
  const res = await fetch(
    `${SUPABASE_URL}${AUTH_PATH}/token?grant_type=password`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: getAnonKey() },
      body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
    }
  );

  const data = (await res.json().catch(() => ({}))) as any;
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
 * Refresh a Supabase session using a refresh token.
 */
export async function refreshSupabaseSession(
  refreshToken: string
): Promise<SupabaseTokenResponse | { error: string }> {
  const res = await fetch(
    `${SUPABASE_URL}${AUTH_PATH}/token?grant_type=refresh_token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: getAnonKey() },
      body: JSON.stringify({ refresh_token: refreshToken }),
    }
  );

  const data = (await res.json().catch(() => ({}))) as any;
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

// ---------------------------------------------------------------------------
// One-time code store for secure session handoff to Momentum-AI
// ---------------------------------------------------------------------------

const CODE_TTL_MS = 5 * 60 * 1000;

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

export function exchangeOneTimeCode(
  code: string
): { access_token: string; refresh_token: string } | null {
  cleanupExpiredCodes();
  const entry = oneTimeCodes.get(code);
  if (!entry || entry.expiresAt < Date.now()) {
    oneTimeCodes.delete(code);
    return null;
  }
  oneTimeCodes.delete(code);
  return { access_token: entry.access_token, refresh_token: entry.refresh_token };
}
