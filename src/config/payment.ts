import { PaymentConfig } from '../services/payment/types';

export const paymentConfig: PaymentConfig = {
  provider: process.env.REACT_APP_PAYMENT_PROVIDER || 'mock',
  publicKey: process.env.REACT_APP_PAYMENT_PUBLIC_KEY,
  testMode: process.env.NODE_ENV !== 'production'
};

export const SUBSCRIPTION_TIERS = {
  SILVER: {
    id: 'silver_tier',
    price: 1000, // £10.00 in pence
    currency: 'GBP'
  },
  GOLD: {
    id: 'gold_tier',
    price: 2000, // £20.00 in pence
    currency: 'GBP'
  },
  PLATINUM: {
    id: 'platinum_tier',
    price: 3000, // £30.00 in pence
    currency: 'GBP'
  }
};
