import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Award, Crown, Zap, Check, Loader2 } from 'lucide-react';
import { usePayment } from '../hooks/usePayment';
import ReactConfetti from 'react-confetti';
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
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPosition, setConfettiPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [flippedIcon, setFlippedIcon] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      
      // Provide haptic feedback when starting process
      await haptics.medium();

      const success = await processPayment(tier.price);
      
      if (success) {
        setSuccessTier({ level: tier.level, iconClass: tier.iconClass });
        setShowConfetti(true);
        // Celebration haptic feedback
        await haptics.celebrate();
        
        // Get the position of the clicked tier for confetti
        const element = document.querySelector(`[data-tier="${tier.level}"]`);
        if (element) {
          const rect = element.getBoundingClientRect();
          setConfettiPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        }
      } else {
        setErrorTier(tier.level);
        // Error haptic feedback
        await haptics.error();
      }
    } catch (error) {
      console.error('Error processing tier selection:', error);
      setErrorTier(tier.level);
      // Error haptic feedback
      await haptics.error();
    } finally {
      setProcessingTier(null);
    }
  };

  const handleIconFlip = async (level: string) => {
    await haptics.light();
    setFlippedIcon(prev => prev === level ? null : level);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showConfetti) {
      timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showConfetti]);

  return (
    <div className="min-h-screen bg-[#020B18] pt-24 pb-12">
      <Toaster position="top-center" />
      {showConfetti && successTier && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1000 }}>
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            colors={[
              successTier.level === 'Silver' ? '#C0C0C0' : 
              successTier.level === 'Gold' ? '#FFD700' : 
              '#4169E1',
              '#FFFFFF',
              successTier.level === 'Silver' ? '#A9A9A9' :
              successTier.level === 'Gold' ? '#DAA520' :
              '#1E90FF',
              successTier.level === 'Silver' ? '#E8E8E8' :
              successTier.level === 'Gold' ? '#FFF8DC' :
              '#87CEEB'
            ]}
            recycle={false}
            numberOfPieces={300}
            confettiSource={{
              x: confettiPosition.x,
              y: confettiPosition.y,
              w: 0,
              h: 0
            }}
            initialVelocityX={12}
            initialVelocityY={40}
            gravity={0.2}
            tweenDuration={100}
            wind={0.01}
            friction={0.97}
          />
        </div>
      )}
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
              className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex flex-col h-full relative overflow-hidden group"
              data-tier={tier.level}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-accent-500/5 opacity-0 
                            group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex flex-col items-center mb-6">
                  <motion.div
                    className={`flex items-center justify-center w-24 h-24 rounded-full shadow-xl
                               ${tier.level === 'Silver' 
                                ? 'bg-gradient-to-br from-gray-300 to-gray-500' 
                                : tier.level === 'Gold'
                                ? 'bg-gradient-to-br from-yellow-300 to-amber-500'
                                : 'bg-gradient-to-br from-blue-300 to-blue-500'
                               } relative overflow-hidden mb-6`}
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
                        <Award className="w-12 h-12 text-gray-800 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                      )}
                      {tier.level === 'Gold' && (
                        <Zap className="w-12 h-12 text-yellow-800 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                      )}
                      {tier.level === 'Sapphire' && (
                        <Crown className="w-12 h-12 text-blue-800 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                      )}
                    </motion.div>
                  </motion.div>

                  <h3 className={`text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r
                                ${tier.level === 'Silver'
                                  ? 'from-gray-200 via-gray-100 to-gray-300'
                                  : tier.level === 'Gold'
                                  ? 'from-yellow-300 via-yellow-200 to-yellow-400'
                                  : 'from-blue-300 via-sky-200 to-blue-400'}`}>
                    {tier.level}
                  </h3>
                  <div className="text-3xl font-bold text-[#0090DD] mb-4">
                    £{(tier.price / 100).toFixed(2)}/month
                  </div>
                  <div className="space-y-2 text-left mb-6">
                    {tier.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary-300 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTierSelection(tier)}
                    disabled={processingTier === tier.level}
                    className={`w-full py-3 rounded-lg font-semibold transition-all relative
                      ${processingTier === tier.level
                        ? 'bg-primary-500/50 cursor-not-allowed'
                        : errorTier === tier.level
                        ? 'bg-red-500/80 hover:bg-red-500'
                        : 'bg-gradient-to-r from-primary-400 to-accent-500 hover:from-primary-500 hover:to-accent-600'
                      } text-white shadow-lg`}
                  >
                    {processingTier === tier.level ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Processing...
                      </div>
                    ) : errorTier === tier.level ? (
                      'Try Again'
                    ) : (
                      'Subscribe Now'
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
            onClose={() => setSuccessTier(null)}
            tier={successTier}
            onSuccessIconLoad={() => {}}
          />
        )}
      </div>
    </div>
  );
};

export default Loyalty;