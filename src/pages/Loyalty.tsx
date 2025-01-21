import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Award, Crown, Zap, Check, Phone, Mail, Clock } from 'lucide-react';
import { usePayment } from '../hooks/usePayment';
import ReactConfetti from 'react-confetti';
import SubscriptionSuccess from '../components/SubscriptionSuccess';
import { PaymentMethodSelector } from '../components/PaymentMethodSelector';
import toast from 'react-hot-toast';

interface TierBenefit {
  level: string;
  price: number;
  iconClass: string;
  benefits: string[];
  stripeId?: string;
  paypalId?: string;
}

const Loyalty: React.FC = () => {
  usePayment();
  const [successTier, setSuccessTier] = useState<{ level: string; iconClass: string } | null>(null);
  const [subscribedTiers, setSubscribedTiers] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPosition, setConfettiPosition] = useState({ x: 0, y: 0 });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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
      stripeId: 'price_silver_monthly',
      paypalId: 'P-SILVER_PLAN',
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
      stripeId: 'price_gold_monthly',
      paypalId: 'P-GOLD_PLAN',
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
      stripeId: 'price_sapphire_monthly',
      paypalId: 'P-SAPPHIRE_PLAN',
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

  const handleSubscribe = async (tier: TierBenefit) => {
    if (subscribedTiers.includes(tier.level)) return;
    
    // Reset states
    setShowConfetti(false);
    setSuccessTier(null);
    setIsSuccessModalOpen(false);

    try {
      // Get the appropriate payment ID based on selected method
      const paymentId = selectedPaymentMethod === 'stripe' ? tier.stripeId : tier.paypalId;
      
      if (!paymentId) {
        toast.error('Payment method not configured for this tier');
        return;
      }

      // Show processing state
      toast.loading('Processing payment...', { id: 'payment-processing' });

      // Simulate payment processing with the selected method
      const paymentResult = await new Promise<boolean>((resolve) => {
        setTimeout(() => {
          // Dismiss the loading toast
          toast.dismiss('payment-processing');
          resolve(Math.random() < 0.5);
        }, 1000);
      });

      if (paymentResult) {
        // Payment successful - only show success UI after payment confirms
        setSuccessTier({ level: tier.level, iconClass: tier.iconClass });
        setIsSuccessModalOpen(true);
        setSubscribedTiers([...subscribedTiers, tier.level]);
        toast.success(`Successfully subscribed to ${tier.level} tier!`);
      } else {
        // Payment failed - clear all success states
        setSuccessTier(null);
        setIsSuccessModalOpen(false);
        toast.error(`Payment failed for ${tier.level} tier. Please try again or use a different payment method.`);
      }
    } catch (error) {
      // Error in payment process - clear all success states
      setSuccessTier(null);
      setIsSuccessModalOpen(false);
      console.error('Payment error:', error);
      toast.error('An error occurred during payment. Please try again later.');
    }
  };

  const handleSuccessIconLoad = useCallback((x: number, y: number) => {
    setConfettiPosition({ x, y });
    setShowConfetti(true);
  }, []);

  // Handle cleanup of confetti
  useEffect(() => {
    if (!isSuccessModalOpen) {
      setShowConfetti(false);
      setSuccessTier(null);
    }
  }, [isSuccessModalOpen]);

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

  const getButtonContent = (tier: TierBenefit) => {
    if (subscribedTiers.includes(tier.level)) {
      return (
        <motion.span 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Subscribed!
        </motion.span>
      );
    }
    if (successTier?.level === tier.level) return 'Processing...';
    return 'Subscribe Now';
  };

  const getButtonStyles = (tier: TierBenefit) => {
    if (subscribedTiers.includes(tier.level)) {
      return "mt-6 w-full bg-green-500 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg cursor-default";
    }
    return "mt-6 w-full bg-gradient-to-r from-primary-400 to-accent-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-500 hover:to-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 transition-all shadow-lg";
  };

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
        {successTier && (
          <SubscriptionSuccess
            isOpen={isSuccessModalOpen}
            onClose={() => setIsSuccessModalOpen(false)}
            tier={successTier}
            onSuccessIconLoad={handleSuccessIconLoad}
          />
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 px-4 py-2">
            Loyalty Program
          </h1>
          <p className="text-gray-400 text-sm md:text-lg">
            Join our loyalty program and enjoy exclusive benefits
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.level}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`
                relative flex flex-col items-center
                bg-gray-800/50 backdrop-blur-sm
                rounded-lg shadow-xl overflow-hidden
                pt-8 md:pt-8 pb-4 md:pb-6 px-4 md:px-6
                border border-gray-700/50
              `}
            >
              {/* Tier Header */}
              <div className="text-center mb-2 md:mb-4">
                <div className="flex flex-col items-center mb-2 md:mb-4">
                  <div
                    className={`flex items-center justify-center w-20 md:w-20 h-20 md:h-20 rounded-full shadow-lg ring-2 ring-opacity-50 ${
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
                        <Award className="w-10 md:w-10 h-10 md:h-10 text-gray-200 drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]" />
                      )}
                      {tier.level === 'Gold' && (
                        <Zap className="w-10 md:w-10 h-10 md:h-10 text-yellow-200 drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]" />
                      )}
                      {tier.level === 'Sapphire' && (
                        <Crown className="w-10 md:w-10 h-10 md:h-10 text-sky-200 drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]" />
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mt-2 md:mt-3">{tier.level}</h3>
                  <div className="mt-1 md:mt-2 flex flex-col items-center">
                    <span className="text-xl md:text-2xl font-bold text-primary-400">£{(tier.price / 100).toFixed(2)}</span>
                    <span className="text-sm text-gray-400">per month</span>
                  </div>
                </div>
              </div>

              {/* Benefits List */}
              <ul className="space-y-2 md:space-y-2 mb-3 md:mb-4 text-sm md:text-sm flex-grow px-2">
                {tier.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex justify-center">
                    <div className="flex items-start gap-2 w-fit">
                      <Check className="w-4 md:w-4 h-4 md:h-4 text-primary-400 flex-shrink-0 mt-[2px]" />
                      <span className="text-gray-300 text-center">{benefit}</span>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Subscribe Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSubscribe(tier)}
                disabled={subscribedTiers.includes(tier.level)}
                className={`${getButtonStyles(tier)} text-base md:text-base py-2.5 md:py-3 mx-auto w-[90%]`}
              >
                {getButtonContent(tier)}
              </motion.button>

            </motion.div>
          ))}
        </div>

        {/* Payment Method Selector */}
        <div className="text-center mt-4 md:mt-8">
          <PaymentMethodSelector
            selectedMethod={selectedPaymentMethod}
            onSelectMethod={(method) => setSelectedPaymentMethod(method)}
          />
        </div>

        {/* Additional Information and Need Help Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 mt-4 md:mt-8">
          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-dark-900/50 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-accent-700/20"
          >
            <h3 className="text-xl md:text-xl font-semibold text-white mb-3 md:mb-4">Additional Information</h3>
            <ul className="space-y-2 md:space-y-2 text-sm md:text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>All memberships are billed monthly and can be cancelled at any time</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Benefits reset at the beginning of each month</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Birthday benefits must be claimed within your birthday month</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Discounts cannot be combined with other promotional offers</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Benefits are non-transferable and cannot be carried over to the next month</span>
              </li>
            </ul>
          </motion.div>

          {/* Need Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-dark-900/50 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-accent-700/20"
          >
            <h3 className="text-xl md:text-xl font-semibold text-white mb-3 md:mb-4">Need Help?</h3>
            <ul className="space-y-2 md:space-y-2 text-sm md:text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Call us at 01792 555888</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Email us at info@sapphirelounge.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Business hours: 1:00 PM - 2:00 AM (Closed on Mondays)</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Loyalty;