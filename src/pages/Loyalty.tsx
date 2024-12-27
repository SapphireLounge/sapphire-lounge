import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Award, Crown, Zap, Check } from 'lucide-react';
import { usePayment } from '../hooks/usePayment';
import ReactConfetti from 'react-confetti';
import SubscriptionSuccess from '../components/SubscriptionSuccess';

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

  const handleSuccessIconLoad = useCallback((x: number, y: number) => {
    setConfettiPosition({ x, y });
    setShowConfetti(true);
  }, []);

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
      {showConfetti && successTier && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1000 }}>
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            colors={[
              successTier.level === 'Silver' ? '#C0C0C0' : 
              successTier.level === 'Gold' ? '#FFD700' : 
              '#4169E1', // Sapphire blue
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
                <div className="flex flex-col items-center mb-6">
                  <div
                    className={`flex items-center justify-center w-20 h-20 rounded-full shadow-lg ring-2 ring-opacity-50 ${
                      tier.level === 'Silver' ? 'ring-gray-400 bg-gradient-to-br from-gray-400 via-gray-200 to-gray-600' : 
                      tier.level === 'Gold' ? 'ring-yellow-500 bg-gradient-to-br from-yellow-600 via-yellow-300 to-yellow-800' : 
                      'ring-blue-500 bg-gradient-to-br from-blue-500 via-sky-400 to-blue-800'
                    } relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30"></div>
                    <div 
                      className="absolute inset-0 animate-shimmer"
                      style={{
                        background: `linear-gradient(90deg, 
                          transparent 0%,
                          rgba(255, 255, 255, 0.95) 10%,
                          transparent 30%
                        )`,
                        width: '150%',
                        height: '150%',
                        top: '-25%',
                        left: '-25%',
                        zIndex: 2,
                        transformOrigin: 'center center'
                      }}
                    />
                    <div className="relative z-10">
                      {tier.level === 'Silver' && (
                        <Award className="w-10 h-10 text-gray-200 drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]" />
                      )}
                      {tier.level === 'Gold' && (
                        <Zap className="w-10 h-10 text-yellow-200 drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]" />
                      )}
                      {tier.level === 'Sapphire' && (
                        <Crown className="w-10 h-10 text-sky-200 drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]" />
                      )}
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mt-4">{tier.level}</h3>
                  <div className="mt-2 flex flex-col items-center">
                    <span className="text-2xl font-bold text-primary-400">£{(tier.price / 100).toFixed(2)}</span>
                    <span className="text-sm text-gray-400">per month</span>
                  </div>
                </div>
                <div className="h-px bg-dark-700/50 mb-3"></div>
                <ul className="space-y-2 flex flex-col items-center">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-gray-300 text-sm">
                      <Check size={16} className="mr-2 text-primary-400 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSubscription(tier)}
                  disabled={processingTier === tier.level}
                  className={`w-full py-3 rounded-lg font-semibold transition-all text-white shadow-lg ${
                    processingTier === tier.level
                      ? 'bg-gray-600 cursor-not-allowed'
                      : `bg-gradient-to-r from-primary-400 to-accent-500 hover:from-primary-500 hover:to-accent-600`
                  }`}
                >
                  {processingTier === tier.level ? (
                    <span className="flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Processing...
                    </span>
                  ) : (
                    'Subscribe Now'
                  )}
                </motion.button>
                {errorTier === tier.level && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    Payment failed. Please try again.
                  </motion.p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-16">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-900/50 backdrop-blur-sm rounded-lg p-6 border border-accent-700/20"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Additional Information</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <Check className="w-4 h-4 mr-2 text-primary-400 flex-shrink-0 mt-1" />
                  <span>All memberships are billed monthly and can be cancelled at any time</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 mr-2 text-primary-400 flex-shrink-0 mt-1" />
                  <span>Benefits reset at the beginning of each month</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 mr-2 text-primary-400 flex-shrink-0 mt-1" />
                  <span>Birthday benefits must be claimed within your birthday month</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 mr-2 text-primary-400 flex-shrink-0 mt-1" />
                  <span>Discounts cannot be combined with other promotional offers</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 mr-2 text-primary-400 flex-shrink-0 mt-1" />
                  <span>Benefits are non-transferable and cannot be carried over to the next month</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-900/50 backdrop-blur-sm rounded-lg p-6 border border-accent-700/20"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Need Help?</h2>
              <p className="text-gray-300">
                If you have any questions about our loyalty scheme or need assistance, please don't hesitate to contact our team. 
                We're here to help you make the most of your membership benefits.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      {successTier && (
        <SubscriptionSuccess
          isOpen={true}
          onClose={() => {
            setSuccessTier(null);
            setShowConfetti(false);
          }}
          tier={successTier}
          onSuccessIconLoad={handleSuccessIconLoad}
        />
      )}
    </div>
  );
};

export default Loyalty;