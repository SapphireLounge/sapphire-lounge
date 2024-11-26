import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Gift, Award, Zap, Check } from 'lucide-react';

function Loyalty() {
  const tiers = [
    {
      level: 'Silver',
      price: '£10',
      benefits: [
        '10% off all menu items',
        'One free shisha per month',
        'Priority seating',
        'Access to exclusive events'
      ]
    },
    {
      level: 'Gold',
      price: '£15',
      benefits: [
        '15% off all menu items',
        'Two free shishas per month',
        'Priority reservations',
        'VIP seating when available',
        'Exclusive flavour access',
        'Access to exclusive events'
      ]
    },
    {
      level: 'Platinum',
      price: '£20',
      benefits: [
        '20% off all menu items',
        'Three free shishas per month',
        'Guaranteed VIP seating',
        'Skip-the-queue privilege',
        'Exclusive flavours & premium lines',
        'Access to exclusive events',
        'Bring a friend for free (once per month)'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#020B18] pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-3">
            <span className="inline-block bg-gradient-to-r from-primary-500 via-primary-400 to-accent-500 text-transparent bg-clip-text leading-tight tracking-normal">
              Loyalty Scheme
            </span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
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
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                    <Crown className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{tier.level}</h3>
                    <div className="flex items-baseline">
                      <span className="text-xl font-bold text-primary-400">{tier.price}</span>
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
                <button className="w-full px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600 transition-all text-sm">
                  Subscribe Now
                </button>
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
    </div>
  );
}

export default Loyalty;