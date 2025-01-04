import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { z } from 'zod';
import { FormInput } from './ui/FormInput';
import { useFormValidation } from '../hooks/useFormValidation';

const newsletterSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const NewsletterSuccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6, delay: 0.1 }}
                className="mx-auto mb-4"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 mx-auto flex items-center justify-center">
                  <Mail className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-white mb-2"
              >
                Thanks for Subscribing!
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-200"
              >
                Welcome to Sapphire Lounge!
              </motion.p>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-300 text-center"
              >
                <p>You'll be the first to know about:</p>
                <ul className="mt-2 space-y-2">
                  <li>• Exclusive promotions and discounts</li>
                  <li>• Special events and new flavours</li>
                  <li>• Loyalty programme updates</li>
                  <li>• Sapphire Lounge news</li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6"
            >
              <button
                onClick={onClose}
                className="btn-hover-effect w-3/4 mx-auto block bg-gradient-to-r from-primary-400 to-accent-500 py-2 px-4 rounded-md font-medium hover:from-primary-500 hover:to-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 transition-all text-white shadow-lg text-sm"
              >
                Continue Exploring
              </button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { errors, validateForm, validateField } = useFormValidation<NewsletterFormData>({
    schema: newsletterSchema,
    onSuccess: async () => {
      setStatus('loading');
      
      // Show success immediately with a small delay
      setTimeout(() => {
        setStatus('success');
        setEmail('');
        setShowSuccessModal(true);
      }, 500);

      try {
        // Process in background
        await new Promise(resolve => setTimeout(resolve, 1500));
      } catch (error) {
        setStatus('error');
        setShowSuccessModal(false);
      }
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await validateForm({ email });
  };

  return (
    <section className="py-6 sm:py-12 bg-[#020B18]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 pb-0.5">
            Stay Updated
          </h2>
          <p className="text-gray-400 mb-8 text-sm sm:text-base">
            Subscribe to our newsletter for exclusive offers and updates.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6 mx-auto" style={{ maxWidth: "498px" }}>
            <div className="flex-1">
              <FormInput
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateField('email', e.target.value);
                }}
                placeholder="Enter your email"
                icon={<Mail className="w-5 h-5" />}
                error={errors.email}
                isLoading={status === 'loading'}
                disabled={status === 'loading'}
                required
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-gradient-to-r from-primary-400 to-accent-500 py-3 px-8 rounded-md font-semibold hover:from-primary-500 hover:to-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 transition-all text-white shadow-lg min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <span className="inline-flex items-center">
                  <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full text-white" role="status">
                    <span className="sr-only">Loading...</span>
                  </span>
                  <span className="ml-2">Subscribing...</span>
                </span>
              ) : (
                'Subscribe Now'
              )}
            </button>
          </form>
        </div>
      </div>
      <NewsletterSuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </section>
  );
}
