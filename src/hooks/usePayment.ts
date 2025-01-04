import { useState } from 'react';
import { PaymentResult } from '../services/payment/types';
import { StripeService } from '../services/payment/StripeService';

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processSubscription = async (tierId: string, priceId: string): Promise<PaymentResult> => {
    setIsProcessing(true);
    setError(null);

    try {
      const result = await StripeService.getInstance().createSubscription(tierId, priceId);
      if (!result.success && result.error) {
        setError(result.error);
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Subscription processing failed';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
        transactionId: ''
      };
    } finally {
      setIsProcessing(false);
    }
  };

  const cancelSubscription = async (subscriptionId: string): Promise<PaymentResult> => {
    setIsProcessing(true);
    setError(null);

    try {
      const result = await StripeService.getInstance().cancelSubscription(subscriptionId);
      if (!result.success && result.error) {
        setError(result.error);
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Subscription cancellation failed';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
        transactionId: ''
      };
    } finally {
      setIsProcessing(false);
    }
  };

  const openCustomerPortal = async (): Promise<void> => {
    const url = await StripeService.getInstance().getCustomerPortalSession();
    if (url) {
      window.location.href = url;
    }
  };

  return {
    processSubscription,
    cancelSubscription,
    openCustomerPortal,
    isProcessing,
    error
  };
};
