import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Gift, Award, Zap, Check, Loader2 } from 'lucide-react';
import { usePayment } from '../hooks/usePayment';
import SubscriptionSuccess from '../components/SubscriptionSuccess';

interface TierBenefit {
  level: string;
  price: number;
  iconClass: string;
  benefits: string[];
}

const Loyalty: React.FC = () => {
  const { processPayment, error } = usePayment();
  const [processingTier, setProcessingTier] = useState<string | null>(null);
  const [errorTier, setErrorTier] = useState<string | null>(null);
  const [successTier, setSuccessTier] = useState<{ level: string; iconClass: string } | null>(null);

  const tiers: TierBenefit[] = [
    {
      level: 'Silver',
      price: 1000, // £10.00
      iconClass: 'from-gray-500 to-gray-300',
      benefits: [
        '10% off the total bill',
        'One free drink per month',
        'Free dessert in birthday month',
        'Half price on one Standard shisha per month'
      ]
    },
    {
      level: 'Gold',
      price: 2000, // £20.00
      iconClass: 'from-yellow-600 to-yellow-400',
      benefits: [
        '20% off the total bill',
        'Priority reservations',
        'VIP seating when available',
        'Exclusive flavour access',
        'Half price entry to exclusive events',
        'One free drink per month',
        'Birthday Package: Free shisha & dessert',
        'Half price on one Premium shisha per month'
      ]
    },
    {
      level: 'Sapphire',
      price: 3000, // £30.00
      iconClass: 'from-blue-600 to-blue-400',
      benefits: [
        '30% off the total bill',
        'Guaranteed VIP seating',
        'Skip-the-queue privilege',
        'Exclusive flavours & premium lines',
        'Half price entry to exclusive events',
        'Bring a friend for free (once per month)',
        'One free drink per month',
        'Birthday Package: Free shisha & dessert',
        'Half price on two Premium shishas per month'
      ]
    }
  ];

  const handleSubscription = async (tier: TierBenefit) => {
    setProcessingTier(tier.level);
    setErrorTier(null);
    const result = await processPayment(tier.price);
    if (result.success) {
      setSuccessTier({ level: tier.level, iconClass: tier.iconClass });
    } else {
      setErrorTier(tier.level);
    }
    setProcessingTier(null);
  };

  return (
    <div className="min-h-screen bg-[#020B18] pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 leading-normal pb-1">
            Loyalty Scheme
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-base mb-2">
            Join our exclusive membership scheme and enjoy premium benefits every month
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.level}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-dark-800/50 rounded-xl p-4 border border-dark-700/50 hover:border-primary-500/50 transition-colors flex flex-col h-full"
            >
              <div>
                <div className="flex items-center space-x-4 mb-3">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${tier.iconClass} shadow-lg ring-2 ring-opacity-50 ${
                    tier.level === 'Silver' ? 'ring-gray-400' : 
                    tier.level === 'Gold' ? 'ring-yellow-500' : 
                    'ring-blue-500'
                  }`}>
                    {tier.level === 'Silver' && <Award className="w-6 h-6 text-white" />}
                    {tier.level === 'Gold' && <Crown className="w-6 h-6 text-white" />}
                    {tier.level === 'Sapphire' && <Zap className="w-6 h-6 text-white" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{tier.level}</h3>
                    <div className="flex items-baseline">
                      <span className="text-xl font-bold text-primary-400">£{(tier.price / 100).toFixed(2)}</span>
                      <span className="text-gray-400 text-sm ml-1">per month</span>
                    </div>
                  </div>
                </div>
                <div className="h-px bg-dark-700/50 mb-3"></div>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start text-gray-300 text-sm">
                      <Check className="w-4 h-4 mr-2 text-primary-400 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-4">
                <button
                  className="w-full bg-gradient-to-r from-primary-400 to-accent-500 py-3 rounded-md font-semibold hover:from-primary-500 hover:to-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 transition-all text-white shadow-lg disabled:opacity-50"
                  onClick={() => handleSubscription(tier)}
                  disabled={processingTier === tier.level}
                >
                  {processingTier === tier.level ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Processing...
                    </span>
                  ) : (
                    'Subscribe Now'
                  )}
                </button>
                {errorTier === tier.level && (
                  <div className="mt-2 text-red-500 text-sm text-center">
                    Payment declined. Please try again.
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-dark-800/50 rounded-xl p-4 border border-dark-700/50 hover:border-primary-500/50 transition-colors"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                <Gift className="w-5 h-5 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Membership Benefits</h3>
            </div>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-primary-400 flex-shrink-0" />
                <span>Monthly free shisha sessions</span>
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-primary-400 flex-shrink-0" />
                <span>Discounts on all menu items</span>
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-primary-400 flex-shrink-0" />
                <span>Priority reservations & seating</span>
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-primary-400 flex-shrink-0" />
                <span>Access to exclusive events</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-dark-800/50 rounded-xl p-4 border border-dark-700/50 hover:border-primary-500/50 transition-colors"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                <Award className="w-5 h-5 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">How It Works</h3>
            </div>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start">
                <Check className="w-4 h-4 mr-2 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Choose your preferred membership tier</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 mr-2 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Subscribe with monthly automatic payments</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 mr-2 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Receive your membership card (digital & physical)</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 mr-2 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Present your card to enjoy benefits</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
      {successTier && (
        <SubscriptionSuccess
          isOpen={true}
          onClose={() => setSuccessTier(null)}
          tier={successTier}
        />
      )}
    </div>
  );
};

export default Loyalty;