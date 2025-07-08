# EmailJS Setup Guide for Beta Signup

Follow these steps to set up email functionality for your beta signup form.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Connect Your Gmail Account

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Select "Gmail"
4. Click "Connect Account" and authenticate with your Gmail (ebad.khan5487@gmail.com)
5. Note down the **Service ID** (something like `service_xxxxxxx`)

## Step 3: Create Email Templates

### Template 1: User Confirmation Email
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Set the template name: "User Beta Confirmation"
4. Configure the template:

**To:** `{{to_email}}`
**From:** `noreply@yourdomain.com` (or your Gmail)
**Subject:** `Welcome to Momentum AI Beta! 🚀`

**Content:**
```
Hello {{to_name}},

Thank you for signing up for the Momentum AI beta! We're excited to have you join our community of early adopters.

Our team will reach out to you soon with next steps and early access details. In the meantime, feel free to explore our website and learn more about what we're building.

Best regards,
The Momentum AI Team

---
This email was sent because you signed up for the Momentum AI beta at our website.
```

5. Save the template and note the **Template ID** (something like `template_xxxxxxx`)

### Template 2: Admin Notification Email
1. Create another new template
2. Set the template name: "Admin Beta Notification"
3. Configure the template:

**To:** `{{to_email}}`
**From:** `noreply@yourdomain.com` (or your Gmail)
**Subject:** `New Beta Signup - {{user_email}}`

**Content:**
```
Hello {{to_name}},

You have a new beta signup:

Email: {{user_email}}
Signup Time: {{signup_time}}

Please follow up with the user for next steps.

Best regards,
Beta Signup System
```

4. Save the template and note the **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (something like `xxxxxxxxxxxxxxx`)

## Step 5: Update Configuration

Open `src/config/emailConfig.ts` and replace the placeholder values:

```typescript
export const emailConfig = {
  publicKey: 'YOUR_ACTUAL_PUBLIC_KEY',
  serviceId: 'YOUR_ACTUAL_SERVICE_ID',
  userTemplateId: 'YOUR_USER_TEMPLATE_ID',
  adminTemplateId: 'YOUR_ADMIN_TEMPLATE_ID',
  adminEmail: 'ebad.khan5487@gmail.com',
};
```

## Step 6: Test the Setup

1. Start your development server: `npm start`
2. Navigate to the beta signup page
3. Enter a test email and submit
4. Check if:
   - The user receives a confirmation email
   - You receive a notification email at ebad.khan5487@gmail.com

## Troubleshooting

- **Emails not sending**: Check your EmailJS dashboard for error logs
- **Gmail blocking**: Make sure your Gmail account has "Less secure app access" enabled or use App Passwords
- **Template errors**: Ensure all template variables ({{to_email}}, {{to_name}}, etc.) are correctly used
- **Rate limits**: EmailJS free plan has limits (200 emails/month)

## Security Notes

- Never commit your actual EmailJS credentials to version control
- Consider using environment variables for production
- Monitor your EmailJS usage to avoid hitting rate limits

## EmailJS Free Plan Limits

- 200 emails per month
- 2 email services
- 1 template per service
- Basic support

For production use, consider upgrading to a paid plan for higher limits and better support. 