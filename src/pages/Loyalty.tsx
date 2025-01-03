import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Crown, Zap, Check, Loader2 } from 'lucide-react';
import { usePayment } from '../hooks/usePayment';
import SubscriptionSuccess from '../components/SubscriptionSuccess';
import { Toaster } from 'react-hot-toast';
import { haptics } from '../utils/haptics';

interface TierBenefit {
  level: string;
  price: number;
  iconClass: string;
  benefits: string[];
}

const Loyalty: React.FC = () => {
  const { processPayment } = usePayment();
  const [processingTier, setProcessingTier] = useState<string | null>(null);
  const [errorTier, setErrorTier] = useState<string | null>(null);
  const [successTier, setSuccessTier] = useState<{ level: string; iconClass: string } | null>(null);
  const [flippedIcon, setFlippedIcon] = useState<string | null>(null);

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

  const handleTierSelection = async (tier: TierBenefit) => {
    try {
      setProcessingTier(tier.level);
      setErrorTier(null);
      
      const success = await processPayment(tier.price);
      
      if (success) {
        setSuccessTier({ level: tier.level, iconClass: tier.iconClass });
      } else {
        setErrorTier(tier.level);
      }
    } catch (error) {
      console.error('Error processing tier selection:', error);
      setErrorTier(tier.level);
    } finally {
      setProcessingTier(null);
    }
  };

  const handleIconFlip = async (level: string) => {
    await haptics.light();
    setFlippedIcon(prev => prev === level ? null : level);
  };

  return (
    <div className="min-h-screen bg-[#020B18] pt-8 pb-12">
      <Toaster position="top-center" />
      
      <div className="container mx-auto px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
            Loyalty Scheme
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
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
              className="bg-black/40 backdrop-blur-sm rounded-xl p-5 md:p-6 border border-white/10 flex flex-col h-full relative overflow-hidden group"
              data-tier={tier.level}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-accent-500/5 opacity-0 
                            group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex flex-col items-center mb-6">
                  <motion.div
                    className={`flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full shadow-xl
                               ${tier.level === 'Silver' 
                                ? 'bg-gradient-to-br from-gray-300 to-gray-500' 
                                : tier.level === 'Gold'
                                ? 'bg-gradient-to-br from-yellow-300 to-amber-500'
                                : 'bg-gradient-to-br from-blue-300 to-blue-500'
                               } relative overflow-hidden mb-5 md:mb-6`}
                  >
                    {/* Glitter overlay */}
                    <div 
                      className="absolute inset-0 animate-shimmer mix-blend-overlay"
                      style={{
                        backgroundImage: 'url(/images/glitter-texture.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.7,
                      }}
                    />
                    {/* Additional shine effect */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/20 animate-pulse"
                      style={{
                        mixBlendMode: 'overlay'
                      }}
                    />
                    
                    {/* Icon */}
                    <motion.div
                      animate={{ 
                        rotateY: flippedIcon === tier.level ? 180 : 0 
                      }}
                      transition={{ 
                        duration: 1,
                        ease: [0.6, 0.01, -0.05, 0.95]
                      }}
                      onClick={() => handleIconFlip(tier.level)}
                      className="relative z-10 cursor-pointer"
                    >
                      {tier.level === 'Silver' && (
                        <Award className="w-10 h-10 md:w-12 md:h-12 text-gray-800 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                      )}
                      {tier.level === 'Gold' && (
                        <Zap className="w-10 h-10 md:w-12 md:h-12 text-yellow-800 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                      )}
                      {tier.level === 'Sapphire' && (
                        <Crown className="w-10 h-10 md:w-12 md:h-12 text-blue-800 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                      )}
                    </motion.div>
                  </motion.div>

                  <h3 className={`text-xl md:text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r
                                ${tier.level === 'Silver'
                                  ? 'from-gray-200 via-gray-100 to-gray-300'
                                  : tier.level === 'Gold'
                                  ? 'from-yellow-300 via-yellow-200 to-yellow-400'
                                  : 'from-blue-300 via-sky-200 to-blue-400'}`}>
                    {tier.level}
                  </h3>
                  <div className="text-2xl md:text-3xl font-bold text-[#0090DD] mb-3 md:mb-4">
                    £{(tier.price / 100).toFixed(2)}/month
                  </div>
                  <div className="space-y-2 text-left mb-5 md:mb-6">
                    {tier.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4.5 h-4.5 md:w-5 md:h-5 text-primary-300 mt-0.5 flex-shrink-0" />
                        <span className="text-base text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTierSelection(tier)}
                    disabled={processingTier === tier.level}
                    className={`w-full py-3 px-6 rounded-lg font-semibold shadow-lg transition-all
                      ${successTier?.level === tier.level
                        ? 'bg-green-500 hover:bg-green-600 text-white cursor-default'
                        : errorTier === tier.level
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white'
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {processingTier === tier.level ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Processing...
                      </div>
                    ) : successTier?.level === tier.level ? (
                      <div className="flex items-center justify-center">
                        <Check className="w-5 h-5 mr-2" />
                        Success!
                      </div>
                    ) : errorTier === tier.level ? (
                      "Try Again"
                    ) : (
                      "Subscribe Now"
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Additional Information</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Check className="w-5 h-5 text-primary-300" />
              </div>
              <p className="text-gray-300">All memberships are billed monthly and can be cancelled at any time</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Check className="w-5 h-5 text-primary-300" />
              </div>
              <p className="text-gray-300">Benefits reset at the beginning of each month</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Check className="w-5 h-5 text-primary-300" />
              </div>
              <p className="text-gray-300">Birthday benefits must be claimed within your birthday month</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Check className="w-5 h-5 text-primary-300" />
              </div>
              <p className="text-gray-300">Discounts cannot be combined with other promotional offers</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Check className="w-5 h-5 text-primary-300" />
              </div>
              <p className="text-gray-300">Benefits are non-transferable and cannot be carried over to the next month</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Check className="w-5 h-5 text-primary-300" />
              </div>
              <p className="text-gray-300">All memberships are valid for 12 months from the date of subscription</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Check className="w-5 h-5 text-primary-300" />
              </div>
              <p className="text-gray-300">Members can upgrade their tier at any time, with price differences prorated based on remaining duration</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Check className="w-5 h-5 text-primary-300" />
              </div>
              <p className="text-gray-300">Valid ID and membership card must be presented to redeem benefits</p>
            </div>
          </div>
        </motion.div>

        {/* Need Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/10"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Need Help?</h2>
          <p className="text-gray-300">
            If you have any questions about our loyalty scheme or need assistance, please don't hesitate to contact our team. We're here to help you make the most of your membership benefits.
          </p>
        </motion.div>

        {successTier && (
          <SubscriptionSuccess
            isOpen={!!successTier}
            onClose={() => {
              setSuccessTier(null);
            }}
            tier={successTier || { level: '', iconClass: '' }}
          />
        )}
      </div>
    </div>
  );
};

export default Loyalty;