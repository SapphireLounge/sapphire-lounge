import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useDeviceType } from '../hooks/useDeviceType';

function Terms() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  const terms = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using Sapphire Lounge's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services."
    },
    {
      title: "2. Age Requirement",
      content: "You must be at least 18 years of age to use our services. By using our services, you represent and warrant that you are at least 18 years old."
    },
    {
      title: "3. Reservation Policy",
      content: "Reservations are subject to availability. We reserve the right to cancel or modify reservations at our discretion. No-shows may result in future booking restrictions."
    },
    {
      title: "4. Code of Conduct",
      content: "Users must maintain appropriate behavior while using our services. We reserve the right to refuse service to anyone displaying disruptive or inappropriate behavior."
    },
    {
      title: "5. Payment Terms",
      content: "All prices are in local currency and include applicable taxes. Payment is required at the time of service. We accept major credit cards and cash payments."
    },
    {
      title: "6. Cancellation Policy",
      content: "Cancellations must be made at least 24 hours in advance. Late cancellations may incur charges. Special events may have different cancellation policies."
    },
    {
      title: "7. Health & Safety",
      content: "Users must comply with all health and safety guidelines. We reserve the right to modify our health protocols based on current regulations and best practices."
    },
    {
      title: "8. Liability",
      content: "Sapphire Lounge is not liable for any personal injury or property damage occurring on our premises, except where required by law."
    },
    {
      title: "9. Modifications to Terms",
      content: "We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of modified terms."
    }
  ];

  const handleTermClick = (index: number) => {
    if (isMobile) {
      setExpandedIndex(expandedIndex === index ? null : index);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-12 bg-[#020B18]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-4"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 px-2 md:px-6 py-1 md:py-2">
            Terms of Service
          </h1>
          <p className="text-white text-base md:text-xl max-w-3xl mx-auto mb-12">
            Please read these terms carefully before using our services
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="max-w-5xl mx-auto">
            <div className="space-y-4 md:space-y-6">
              {terms.map((term, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: isMobile ? 0.2 : 0.5, 
                    delay: isMobile ? index * 0.05 : index * 0.1 
                  }}
                  className={`bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 transition-colors hover:bg-black/50 ${
                    isMobile ? 'p-4 mb-4 min-h-[90px]' : 'p-6 min-h-[90px]'
                  }`}
                  onClick={() => handleTermClick(index)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className={`font-semibold text-white ${
                      isMobile ? 'text-lg pr-8' : 'text-xl'
                    }`}>
                      {term.title}
                    </h3>
                    {isMobile && (
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-400 transform transition-transform ${
                          expandedIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {(!isMobile || expandedIndex === index) && (
                      <motion.p
                        initial={isMobile ? { height: 0, opacity: 0 } : undefined}
                        animate={isMobile ? { height: 'auto', opacity: 1 } : undefined}
                        exit={isMobile ? { height: 0, opacity: 0 } : undefined}
                        transition={{ duration: 0.2 }}
                        className={`text-primary-300 ${
                          isMobile ? 'text-base mt-2' : 'text-lg mt-2'
                        }`}
                      >
                        {term.content}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Terms;
