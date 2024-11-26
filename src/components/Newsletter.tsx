import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { handleFormSubmission } from '../lib/form-handler';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await handleFormSubmission('newsletter', { email });
      if (response.success) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="py-12 bg-[#020B18]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 pb-0.5">
            Stay Updated
          </h2>
          <p className="text-gray-400 mb-8">
            Subscribe to our newsletter for exclusive offers and updates.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 bg-dark-500 border border-accent-700/20 rounded-lg focus:outline-none focus:border-primary-300 text-gray-200 placeholder-gray-500"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === 'loading'}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                status === 'loading'
                  ? 'bg-primary-400/50 cursor-wait'
                  : status === 'success'
                  ? 'bg-green-500'
                  : status === 'error'
                  ? 'bg-red-500'
                  : 'bg-primary-400 hover:bg-primary-500'
              }`}
            >
              {status === 'loading' ? 'Subscribing...' : 
               status === 'success' ? 'Subscribed!' : 
               status === 'error' ? 'Try Again' :
               'Subscribe'}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}
