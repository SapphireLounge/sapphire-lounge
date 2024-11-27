import { PaymentProvider, PaymentResult } from './types';
import { MockPaymentProvider } from './MockPaymentProvider';

export class PaymentService {
  private static instance: PaymentService;
  private provider: PaymentProvider;

  private constructor() {
    // Initialize with mock provider by default
    this.provider = new MockPaymentProvider();
  }

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  public async processPayment(amount: number): Promise<PaymentResult> {
    try {
      return await this.provider.processPayment(amount);
    } catch (error) {
      console.error('Payment processing error:', error);
      return {
        success: false,
        error: 'Payment processing failed. Please try again.',
        transactionId: ''
      };
    }
  }

  public setProvider(provider: PaymentProvider) {
    this.provider = provider;
  }
}
