/**
 * TypeScript types mirroring the Supabase schema.
 * auth.users is the source of truth for identity; public.profiles holds
 * profile + subscription data and is joined at the storage layer.
 */

export interface User {
  id: string; // UUID from auth.users
  email: string;
  name: string;
  emailVerified: boolean;
  resetToken: string | null;
  resetTokenExpiry: Date | null;
  createdAt: Date | null;
  subscriptionPlan: string | null;
  subscriptionStatus: string | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  trialEndDate: Date | null;
  subscriptionEndDate: Date | null;
  supabaseRefreshToken: string | null;
}

export type InsertUser = {
  email: string;
  password: string;
  name: string;
  emailVerified?: boolean;
  verificationToken?: string | null;
};
