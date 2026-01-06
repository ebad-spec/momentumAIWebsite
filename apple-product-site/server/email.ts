import { sendGridClient, FROM_EMAIL } from "./sendgrid-client";

const APP_URL = process.env.REPLIT_DEV_DOMAIN 
  ? `https://${process.env.REPLIT_DEV_DOMAIN}` 
  : "http://localhost:5000";

// Generate a random 6-digit verification code
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendVerificationCodeEmail(email: string, code: string, name: string) {
  try {
    const msg = {
      to: email,
      from: FROM_EMAIL,
      replyTo: FROM_EMAIL,
      subject: "Your Momentum AI Verification Code",
      text: `Hi ${name},\n\nYour verification code is: ${code}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this code, please ignore this email.\n\nBest regards,\nThe Momentum AI Team`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            * {
              font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f9f9f9; font-family: 'Poppins', sans-serif;">
          <div style="font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
            <div style="margin-bottom: 32px;">
              <img src="https://mntm.ca/momentumaiLargeLogo-Photoroom.png" alt="Momentum AI" width="100" style="display: block; margin-bottom: 20px;" />
            </div>
            
            <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 20px; font-weight: 600; font-family: 'Poppins', sans-serif;">Verify Your Email</h1>
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; font-family: 'Poppins', sans-serif; margin: 0 0 16px 0;">
              Hi ${name},
            </p>
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; font-family: 'Poppins', sans-serif; margin: 0 0 16px 0;">
              Your verification code is:
            </p>
            
            <div style="background-color: #f5f5f5; border-radius: 10px; padding: 20px; text-align: center; margin: 30px 0;">
              <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #000; font-family: 'Poppins', sans-serif;">${code}</span>
            </div>
            
            <p style="color: #888; font-size: 14px; margin: 20px 0 0 0; font-family: 'Poppins', sans-serif;">
              This code will expire in 10 minutes.
            </p>
            <p style="color: #888; font-size: 14px; margin: 30px 0 0 0; font-family: 'Poppins', sans-serif;">
              If you didn't request this code, please ignore this email.
            </p>
            <p style="color: #888; font-size: 12px; margin: 40px 0 0 0; padding-top: 20px; border-top: 1px solid #ddd; font-family: 'Poppins', sans-serif;">
              © ${new Date().getFullYear()} Momentum AI
            </p>
          </div>
        </body>
        </html>
      `,
      categories: ['verification_code'],
      customArgs: {
        environment: 'production',
        email_type: 'transactional'
      }
    };
    
    await sendGridClient.send(msg);
    console.log("Verification code sent to:", email);
  } catch (error) {
    console.error("Failed to send verification code:", error);
    throw error;
  }
}

export async function sendVerificationEmail(email: string, token: string, name: string) {
  const verificationUrl = `${APP_URL}/api/verify-email?token=${token}`;
  
  try {
    const msg = {
      to: email,
      from: FROM_EMAIL,
      replyTo: FROM_EMAIL,
      subject: "Verify your Momentum AI account",
      text: `Welcome to Momentum AI, ${name}!\n\nThank you for creating an account. Please verify your email address by clicking the link below:\n\n${verificationUrl}\n\nIf you didn't create this account, you can safely ignore this email.\n\nBest regards,\nThe Momentum AI Team`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            * {
              font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f9f9f9; font-family: 'Poppins', sans-serif;">
          <div style="font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
            <div style="margin-bottom: 32px;">
              <img src="https://mntm.ca/momentumaiLargeLogo-Photoroom.png" alt="Momentum AI" width="100" style="display: block; margin-bottom: 20px;" />
            </div>
            
            <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 20px; font-weight: 600; font-family: 'Poppins', sans-serif;">Welcome to Momentum AI, ${name}!</h1>
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; font-family: 'Poppins', sans-serif; margin: 0 0 20px 0;">
              Thank you for creating an account. Please verify your email address by clicking the button below:
            </p>
            
            <a href="${verificationUrl}" style="display: inline-block; background-color: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: 500; margin: 20px 0; font-family: 'Poppins', sans-serif;">
              Verify Email
            </a>
            
            <p style="color: #888; font-size: 14px; margin: 30px 0 0 0; font-family: 'Poppins', sans-serif;">
              If you didn't create this account, you can safely ignore this email.
            </p>
            <p style="color: #888; font-size: 12px; margin: 40px 0 0 0; padding-top: 20px; border-top: 1px solid #ddd; font-family: 'Poppins', sans-serif;">
              © ${new Date().getFullYear()} Momentum AI
            </p>
          </div>
        </body>
        </html>
      `,
      categories: ['email_verification'],
      customArgs: {
        environment: 'production',
        email_type: 'transactional'
      }
    };
    
    await sendGridClient.send(msg);
    console.log("Verification email sent to:", email);
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw error;
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const msg = {
      to: email,
      from: FROM_EMAIL,
      replyTo: 'ebad@mntm.ca',
      subject: "Welcome to Momentum AI 🚀",
      text: `Hey ${name},\n\nEbad here – Co-Founder & CEO of Momentum AI.\n\nI just wanted to personally welcome you to our community. We built Momentum AI because we believe studying should be smarter, not harder, and I'm genuinely excited to have you here.\n\nWe're constantly improving and adding new features based on what our users need. If you ever have feedback, ideas, or just want to chat about what we're building, don't hesitate to reach out. I read every email.\n\nLet's make this your best semester yet.\n\n- Ebad Khan\nCo-Founder & CEO, Momentum AI\nebad@mntm.ca`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            * {
              font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f9f9f9; font-family: 'Poppins', sans-serif;">
          <div style="font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a; background-color: #ffffff;">
            <div style="margin-bottom: 32px;">
              <img src="https://mntm.ca/momentumaiLargeLogo-Photoroom.png" alt="Momentum AI" width="100" style="display: block; margin-bottom: 20px;" />
            </div>
            
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.7; margin: 0 0 16px 0; font-family: 'Poppins', sans-serif;">
              Hey ${name},
            </p>
            
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.7; margin: 0 0 16px 0; font-family: 'Poppins', sans-serif;">
              Ebad here – Co-Founder & CEO of Momentum AI.
            </p>
            
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.7; margin: 0 0 16px 0; font-family: 'Poppins', sans-serif;">
              I just wanted to personally welcome you to our community. We built Momentum AI because we believe studying should be <strong style="font-family: 'Poppins', sans-serif;">smarter, not harder</strong>, and I'm genuinely excited to have you here.
            </p>
            
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.7; margin: 0 0 16px 0; font-family: 'Poppins', sans-serif;">
              We're constantly improving and adding new features based on what our users need. If you ever have feedback, ideas, or just want to chat about what we're building, don't hesitate to reach out. I read every email.
            </p>
            
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.7; margin: 0 0 32px 0; font-family: 'Poppins', sans-serif;">
              Let's make this your best semester yet.
            </p>
            
            <div style="border-left: 3px solid #000; padding-left: 16px; margin: 32px 0;">
              <p style="color: #1a1a1a; font-size: 15px; margin: 0; line-height: 1.5; font-family: 'Poppins', sans-serif;">
                <strong style="font-family: 'Poppins', sans-serif;">Ebad Khan</strong><br>
                <span style="color: #666; font-family: 'Poppins', sans-serif;">Co-Founder & CEO, Momentum AI</span><br>
                <a href="mailto:ebad@mntm.ca" style="color: #000; text-decoration: none; font-family: 'Poppins', sans-serif;">ebad@mntm.ca</a>
              </p>
            </div>
            
            <p style="color: #999; font-size: 12px; margin: 40px 0 0 0; padding-top: 20px; border-top: 1px solid #ddd; font-family: 'Poppins', sans-serif;">
              © ${new Date().getFullYear()} Momentum AI
            </p>
          </div>
        </body>
        </html>
      `,
      categories: ['welcome_email'],
      customArgs: {
        environment: 'production',
        email_type: 'transactional'
      }
    };
    
    await sendGridClient.send(msg);
    console.log("Welcome email sent to:", email);
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    throw error;
  }
}

export async function sendPasswordResetEmail(email: string, token: string, name: string) {
  const resetUrl = `${APP_URL}/reset-password?token=${token}`;
  
  try {
    const msg = {
      to: email,
      from: FROM_EMAIL,
      replyTo: FROM_EMAIL,
      subject: "Reset your Momentum AI password",
      text: `Password Reset Request\n\nHi ${name},\n\nWe received a request to reset your password. Click the link below to create a new password:\n\n${resetUrl}\n\nThis link will expire in 1 hour. If you didn't request this, you can safely ignore this email.\n\nBest regards,\nThe Momentum AI Team`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            * {
              font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f9f9f9; font-family: 'Poppins', sans-serif;">
          <div style="font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
            <div style="margin-bottom: 32px;">
              <img src="https://mntm.ca/momentumaiLargeLogo-Photoroom.png" alt="Momentum AI" width="100" style="display: block; margin-bottom: 20px;" />
            </div>
            
            <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 20px; font-weight: 600; font-family: 'Poppins', sans-serif;">Password Reset Request</h1>
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; font-family: 'Poppins', sans-serif; margin: 0 0 16px 0;">
              Hi ${name},
            </p>
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; font-family: 'Poppins', sans-serif; margin: 0 0 20px 0;">
              We received a request to reset your password. Click the button below to create a new password:
            </p>
            <a href="${resetUrl}" style="display: inline-block; background-color: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: 500; margin: 20px 0; font-family: 'Poppins', sans-serif;">
              Reset Password
            </a>
            <p style="color: #888; font-size: 14px; margin: 30px 0 0 0; font-family: 'Poppins', sans-serif;">
              This link will expire in 1 hour. If you didn't request this, you can safely ignore this email.
            </p>
            <p style="color: #888; font-size: 12px; margin: 40px 0 0 0; padding-top: 20px; border-top: 1px solid #ddd; font-family: 'Poppins', sans-serif;">
              © ${new Date().getFullYear()} Momentum AI
            </p>
          </div>
        </body>
        </html>
      `,
      categories: ['password_reset'],
      customArgs: {
        environment: 'production',
        email_type: 'transactional'
      }
    };
    
    await sendGridClient.send(msg);
    console.log("Password reset email sent to:", email);
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw error;
  }
}
