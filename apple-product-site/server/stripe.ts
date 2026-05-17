import Stripe from 'stripe';
import { Express, Request, Response } from 'express';
import { updateUserSubscription, getUserById, getUserByStripeCustomerId } from './storage';
import { isSupabaseConfigured, refreshSupabaseSession, createOneTimeCode, getSupabaseSessionWithPassword } from './supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-12-15.clover',
});

/**
 * Where Stripe redirects after pay / cancel.
 *
 * Priority:
 * 1. STRIPE_CHECKOUT_APP_URL — explicit (staging, custom port, etc.)
 * 2. If Stripe is in TEST mode (sk_test_*) — use local CRA dev URL so Replit can
 *    keep FRONTEND_URL=https://mntm.ca for emails while checkouts still return
 *    to localhost. Override with STRIPE_DEV_CHECKOUT_APP_URL if needed.
 * 3. FRONTEND_URL — production / live checkout return host
 */
function checkoutFrontendOrigin(): string {
  const explicit = process.env.STRIPE_CHECKOUT_APP_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/+$/, "");
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY || "";
  if (stripeKey.startsWith("sk_test_")) {
    const dev =
      process.env.STRIPE_DEV_CHECKOUT_APP_URL?.trim() || "http://localhost:3001";
    return dev.replace(/\/+$/, "");
  }

  const base = process.env.FRONTEND_URL?.trim() || "http://localhost:3001";
  return base.replace(/\/+$/, "");
}

const MOMENTUM_AI_APP_BASE_URL =
  process.env.MOMENTUM_AI_APP_BASE_URL?.trim().replace(/\/+$/, "") ||
  "http://localhost:56160";

