import { PaymentProvider, PaymentResult } from './types';

export class MockPaymentProvider implements PaymentProvider {
  name = 'MockPaymentProvider';

  async initialize(): Promise<void> {
    console.log('Mock payment provider initialized');
  }

  async processPayment(amount: number): Promise<PaymentResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // Simulate success with 90% probability
    const success = Math.random() < 0.9;

    if (success) {
      return {
        success: true,
        transactionId: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
    } else {
      return {
        success: false,
        error: 'Payment declined. Please try again.',
        transactionId: ''
      };
    }
  }
}
