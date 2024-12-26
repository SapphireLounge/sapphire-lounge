import React, { useEffect, useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, CreditCard, Gift, CalendarClock, Check } from 'lucide-react';
import ReactConfetti from 'react-confetti';

interface SubscriptionSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  tier: {
    level: string;
    iconClass: string;
  };
  onSuccessIconLoad?: (x: number, y: number) => void;
}

const SuccessIcon = ({ className, onLoad }: { className?: string; onLoad?: (rect: DOMRect) => void }) => {
  const iconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const icon = iconRef.current;
    if (icon && onLoad) {
      const rect = icon.getBoundingClientRect();
      onLoad(rect);
    }
  }, []); // Run only once on mount

  return <CheckCircle2 ref={iconRef} className={className} />;
};

const SubscriptionSuccess: React.FC<SubscriptionSuccessProps> = ({ isOpen, onClose, tier, onSuccessIconLoad }) => {
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

  const handleIconLoad = useCallback((rect: DOMRect) => {
    onSuccessIconLoad?.(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }, [onSuccessIconLoad]);

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
    } else {
      setShowConfetti(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-sm bg-dark-900 rounded-lg shadow-xl p-4 mx-auto my-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center text-center">
              <motion.div 
                className="relative mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-white" />
                </div>
                {showConfetti && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <ReactConfetti
                      width={window.innerWidth}
                      height={window.innerHeight}
                      recycle={false}
                      numberOfPieces={200}
                      gravity={0.3}
                      initialPosition={{ x: window.innerWidth / 2, y: 0 }}
                    />
                  </div>
                )}
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Welcome to {tier.level}!</h2>
              <p className="text-gray-400">Your subscription has been confirmed</p>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start p-3 bg-dark-800 rounded-lg"
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-dark-700 rounded-full text-primary-300">
                    {step.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <p className="text-sm text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full mt-6 py-3 px-6 bg-gradient-to-r from-primary-500 to-accent-500 
                       text-white font-semibold rounded-lg shadow-lg hover:from-primary-600 
                       hover:to-accent-600 transition-all"
            >
              Start Exploring
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionSuccess;
