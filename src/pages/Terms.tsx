import React from 'react';
import { motion } from 'framer-motion';

function Terms() {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#020B18]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
            Terms of Service
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Our terms and conditions for using Sapphire Lounge services.
          </p>
        </motion.div>

        <div className="space-y-6 text-gray-300">
          <section className="bg-dark-900/50 backdrop-blur-sm rounded-lg p-6 border border-accent-700/20">
            <h2 className="text-xl font-semibold text-white mb-4">Age Requirement and Verification</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All guests must be 18 years or older to enter the premises and use our services</li>
              <li>Valid government-issued photo ID is required for entry</li>
              <li>We reserve the right to refuse service to anyone who cannot provide valid identification</li>
            </ul>
          </section>

          <section className="bg-dark-900/50 backdrop-blur-sm rounded-lg p-6 border border-accent-700/20">
            <h2 className="text-xl font-semibold text-white mb-4">Reservations and Cancellations</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Reservations are recommended but not always required</li>
              <li>Cancellations must be made at least 24 hours in advance</li>
              <li>No-shows may result in a cancellation fee</li>
              <li>We reserve the right to release reserved tables after 15 minutes of delay without notice</li>
            </ul>
          </section>

          <section className="bg-dark-900/50 backdrop-blur-sm rounded-lg p-6 border border-accent-700/20">
            <h2 className="text-xl font-semibold text-white mb-4">House Rules and Conduct</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Casual or Smart dress code is welcomed without any enforcement</li>
              <li>Respectful behavior towards staff and other guests is required</li>
              <li>No outside food, drinks, or shisha products allowed</li>
              <li>Management reserves the right to refuse service or ask guests to leave</li>
              <li>No smoking of cigarettes or other tobacco products inside the lounge</li>
            </ul>
          </section>

          <section className="bg-dark-900/50 backdrop-blur-sm rounded-lg p-6 border border-accent-700/20">
            <h2 className="text-xl font-semibold text-white mb-4">Payment and Pricing</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All prices are inclusive of VAT</li>
              <li>We accept major credit/debit cards and cash</li>
              <li>Minimum spend requirements may apply to certain areas or during events</li>
              <li>No service charges on any of our products or services</li>
            </ul>
          </section>

          <section className="bg-dark-900/50 backdrop-blur-sm rounded-lg p-6 border border-accent-700/20">
            <h2 className="text-xl font-semibold text-white mb-4">Health and Safety</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Shisha smoking, like any form of smoking, carries health risks</li>
              <li>Pregnant women and individuals with respiratory conditions should consult their doctor</li>
              <li>We maintain strict hygiene standards for all equipment</li>
              <li>Emergency exits and procedures are clearly marked</li>
            </ul>
          </section>

          <section className="bg-dark-900/50 backdrop-blur-sm rounded-lg p-6 border border-accent-700/20">
            <h2 className="text-xl font-semibold text-white mb-4">Liability</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Sapphire Lounge is not liable for personal belongings</li>
              <li>Customers are responsible for any damage to lounge property</li>
              <li>We maintain appropriate insurance coverage for our operations</li>
              <li>By using our services, customers accept these terms and conditions</li>
            </ul>
          </section>

          <section className="bg-dark-900/50 backdrop-blur-sm rounded-lg p-6 border border-accent-700/20">
            <h2 className="text-xl font-semibold text-white mb-4">Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be posted on our website and in our
              establishment. Continued use of our services after changes constitutes acceptance of new terms.
            </p>
          </section>

          <p className="text-sm text-gray-400 text-center mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Terms;
