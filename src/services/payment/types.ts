export interface PaymentProvider {
  name: string;
  initialize: () => Promise<void>;
  processPayment(amount: number): Promise<PaymentResult>;
}

export interface PaymentResult {
  success: boolean;
  error?: string;
  transactionId: string;
}

export interface PaymentConfig {
  provider: string;
  publicKey?: string;
  testMode: boolean;
}
