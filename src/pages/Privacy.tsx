import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useDeviceType } from '../hooks/useDeviceType';

function Privacy() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  const privacyPolicies = [
    {
      title: "1. Information We Collect",
      content: "We collect personal information such as name, contact details, and payment information when you make reservations or use our services. We also collect usage data to improve our services."
    },
    {
      title: "2. How We Use Your Information",
      content: "Your information is used to process reservations, provide services, send updates about bookings, and improve our customer experience. We may also use it for marketing purposes with your consent."
    },
    {
      title: "3. Data Protection",
      content: "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure. Your data is stored securely and accessed only by authorized personnel."
    },
    {
      title: "4. Cookies and Tracking",
      content: "Our website uses cookies to enhance your browsing experience. These help us analyze website traffic and customize content based on your preferences."
    },
    {
      title: "5. Third-Party Services",
      content: "We may use third-party services for payment processing and analytics. These providers have their own privacy policies and data handling practices."
    },
    {
      title: "6. Marketing Communications",
      content: "With your consent, we may send you marketing communications about our services and special offers. You can opt out of these communications at any time."
    },
    {
      title: "7. Your Rights",
      content: "You have the right to access, correct, or delete your personal information. You can also request a copy of your data or withdraw consent for its use."
    },
    {
      title: "8. Data Retention",
      content: "We retain your personal information only for as long as necessary to provide our services and comply with legal obligations."
    },
    {
      title: "9. Updates to Privacy Policy",
      content: "We may update this privacy policy periodically. We will notify you of any significant changes through our website or email."
    }
  ];

  const handlePolicyClick = (index: number) => {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm md:text-lg max-w-3xl mx-auto">
            How we collect, use, and protect your information
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
              {privacyPolicies.map((policy, index) => (
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
                  onClick={() => handlePolicyClick(index)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className={`font-semibold text-white ${
                      isMobile ? 'text-lg pr-8' : 'text-xl'
                    }`}>
                      {policy.title}
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
                        className={`text-gray-300 ${
                          isMobile ? 'text-base mt-2' : 'text-lg mt-2'
                        }`}
                      >
                        {policy.content}
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

export default Privacy;
