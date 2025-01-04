import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Wallet } from 'lucide-react';

interface PaymentMethodSelectorProps {
  selectedMethod: 'stripe' | 'paypal';
  onSelectMethod: (method: 'stripe' | 'paypal') => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelectMethod,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-lg font-semibold text-white mb-2">Select Payment Method</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectMethod('stripe')}
          className={`relative flex items-center justify-center p-4 rounded-lg border ${
            selectedMethod === 'stripe'
              ? 'border-primary-400 bg-dark-600'
              : 'border-dark-400 bg-dark-500 hover:bg-dark-600'
          } transition-colors`}
        >
          <div className="flex items-center space-x-3">
            <CreditCard className="w-6 h-6 text-primary-400" />
            <span className="text-white font-medium">Pay with Card</span>
          </div>
          <div className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs px-2 py-1 rounded-full">
            Coming Soon
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectMethod('paypal')}
          className={`relative flex items-center justify-center p-4 rounded-lg border ${
            selectedMethod === 'paypal'
              ? 'border-primary-400 bg-dark-600'
              : 'border-dark-400 bg-dark-500 hover:bg-dark-600'
          } transition-colors`}
        >
          <div className="flex items-center space-x-3">
            <Wallet className="w-6 h-6 text-primary-400" />
            <span className="text-white font-medium">Pay with PayPal</span>
          </div>
          <div className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs px-2 py-1 rounded-full">
            Coming Soon
          </div>
        </motion.button>
      </div>
    </div>
  );
};
