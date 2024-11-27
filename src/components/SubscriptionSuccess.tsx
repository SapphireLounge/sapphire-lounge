import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, CreditCard, Gift, CalendarClock } from 'lucide-react';

interface SubscriptionSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  tier: {
    level: string;
    iconClass: string;
  };
}

const SubscriptionSuccess: React.FC<SubscriptionSuccessProps> = ({ isOpen, onClose, tier }) => {
  const steps = [
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: 'Digital Card Ready',
      description: 'Your digital membership card is now active in your account'
    },
    {
      icon: <Gift className="w-5 h-5" />,
      title: 'Welcome Package',
      description: 'Your physical card will arrive within 3-5 business days'
    },
    {
      icon: <CalendarClock className="w-5 h-5" />,
      title: 'Benefits Active',
      description: 'Start enjoying your benefits immediately'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-[#050D1A] rounded-xl p-6 max-w-md w-full relative z-10 border border-dark-700 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6, delay: 0.1 }}
                className="mx-auto mb-4"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${tier.iconClass} mx-auto flex items-center justify-center`}>
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-white mb-2"
              >
                Welcome to {tier.level}!
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-200"
              >
                Your subscription has been confirmed
              </motion.p>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start space-x-3 bg-[#0A1628] p-3 rounded-lg border border-dark-700/50"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-gray-100 font-medium">{step.title}</h4>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6"
            >
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-primary-400 to-accent-500 py-3 rounded-md font-semibold hover:from-primary-500 hover:to-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 transition-all text-white shadow-lg"
              >
                Start Exploring
              </button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionSuccess;
