/**
 * User storage layer backed entirely by Supabase.
 * - auth.users  → identity + password (managed by Supabase Auth)
 * - public.profiles → profile + subscription data (queried via PostgREST)
 *
 * Sessions are still stored in the Replit Postgres pool via connect-pg-simple.
 */

import { pool } from "./db";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { User } from "./schema";
import {
  SUPABASE_URL,
  restHeaders,
  createSupabaseUser,
} from "./supabase";

const PostgresSessionStore = connectPg(session as any);

export const sessionStore: session.Store =
  process.env.NODE_ENV === "development"
    ? new session.MemoryStore()
    : new PostgresSessionStore({
        pool,
        createTableIfMissing: true,
      });

const PROFILES_URL = `${SUPABASE_URL}/rest/v1/profiles`;

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function rowToUser(row: Record<string, any>): User {
  return {
    id: row.user_id,
    email: row.email ?? "",
    name: row.full_name ?? "",
    emailVerified: true, // all users in our system complete email verification before being created
    resetToken: row.reset_token ?? null,
    resetTokenExpiry: row.reset_token_expiry ? new Date(row.reset_token_expiry) : null,
    createdAt: row.created_at ? new Date(row.created_at) : null,
    subscriptionPlan: row.subscription_plan ?? null,
    subscriptionStatus: row.subscription_status ?? null,
    stripeCustomerId: row.stripe_customer_id ?? null,
    stripeSubscriptionId: row.stripe_subscription_id ?? null,
    trialEndDate: row.trial_end_date ? new Date(row.trial_end_date) : null,
    subscriptionEndDate: row.subscription_end_date ? new Date(row.subscription_end_date) : null,
    supabaseRefreshToken: row.supabase_refresh_token ?? null,
  };
}

async function fetchProfile(filter: string): Promise<User | undefined> {
  const res = await fetch(`${PROFILES_URL}?${filter}&select=*&limit=1`, {
    headers: restHeaders(),
  });
  if (!res.ok) return undefined;
  const rows = (await res.json().catch(() => [])) as any[];
  if (!rows.length) return undefined;
  return rowToUser(rows[0]);
}

async function patchProfile(
  userId: string,
  data: Record<string, any>
): Promise<User | undefined> {
  const res = await fetch(`${PROFILES_URL}?user_id=eq.${userId}`, {
    method: "PATCH",
    headers: restHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) return undefined;
  const rows = (await res.json().catch(() => [])) as any[];
  if (!rows.length) return undefined;
  return rowToUser(rows[0]);
}

// ---------------------------------------------------------------------------
// Public API (mirrors the old Drizzle-based storage.ts interface)
// ---------------------------------------------------------------------------

export async function getUserById(id: string): Promise<User | undefined> {
  return fetchProfile(`user_id=eq.${encodeURIComponent(id)}`);
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  return fetchProfile(`email=eq.${encodeURIComponent(email.toLowerCase())}`);
}

export async function createUser(userData: {
  email: string;
  password: string;
  name: string;
  emailVerified?: boolean;
  verificationToken?: string | null;
}): Promise<User> {
  // 1. Create in Supabase Auth (trigger auto-creates a profiles row)
  const result = await createSupabaseUser(userData.email, userData.password, userData.name);
  if ("error" in result) {
    throw new Error(`Failed to create Supabase user: ${result.error}`);
  }

  const userId = result.id;

  // 2. Patch the profile to ensure full_name is set (trigger may race)
  const updated = await patchProfile(userId, {
    full_name: userData.name,
    email: userData.email.toLowerCase(),
  });

  if (updated) return updated;

  // Fallback: return a minimal User object if patch response was empty
  return {
    id: userId,
    email: userData.email.toLowerCase(),
    name: userData.name,
    emailVerified: true,
    resetToken: null,
    resetTokenExpiry: null,
    createdAt: new Date(),
    subscriptionPlan: null,
    subscriptionStatus: null,
    stripeCustomerId: null,
    stripeSubscriptionId: null,
    trialEndDate: null,
    subscriptionEndDate: null,
    supabaseRefreshToken: null,
  };
}

export async function updateUser(
  id: string,
  userData: Partial<{
    name: string;
    emailVerified: boolean;
    verificationToken: string | null;
    resetToken: string | null;
    resetTokenExpiry: Date | null;
    supabaseRefreshToken: string | null;
  }>
): Promise<User | undefined> {
  const patch: Record<string, any> = {};
  if (userData.name !== undefined) patch.full_name = userData.name;
  if (userData.resetToken !== undefined) patch.reset_token = userData.resetToken;
  if (userData.resetTokenExpiry !== undefined) {
    patch.reset_token_expiry = userData.resetTokenExpiry?.toISOString() ?? null;
  }
  if (userData.supabaseRefreshToken !== undefined) {
    patch.supabase_refresh_token = userData.supabaseRefreshToken;
  }
  if (Object.keys(patch).length === 0) return getUserById(id);
  return patchProfile(id, patch);
}

export async function getUserByResetToken(token: string): Promise<User | undefined> {
  return fetchProfile(`reset_token=eq.${encodeURIComponent(token)}`);
}

export async function getUserByStripeCustomerId(
  customerId: string
): Promise<User | undefined> {
  return fetchProfile(`stripe_customer_id=eq.${encodeURIComponent(customerId)}`);
}

export async function updateUserSubscription(
  userId: string,
  subscriptionData: {
    subscriptionPlan?: string | null;
    subscriptionStatus?: string | null;
    stripeCustomerId?: string | null;
    stripeSubscriptionId?: string | null;
    trialEndDate?: Date | null;
    subscriptionEndDate?: Date | null;
  }
): Promise<User | undefined> {
  const patch: Record<string, any> = {};
  if (subscriptionData.subscriptionPlan !== undefined)
    patch.subscription_plan = subscriptionData.subscriptionPlan;
  if (subscriptionData.subscriptionStatus !== undefined)
    patch.subscription_status = subscriptionData.subscriptionStatus;
  if (subscriptionData.stripeCustomerId !== undefined)
    patch.stripe_customer_id = subscriptionData.stripeCustomerId;
  if (subscriptionData.stripeSubscriptionId !== undefined)
    patch.stripe_subscription_id = subscriptionData.stripeSubscriptionId;
  if (subscriptionData.trialEndDate !== undefined)
    patch.trial_end_date = subscriptionData.trialEndDate?.toISOString() ?? null;
  if (subscriptionData.subscriptionEndDate !== undefined)
    patch.subscription_end_date = subscriptionData.subscriptionEndDate?.toISOString() ?? null;

  return patchProfile(userId, patch);
}