export function setupStripe(app: Express) {
  // Create Stripe checkout session
  app.post('/api/create-checkout-session', async (req: Request, res: Response) => {
    try {
      const { plan, addons } = req.body;
      
      if (!req.user) {
        return res.status(401).json({ error: 'Must be logged in to purchase' });
      }

      // Define price IDs for each plan
      const priceIds: { [key: string]: string } = {
        standard: process.env.STRIPE_STANDARD_PRICE_ID || '',
        premium: process.env.STRIPE_PREMIUM_PRICE_ID || '',
      };

      if (!priceIds[plan]) {
        return res.status(400).json({ error: 'Invalid plan selected' });
      }

      // Build line items (only main plan, no addons for now)
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
        {
          price: priceIds[plan],
          quantity: 1,
        },
      ];

      // Create Stripe checkout session with free trial
      const appOrigin = checkoutFrontendOrigin();
      console.log("[Stripe] checkout return origin:", appOrigin);
      console.log('Creating checkout session with 7-day trial for plan:', plan);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'subscription',
        success_url: `${appOrigin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appOrigin}/`,
        customer_email: req.user.email,
        client_reference_id: req.user.id.toString(),
        metadata: {
          userId: req.user.id.toString(),
          plan: plan,
          addons: addons ? addons.join(',') : '',
        },
        subscription_data: {
          trial_period_days: 7, // 7-day free trial
        },
      });
      
      console.log('Checkout session created with trial_period_days: 7');

      res.json({ sessionId: session.id, url: session.url });
    } catch (error) {
      console.error('Stripe checkout error:', error);
      res.status(500).json({ error: 'Failed to create checkout session' });
    }
  });

  // Webhook to handle successful payments
  app.post('/api/stripe-webhook', async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !webhookSecret) {
      return res.status(400).send('Webhook signature missing');
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return res.status(400).send(`Webhook Error: ${err}`);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Payment successful:', session);
        
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan;
        
        if (userId && plan && session.subscription) {
          try {
            // Get subscription to find trial end date
            const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
            const trialEndDate = subscription.trial_end 
              ? new Date(subscription.trial_end * 1000) 
              : null;
            
            await updateUserSubscription(userId, {
              subscriptionPlan: plan,
              subscriptionStatus: subscription.status === 'trialing' ? 'trialing' : 'active',
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: session.subscription as string,
              trialEndDate: trialEndDate,
            });
            console.log(`Updated subscription for user ${userId}: plan=${plan}, trial ends ${trialEndDate}`);
          } catch (err) {
            console.error('Failed to update user subscription:', err);
          }
        }
        
        break;
      
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription updated:', subscription);
        
        if (subscription.customer) {
          const customerId = typeof subscription.customer === 'string' 
            ? subscription.customer 
            : subscription.customer.id;
          
          const user = await getUserByStripeCustomerId(customerId);
          if (user) {
            const status = subscription.status === 'active' || subscription.status === 'trialing' 
              ? 'active' 
              : subscription.status;
            await updateUserSubscription(user.id, {
              subscriptionStatus: status,
            });
            console.log(`Updated subscription status for user ${user.id}: status=${status}`);
          }
        }
        break;
      
      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        console.log('Subscription cancelled:', deletedSubscription);
        
        if (deletedSubscription.customer) {
          const customerId = typeof deletedSubscription.customer === 'string' 
            ? deletedSubscription.customer 
            : deletedSubscription.customer.id;
          
          const user = await getUserByStripeCustomerId(customerId);
          if (user) {
            await updateUserSubscription(user.id, {
              subscriptionStatus: 'cancelled',
            });
            console.log(`Cancelled subscription for user ${user.id}`);
          }
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  });

  // Verify checkout session and update subscription (for local dev when webhooks don't work)
  app.post('/api/verify-checkout-session', async (req: Request, res: Response) => {
    try {
      const { session_id } = req.body;
      
      if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      if (!session_id) {
        return res.status(400).json({ error: 'Session ID required' });
      }

      // Retrieve the session from Stripe
      const session = await stripe.checkout.sessions.retrieve(session_id);
      
      if (!session || session.payment_status !== 'paid') {
        return res.status(400).json({ error: 'Invalid or unpaid session' });
      }

      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan;
      
      if (userId && userId === req.user.id && plan) {
        // Get the subscription to find trial end date
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        
        // Calculate trial end date (7 days from now)
        const trialEndDate = subscription.trial_end 
          ? new Date(subscription.trial_end * 1000) 
          : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        
        // Update the user's subscription
        await updateUserSubscription(req.user.id, {
          subscriptionPlan: plan,
          subscriptionStatus: 'trialing', // It's in trial period
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: session.subscription as string,
          trialEndDate: trialEndDate,
        });
        
        console.log(`Verified and updated subscription for user ${req.user.id}: plan=${plan}, trial ends ${trialEndDate}`);

        res.json({ success: true, plan, status: 'trialing' });
      } else {
        res.status(400).json({ error: 'Session does not match user' });
      }
    } catch (error) {
      console.error('Error verifying checkout session:', error);
      res.status(500).json({ error: 'Failed to verify session' });
    }
  });

  // Get subscription status
  app.get('/api/subscription-status', async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const user = await getUserById(req.user.id);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if user has active access
      const now = new Date();
      let hasActiveAccess = false;
      let daysRemaining = 0;
      
      // Check if in trial period
      if (user.trialEndDate && new Date(user.trialEndDate) > now) {
        hasActiveAccess = true;
        daysRemaining = Math.ceil((new Date(user.trialEndDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      } 
      // Check if subscription is active
      else if (user.subscriptionStatus === 'active' || user.subscriptionStatus === 'trialing') {
        hasActiveAccess = true;
      }
      // Check if cancelled but still in billing period
      else if (user.subscriptionStatus === 'cancelled' && user.subscriptionEndDate && new Date(user.subscriptionEndDate) > now) {
        hasActiveAccess = true;
        daysRemaining = Math.ceil((new Date(user.subscriptionEndDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      }
      
      res.json({ 
        hasSubscription: hasActiveAccess,
        plan: user.subscriptionPlan || null,
        status: user.subscriptionStatus || null,
        trialEndDate: user.trialEndDate || null,
        subscriptionEndDate: user.subscriptionEndDate || null,
        daysRemaining: daysRemaining > 0 ? daysRemaining : null
      });
    } catch (error) {
      console.error('Error fetching subscription:', error);
      res.status(500).json({ error: 'Failed to fetch subscription' });
    }
  });

  // Launch Momentum-AI: when user clicks "Access our Beta", return redirect URL with one-time code so they land signed in (no Supabase login page)
  app.get('/api/momentum-launch', async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const user = await getUserById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const now = new Date();
      let hasActiveAccess = false;
      if (user.trialEndDate && new Date(user.trialEndDate) > now) {
        hasActiveAccess = true;
      } else if (user.subscriptionStatus === 'active' || user.subscriptionStatus === 'trialing') {
        hasActiveAccess = true;
      } else if (user.subscriptionStatus === 'cancelled' && user.subscriptionEndDate && new Date(user.subscriptionEndDate) > now) {
        hasActiveAccess = true;
      }

      if (!hasActiveAccess) {
        return res.status(403).json({ error: 'Active subscription required' });
      }

      const baseUrl = MOMENTUM_AI_APP_BASE_URL.replace(/\/$/, '');
      let redirectUrl = baseUrl;

      if (isSupabaseConfigured() && user.supabaseRefreshToken) {
        const refreshed = await refreshSupabaseSession(user.supabaseRefreshToken);
        if (refreshed && !('error' in refreshed)) {
          const code = createOneTimeCode(refreshed);
          redirectUrl = `${baseUrl}/auth/callback?code=${encodeURIComponent(code)}`;
        }
      }

      res.json({ redirectUrl });
    } catch (error) {
      console.error('Error generating momentum launch URL:', error);
      res.status(500).json({ error: 'Failed to launch' });
    }
  });

  // Change subscription plan
  app.post('/api/change-subscription', async (req: Request, res: Response) => {
    try {
      const { newPlan } = req.body;
      
      if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      if (!newPlan || (newPlan !== 'standard' && newPlan !== 'premium')) {
        return res.status(400).json({ error: 'Invalid plan' });
      }

      const user = await getUserById(req.user.id);
      
      if (!user || !user.stripeSubscriptionId) {
        return res.status(404).json({ error: 'No active subscription found' });
      }

      // Get the new price ID
      const priceIds: { [key: string]: string } = {
        standard: process.env.STRIPE_STANDARD_PRICE_ID || '',
        premium: process.env.STRIPE_PREMIUM_PRICE_ID || '',
      };

      // Update the subscription in Stripe
      const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
      await stripe.subscriptions.update(user.stripeSubscriptionId, {
        items: [{
          id: subscription.items.data[0].id,
          price: priceIds[newPlan],
        }],
        proration_behavior: 'always_invoice', // Prorate the charges
      });

      // Update in database
      await updateUserSubscription(req.user.id, {
        subscriptionPlan: newPlan,
      });

      console.log(`Changed subscription for user ${req.user.id} to ${newPlan}`);
      res.json({ success: true, newPlan });
    } catch (error) {
      console.error('Error changing subscription:', error);
      res.status(500).json({ error: 'Failed to change subscription' });
    }
  });

  // Cancel subscription
  app.post('/api/cancel-subscription', async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const user = await getUserById(req.user.id);
      
      if (!user || !user.stripeSubscriptionId) {
        return res.status(404).json({ error: 'No active subscription found' });
      }

      // Get subscription to find when current period ends
      const subscription = (await stripe.subscriptions.retrieve(
        user.stripeSubscriptionId
      )) as Stripe.Subscription;
      const currentPeriodEnd = subscription.items.data[0]?.current_period_end;
      if (!currentPeriodEnd) {
        return res.status(500).json({ error: 'Unable to determine subscription period end' });
      }
      const periodEnd = new Date(currentPeriodEnd * 1000);

      // Cancel the subscription at period end (so user keeps access until then)
      await stripe.subscriptions.update(user.stripeSubscriptionId, {
        cancel_at_period_end: true,
      });

      // Update status in database with end date
      await updateUserSubscription(req.user.id, {
        subscriptionStatus: 'cancelled',
        subscriptionEndDate: periodEnd,
      });

      console.log(`Cancelled subscription for user ${req.user.id}, access until ${periodEnd}`);
      res.json({ success: true, accessUntil: periodEnd });
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      res.status(500).json({ error: 'Failed to cancel subscription' });
    }
  });
}

