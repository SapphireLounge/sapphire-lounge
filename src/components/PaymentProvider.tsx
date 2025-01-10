import React from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

const paypalOptions = {
  'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID!,
  currency: 'GBP',
  intent: 'subscription',
};

interface PaymentProviderProps {
  children: React.ReactNode;
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({ children }) => {
  return (
    <PayPalScriptProvider options={paypalOptions}>
      <Elements stripe={stripePromise}>
        {children}
      </Elements>
    </PayPalScriptProvider>
  );
};
