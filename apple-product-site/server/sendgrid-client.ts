import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key from environment variable
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

if (!SENDGRID_API_KEY) {
  console.error('SENDGRID_API_KEY is not set in environment variables');
} else {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export const sendGridClient = sgMail;
// Format: "Display Name <email@example.com>"
export const FROM_EMAIL = {
  name: 'Momentum AI',
  email: 'hr@mntm.ca'
};

