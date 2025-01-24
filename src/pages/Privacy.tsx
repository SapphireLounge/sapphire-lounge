import React from 'react';
import { motion } from 'framer-motion';

function Privacy() {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#020B18]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm md:text-lg max-w-3xl mx-auto">
            Learn about how we protect and handle your information.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto px-4"
        >
          <div className="space-y-6 text-gray-300">
            <section className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-colors hover:bg-black/50">
              <h2 className="text-xl font-semibold text-white mb-4">Information We Collect</h2>
              <p className="mb-3">When you visit Sapphire Lounge or use our services, we may collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal identification information (name, phone number, email address)</li>
                <li>Contact information for reservations and membership</li>
                <li>Payment information for transactions</li>
                <li>Preferences and feedback about our services</li>
              </ul>
            </section>

            <section className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-colors hover:bg-black/50">
              <h2 className="text-xl font-semibold text-white mb-4">How We Use Your Information</h2>
              <p className="mb-3">We use the collected information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and confirm your reservations</li>
                <li>Verify your age and identity as required by law</li>
                <li>Send you promotional offers and updates (with your consent)</li>
                <li>Improve our services and customer experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-colors hover:bg-black/50">
              <h2 className="text-xl font-semibold text-white mb-4">Data Security</h2>
              <p className="mb-3">
                We implement appropriate security measures to protect your personal information from unauthorized access,
                alteration, disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Secure storage of personal data</li>
                <li>Encrypted payment processing</li>
                <li>Regular security assessments</li>
                <li>Staff training on data protection</li>
              </ul>
            </section>

            <section className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-colors hover:bg-black/50">
              <h2 className="text-xl font-semibold text-white mb-4">Marketing Communications</h2>
              <p className="mb-3">
                With your permission, we may send you marketing communications about our services, events, and special offers.
                You can opt out of these communications at any time through:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Unsubscribe links in our emails</li>
                <li>Contacting our customer service</li>
                <li>Updating your preferences in your account settings</li>
              </ul>
            </section>

            <section className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-colors hover:bg-black/50">
              <h2 className="text-xl font-semibold text-white mb-4">Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent for marketing communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </section>

            <section className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-colors hover:bg-black/50">
              <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or how we handle your information, please contact us at:
              </p>
              <p className="mt-2">Email: info@sapphirelounge.com</p>
              <p>Phone: [Your Phone Number]</p>
            </section>

            <p className="text-sm text-gray-400 text-center mt-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Privacy;
