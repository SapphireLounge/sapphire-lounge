import React from 'react';
import { motion } from 'framer-motion';

function FAQ() {
  const faqs = [
    {
      question: "What is the minimum age requirement?",
      answer: "You must be 18 or older to enter Sapphire Lounge and enjoy our shisha services. Valid ID is required for entry."
    },
    {
      question: "Do you take reservations?",
      answer: "Yes, we highly recommend making reservations, especially for weekends and special events. You can book through our website or call us directly."
    },
    {
      question: "What types of shisha/hookah do you offer?",
      answer: "We offer a wide variety of non-tobacco & nicotine-free flavours, including traditional and modern blends. Our menu includes both standard and premium flavours with options to add extras like an Ice Base, Large Head or an Additional Flavour."
    },
    {
      question: "How long is a typical shisha session?",
      answer: "A standard session typically last between 2 - 3 hours. You can extend your stay to take advantage of the social setting & atmosphere. But if we have large group bookings, we may ask you to vacate your seat for them."
    },
    {
      question: "Do you serve food and drinks?",
      answer: "Yes, we offer a selection of hot and cold beverages, light snacks, and desserts to complement your shisha experience."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards and cash payments. Some special events may require advance payment."
    },
    {
      question: "Is there a dress code?",
      answer: "No, we want to be able to welcome everyone. So our dress code is open to casual & smart wear"
    },
    {
      question: "Can I bring my own shisha/tobacco?",
      answer: "No, for quality control and safety reasons, we only use our own premium shisha products and equipment."
    },
    {
      question: "Do you have outdoor seating?",
      answer: "Yes, we have a comfortable outdoor seating area with heating for cooler evenings."
    },
    {
      question: "What health & safety measures do you have in place?",
      answer: "We follow all current local health guidelines, including regular sanitization of equipment, cleanliness of premises, and staff health monitoring."
    }
  ];

  return (
    <div className="min-h-screen bg-[#020B18] pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">Frequently Asked Questions</h1>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-dark-900/50 backdrop-blur-sm rounded-lg p-6 border border-accent-700/20"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default FAQ;
