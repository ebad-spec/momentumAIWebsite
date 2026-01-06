import { pgTable, serial, varchar, timestamp, boolean, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  emailVerified: boolean("email_verified").default(false),
  verificationToken: varchar("verification_token", { length: 255 }),
  resetToken: varchar("reset_token", { length: 255 }),
  resetTokenExpiry: timestamp("reset_token_expiry"),
  createdAt: timestamp("created_at").defaultNow(),
  subscriptionPlan: varchar("subscription_plan", { length: 50 }),
  subscriptionStatus: varchar("subscription_status", { length: 50 }),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
