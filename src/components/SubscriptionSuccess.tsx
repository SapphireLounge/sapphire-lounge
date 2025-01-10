import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, CreditCard, Gift, CalendarClock } from 'lucide-react';

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
  const hasCalledOnLoad = useRef(false);

  useEffect(() => {
    const icon = iconRef.current;
    if (icon && onLoad && !hasCalledOnLoad.current) {
      const rect = icon.getBoundingClientRect();
      onLoad(rect);
      hasCalledOnLoad.current = true;
    }
  }, [onLoad]);

  return <CheckCircle2 ref={iconRef} className={className} />;
};

const SubscriptionSuccess: React.FC<SubscriptionSuccessProps> = ({ isOpen, onClose, tier, onSuccessIconLoad }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Create new audio instance only if we don't have one
      if (!audioRef.current) {
        audioRef.current = new Audio('/sounds/Ta-Da Trumpet Sound Effect.mp3');
      }
      
      // Reset and play
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      
      // Handle the play promise
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Ignore abort errors since they're expected when quickly switching states
          if (error.name !== 'AbortError') {
            console.log('Audio playback failed:', error);
          }
        });
      }
    }

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, [isOpen]);

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
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", duration: 0.15 }}
            className="bg-[#050D1A] rounded-xl p-6 max-w-md w-full relative z-10 border border-dark-700 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <SuccessIcon 
                  className="w-16 h-16 text-green-500"
                  onLoad={handleIconLoad}
                />
              </div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="text-2xl font-bold text-white mb-2"
              >
                Welcome to {tier.level}!
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="text-gray-200"
              >
                Your subscription has been confirmed
              </motion.p>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
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
              transition={{ delay: 0.1 }}
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
