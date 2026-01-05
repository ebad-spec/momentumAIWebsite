import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@momentumai.com";
const APP_URL = process.env.REPLIT_DEV_DOMAIN 
  ? `https://${process.env.REPLIT_DEV_DOMAIN}` 
  : "http://localhost:5000";

export async function sendVerificationEmail(email: string, token: string, name: string) {
  const verificationUrl = `${APP_URL}/api/verify-email?token=${token}`;
  
  await transporter.sendMail({
    from: FROM_EMAIL,
    to: email,
    subject: "Verify your Momentum AI account",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 20px;">Welcome to Momentum AI, ${name}!</h1>
        <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
          Thank you for creating an account. Please verify your email address by clicking the button below:
        </p>
        <a href="${verificationUrl}" style="display: inline-block; background-color: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: 500; margin: 20px 0;">
          Verify Email
        </a>
        <p style="color: #888; font-size: 14px; margin-top: 30px;">
          If you didn't create this account, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(email: string, name: string) {
  await transporter.sendMail({
    from: FROM_EMAIL,
    to: email,
    subject: "Welcome to Momentum AI!",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 20px;">Welcome to Momentum AI!</h1>
        <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
          Hi ${name},
        </p>
        <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
          Your email has been verified and your account is now fully set up. You're ready to start your journey with Momentum AI!
        </p>
        <a href="${APP_URL}/login" style="display: inline-block; background-color: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: 500; margin: 20px 0;">
          Get Started
        </a>
        <p style="color: #888; font-size: 14px; margin-top: 30px;">
          If you have any questions, feel free to reach out to our support team.
        </p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string, name: string) {
  const resetUrl = `${APP_URL}/reset-password?token=${token}`;
  
  await transporter.sendMail({
    from: FROM_EMAIL,
    to: email,
    subject: "Reset your Momentum AI password",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 20px;">Password Reset Request</h1>
        <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
          Hi ${name},
        </p>
        <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
          We received a request to reset your password. Click the button below to create a new password:
        </p>
        <a href="${resetUrl}" style="display: inline-block; background-color: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: 500; margin: 20px 0;">
          Reset Password
        </a>
        <p style="color: #888; font-size: 14px; margin-top: 30px;">
          This link will expire in 1 hour. If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}
