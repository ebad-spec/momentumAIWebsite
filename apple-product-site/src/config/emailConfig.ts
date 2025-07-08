// EmailJS Configuration
// Replace these values with your actual EmailJS credentials

export const emailConfig = {
  // Your EmailJS Public Key (from EmailJS dashboard)
  publicKey: 'AQ5mHzggh7O6Efi08',
  
  // Your EmailJS Service ID (from EmailJS dashboard)
  serviceId: 'service_7zx529q',
  
  // Template ID for user confirmation email
  userTemplateId: 'MomentumAIBetaSignup',
  
  // Template ID for admin notification email
  adminTemplateId: 'BetaSignupToOwner',
  
  // Admin email address
  adminEmail: 'ebad.khan5487@gmail.com',
};

// Email templates for reference:

/* 
USER CONFIRMATION TEMPLATE (create this in EmailJS):
Subject: Welcome to Momentum AI Beta! 🚀

Hello {{to_name}},

Thank you for signing up for the Momentum AI beta! We're excited to have you join our community of early adopters.

Our team will reach out to you soon with next steps and early access details. In the meantime, feel free to explore our website and learn more about what we're building.

Best regards,
The Momentum AI Team

---

ADMIN NOTIFICATION TEMPLATE (create this in EmailJS):
Subject: New Beta Signup - {{user_email}}

Hello {{to_name}},

You have a new beta signup:

Email: {{user_email}}
Signup Time: {{signup_time}}

Please follow up with the user for next steps.

Best regards,
Beta Signup System
*/ 