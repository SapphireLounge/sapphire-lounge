import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from './ui/FormInput';
import { handleNewsletterSubscription } from '@/lib/handlers';

const newsletterSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const NewsletterSuccessModal = ({ isOpen, onClose, message }: { isOpen: boolean; onClose: () => void; message: string }) => {
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
            className="bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 rounded-lg shadow-xl relative z-10 max-w-md w-full border border-neutral-700"
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 mb-4">
                <Mail className="h-6 w-6 text-green-500" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Subscription Successful!
              </h3>
              <p className="text-neutral-300 mb-4">
                {message}
              </p>
              <button
                onClick={onClose}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-neutral-700 hover:bg-neutral-600 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export function Newsletter() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema)
  });

  const onSubmit = async (data: NewsletterFormData) => {
    const result = await handleNewsletterSubscription(data.email);
    
    if (result.success) {
      setSuccessMessage(result.data.message);
      setShowSuccessModal(true);
      reset();
    }
  };

  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
            Stay Updated
          </h2>
          <p className="text-gray-300 mb-8">
            Subscribe to our newsletter for exclusive offers, events, and the latest updates.
          </p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <FormInput
                  placeholder="Enter your email"
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                  icon={<Mail className="w-4 h-4 text-gray-400" />}
                  className="w-full px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent hover:border-neutral-600 transition-colors"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-primary-400 to-accent-500 text-white rounded-lg 
                       font-semibold hover:from-primary-500 hover:to-accent-600 transition-all shadow-lg whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <NewsletterSuccessModal 
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
      />
    </section>
  );
}
