import { useState } from 'react';
import { PaymentResult } from '../services/payment/types';
import { PaymentService } from '../services/payment/PaymentService';

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPayment = async (amount: number): Promise<PaymentResult> => {
    setIsProcessing(true);
    setError(null);

    try {
      const result = await PaymentService.getInstance().processPayment(amount);
      if (!result.success && result.error) {
        setError(result.error);
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment processing failed';
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

  return {
    processPayment,
    isProcessing,
    error
  };
};
