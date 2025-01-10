import { loadStripe, Stripe } from '@stripe/stripe-js';
import type { PaymentResult } from './types';

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

export class StripeService {
  private static instance: StripeService;
  private stripe: Promise<Stripe | null>;

  private constructor() {
    this.stripe = loadStripe(STRIPE_PUBLIC_KEY);
  }

  public static getInstance(): StripeService {
    if (!StripeService.instance) {
      StripeService.instance = new StripeService();
    }
    return StripeService.instance;
  }

  async createSubscription(tierId: string, priceId: string): Promise<PaymentResult> {
    try {
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tierId,
          priceId,
        }),
      });

      const session = await response.json();

      if (!session || !session.sessionId) {
        throw new Error('Failed to create subscription session');
      }

      const stripe = await this.stripe;
      if (!stripe) {
        throw new Error('Failed to initialize Stripe');
      }
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        transactionId: session.sessionId,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Subscription creation failed',
        transactionId: '',
      };
    }
  }

  async cancelSubscription(subscriptionId: string): Promise<PaymentResult> {
    try {
      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to cancel subscription');
      }

      return {
        success: true,
        transactionId: subscriptionId,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Subscription cancellation failed',
        transactionId: '',
      };
    }
  }

  async getCustomerPortalSession(): Promise<string | null> {
    try {
      const response = await fetch('/api/customer-portal', {
        method: 'POST',
      });

      const { url } = await response.json();
      return url;
    } catch (error) {
      console.error('Failed to get customer portal session:', error);
      return null;
    }
  }
}
