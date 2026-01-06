import Stripe from 'stripe';
import { Express, Request, Response } from 'express';
import { updateUserSubscription, getUserById, getUserByStripeCustomerId } from './storage';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

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
      console.log('Creating checkout session with 7-day trial for plan:', plan);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'subscription',
        success_url: `${FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${FRONTEND_URL}/`,
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
        
        if (userId && plan) {
          try {
            await updateUserSubscription(parseInt(userId), {
              subscriptionPlan: plan,
              subscriptionStatus: 'active',
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: session.subscription as string,
            });
            console.log(`Updated subscription for user ${userId}: plan=${plan}`);
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

      const hasActiveSubscription = user.subscriptionStatus === 'active' || user.subscriptionStatus === 'trialing';
      
      res.json({ 
        hasSubscription: hasActiveSubscription,
        plan: user.subscriptionPlan || null,
        status: user.subscriptionStatus || null
      });
    } catch (error) {
      console.error('Error fetching subscription:', error);
      res.status(500).json({ error: 'Failed to fetch subscription' });
    }
  });
}

