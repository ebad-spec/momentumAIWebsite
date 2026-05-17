import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import crypto from "crypto";
import {
  sessionStore,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  getUserByResetToken,
  updateUserSubscription,
} from "./storage";
import {
  sendVerificationCodeEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  generateVerificationCode,
} from "./email";
import { User as SchemaUser } from "./schema";
import {
  getSupabaseSessionWithPassword,
  updateSupabaseUserPassword,
  createOneTimeCode,
  exchangeOneTimeCode,
} from "./supabase";

declare global {
  namespace Express {
    interface User extends SchemaUser {}
  }
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret:
      process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex"),
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings) as any);
  app.use(passport.initialize() as any);
  app.use(passport.session() as any);

  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          // Verify credentials via Supabase Auth and capture the refresh token
          const result = await getSupabaseSessionWithPassword(email, password);
          if ("error" in result) {
            return done(null, false, { message: "Invalid email or password" });
          }

          // Fetch the full user profile
          const user = await getUserByEmail(email);
          if (!user) {
            return done(null, false, { message: "User not found" });
          }

          // Persist latest refresh token so momentum-launch can hand off the session
          updateUser(user.id, { supabaseRefreshToken: result.refresh_token }).catch(
            (err) => console.error("Failed to store refresh token:", err)
          );

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user: Express.User, done) => {
    done(null, user.id); // UUID string
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await getUserById(id);
      done(null, user ?? null);
    } catch (error) {
      done(error);
    }
  });

  app.post("/api/login", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      (
        err: Error | null,
        user: Express.User | false,
        info: { message: string } | undefined
      ) => {
        if (err) return res.status(500).json({ error: "Authentication failed" });
        if (!user)
          return res
            .status(401)
            .json({ error: info?.message || "Invalid credentials" });
        req.login(user, (loginErr) => {
          if (loginErr)
            return res.status(500).json({ error: "Failed to log in" });
          res.json({ user, message: "Logged in successfully" });
        });
      }
    )(req, res, next);
  });

  app.post("/api/logout", (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ error: "Failed to log out" });
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/user", (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    res.json({ user: req.user });
  });

  // In-memory store for signup verification codes (10-minute TTL)
  const verificationCodes = new Map<
    string,
    {
      code: string;
      email: string;
      name: string;
      password: string;
      expiresAt: number;
    }
  >();

  // Step 1: Send verification code
  app.post(
    "/api/send-verification-code",
    async (req: Request, res: Response) => {
      try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
          return res
            .status(400)
            .json({ error: "Email, password, and name are required" });
        }
        if (password.length < 8) {
          return res
            .status(400)
            .json({ error: "Password must be at least 8 characters" });
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
          return res.status(400).json({ error: "Email already registered" });
        }

        const code = generateVerificationCode();
        const expiresAt = Date.now() + 10 * 60 * 1000;

        verificationCodes.set(email, { code, email, name, password, expiresAt });

        // Clean up stale codes
        for (const [key, value] of verificationCodes.entries()) {
          if (value.expiresAt < Date.now()) verificationCodes.delete(key);
        }

        try {
          await sendVerificationCodeEmail(email, code, name);
        } catch (emailError) {
          console.error("Failed to send verification code:", emailError);
          return res
            .status(500)
            .json({ error: "Failed to send verification code" });
        }

        res.status(200).json({ message: "Verification code sent to your email", email });
      } catch (error) {
        console.error("Send verification code error:", error);
        res.status(500).json({ error: "Failed to send verification code" });
      }
    }
  );

  // Step 2: Verify code and create account
  app.post(
    "/api/verify-code-and-register",
    async (req: Request, res: Response) => {
      try {
        const { email, code } = req.body;

        if (!email || !code) {
          return res
            .status(400)
            .json({ error: "Email and code are required" });
        }

        const storedData = verificationCodes.get(email);
        if (!storedData) {
          return res
            .status(400)
            .json({ error: "Verification code not found or expired" });
        }
        if (storedData.expiresAt < Date.now()) {
          verificationCodes.delete(email);
          return res
            .status(400)
            .json({ error: "Verification code has expired" });
        }
        if (storedData.code !== code) {
          return res.status(400).json({ error: "Invalid verification code" });
        }

        // Create the user in Supabase (auth + profile)
        const user = await createUser({
          email: storedData.email,
          password: storedData.password,
          name: storedData.name,
          emailVerified: true,
        });

        // Capture refresh token for future momentum-launch handoff
        getSupabaseSessionWithPassword(storedData.email, storedData.password)
          .then((session) => {
            if (!("error" in session)) {
              updateUser(user.id, { supabaseRefreshToken: session.refresh_token }).catch(
                (err) => console.error("Failed to store refresh token after register:", err)
              );
            }
          })
          .catch((err) => console.error("Supabase session after register:", err));

        verificationCodes.delete(email);

        try {
          await sendWelcomeEmail(user.email, user.name);
        } catch (emailError) {
          console.error("Failed to send welcome email:", emailError);
        }

        req.login(user as Express.User, (err) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "Failed to log in after registration" });
          }
          res.status(201).json({ user, message: "Account created successfully!" });
        });
      } catch (error) {
        console.error("Verify code error:", error);
        res.status(500).json({ error: "Failed to verify code" });
      }
    }
  );

  app.post("/api/forgot-password", async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const user = await getUserByEmail(email);
      if (!user) {
        return res.json({
          message: "If an account exists, a reset email has been sent",
        });
      }

      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

      await updateUser(user.id, { resetToken, resetTokenExpiry });

      try {
        await sendPasswordResetEmail(email, resetToken, user.name);
      } catch (emailError) {
        console.error("Failed to send reset email:", emailError);
      }

      res.json({ message: "If an account exists, a reset email has been sent" });
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  });

  app.post("/api/reset-password", async (req: Request, res: Response) => {
    try {
      const { token, password } = req.body;

      if (!token || !password) {
        return res
          .status(400)
          .json({ error: "Token and password are required" });
      }
      if (password.length < 8) {
        return res
          .status(400)
          .json({ error: "Password must be at least 8 characters" });
      }

      const user = await getUserByResetToken(token);
      if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
        return res
          .status(400)
          .json({ error: "Invalid or expired reset token" });
      }

      // Update password in Supabase Auth
      const updated = await updateSupabaseUserPassword(user.id, password);
      if (!updated) {
        return res.status(500).json({ error: "Failed to update password" });
      }

      // Clear the reset token
      await updateUser(user.id, { resetToken: null, resetTokenExpiry: null });

      res.json({ message: "Password reset successfully" });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({ error: "Failed to reset password" });
    }
  });

  // One-time code exchange for Momentum-AI session handoff
  app.get(
    "/api/auth/momentum-exchange",
    async (req: Request, res: Response) => {
      try {
        const code =
          typeof req.query.code === "string" ? req.query.code : null;
        if (!code) {
          return res.status(400).json({ error: "Missing code" });
        }
        const tokens = exchangeOneTimeCode(code);
        if (!tokens) {
          return res.status(404).json({ error: "Invalid or expired code" });
        }
        res.json({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
        });
      } catch (error) {
        console.error("Momentum exchange error:", error);
        res.status(500).json({ error: "Exchange failed" });
      }
    }
  );
}
