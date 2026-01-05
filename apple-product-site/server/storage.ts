import { db, pool } from "./db";
import { users, User, InsertUser } from "./schema";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export const sessionStore = new PostgresSessionStore({
  pool,
  createTableIfMissing: true,
});

export async function getUserById(id: number): Promise<User | undefined> {
  const result = await db.select().from(users).where(eq(users.id, id));
  return result[0];
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const result = await db.select().from(users).where(eq(users.email, email.toLowerCase()));
  return result[0];
}

export async function createUser(userData: InsertUser): Promise<User> {
  const result = await db.insert(users).values({
    ...userData,
    email: userData.email.toLowerCase(),
  }).returning();
  return result[0];
}

export async function updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
  const result = await db.update(users)
    .set(userData)
    .where(eq(users.id, id))
    .returning();
  return result[0];
}

export async function getUserByVerificationToken(token: string): Promise<User | undefined> {
  const result = await db.select().from(users).where(eq(users.verificationToken, token));
  return result[0];
}

export async function getUserByResetToken(token: string): Promise<User | undefined> {
  const result = await db.select().from(users).where(eq(users.resetToken, token));
  return result[0];
}
