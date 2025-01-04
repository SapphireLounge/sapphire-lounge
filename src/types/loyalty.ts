export interface LoyaltyTier {
  id: string;
  name: string;
  price: number;
  benefits: string[];
  features: {
    description: string;
    included: boolean;
  }[];
}

export interface SubscriptionPlan {
  id: string;
  tierId: string;
  priceId: string; // Stripe price ID
  interval: 'month' | 'year';
  amount: number;
  currency: string;
}

export interface CustomerSubscription {
  id: string;
  customerId: string;
  tierId: string;
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}
