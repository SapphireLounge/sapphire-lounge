import type { PaymentResult } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export class PayPalService {
  private static instance: PayPalService;

  private constructor() {}

  public static getInstance(): PayPalService {
    if (!PayPalService.instance) {
      PayPalService.instance = new PayPalService();
    }
    return PayPalService.instance;
  }

  async createSubscription(tierId: string, planId: string): Promise<PaymentResult> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/paypal/create-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tierId,
          planId,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to create subscription');
      }

      return {
        success: true,
        transactionId: result.subscriptionId,
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
      const response = await fetch(`${API_BASE_URL}/api/paypal/cancel-subscription`, {
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
}
