# Stripe Integration Setup Guide

## Step 1: Create a Stripe Account
1. Go to [https://stripe.com](https://stripe.com)
2. Sign up for a free account
3. Complete the account setup

## Step 2: Get Your API Keys
1. Go to Stripe Dashboard → Developers → API keys
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)
4. Add them to your `.env` file:
   ```
   STRIPE_SECRET_KEY=sk_test_xxxxx
   REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
   ```

## Step 3: Create Products and Prices
1. Go to Stripe Dashboard → Products
2. Create the following products:

### Standard Plan
- Name: "Momentum AI - Standard"
- Description: "AI chatbot, 500 pages upload, 10 flashcard decks/day"
- Price: $8.99 CAD/month (recurring)
- **Free Trial: 7 days** (Optional - set in "Additional options" when creating price)
- Copy the Price ID (starts with `price_`)

### Premium Plan
- Name: "Momentum AI - Premium"
- Description: "3000+ pages, unlimited features, Voice AI tutor"
- Price: $12.99 CAD/month (recurring)
- **Free Trial: 7 days** (Optional - set in "Additional options" when creating price)
- Copy the Price ID

### MCAT Addon
- Name: "MCAT Exam Mode Addon"
- Description: "Specialized MCAT practice mode"
- Price: $4.99 CAD/month (recurring)
- Copy the Price ID

### LSAT Addon
- Name: "LSAT Exam Mode Addon"
- Description: "Specialized LSAT practice mode"
- Price: $4.99 CAD/month (recurring)
- Copy the Price ID

3. Add all Price IDs to your `.env` file:
   ```
   STRIPE_STANDARD_PRICE_ID=price_xxxxx
   STRIPE_PREMIUM_PRICE_ID=price_xxxxx
   STRIPE_MCAT_ADDON_PRICE_ID=price_xxxxx
   STRIPE_LSAT_ADDON_PRICE_ID=price_xxxxx
   ```

## Step 4: Set Up Webhooks (for production)
1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Enter your endpoint URL: `https://yourdomain.com/api/stripe-webhook`
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the **Signing secret** (starts with `whsec_`)
6. Add it to your `.env` file:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

## Step 5: Configure Free Trials (Optional but Recommended)

**Option 1: Configure trial on Price (Recommended)**
1. Go to your Product in Stripe Dashboard
2. Click on the Price you want to edit
3. Under "Additional options" or "Advanced settings"
4. Set "Trial period: 7 days"
5. Save the Price

**Option 2: Trial is already configured in code**
- The checkout session includes `trial_period_days: 7`
- This applies a 7-day trial to all new subscriptions

**Important Notes:**
- Trials configured on the Price level will show in the Stripe checkout UI
- Code-level trials (subscription_data) may not always display in checkout preview
- You can test with Stripe test cards: `4242 4242 4242 4242`
- During trial, customers won't be charged until the 7 days end

## Step 6: Test the Integration
1. Make sure your server is running with all environment variables set
2. Click "Access our Beta" on the website
3. Select a plan and click "Continue to Payment"
4. Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any billing postal code
5. Complete the payment
6. You should be redirected to the success page

## Test Cards
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Requires Authentication**: 4000 0025 0000 3155

## Currency Note
Make sure to set your Stripe account to support CAD (Canadian Dollars) if you want to charge in CAD. Otherwise, you can change the prices to USD in the code.

## Production Checklist
- [ ] Switch to live API keys (pk_live_ and sk_live_)
- [ ] Create live products and prices
- [ ] Set up production webhook endpoint
- [ ] Test with real payment methods
- [ ] Enable Stripe Radar for fraud prevention
- [ ] Set up email receipts in Stripe Dashboard



