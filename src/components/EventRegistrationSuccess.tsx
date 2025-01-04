import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Calendar, Users, MessageSquare } from 'lucide-react';

interface EventRegistrationSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  eventDetails: {
    title: string;
    date: string;
    time: string;
    guests: number;
    notes?: string;
  } | null;
}

const EventRegistrationSuccess: React.FC<EventRegistrationSuccessProps> = ({ 
  isOpen, 
  onClose, 
  eventDetails 
}) => {
  if (!eventDetails) return null;

  const details = [
    {
      icon: <Calendar className="w-5 h-5" />,
      title: 'Event Details',
      description: eventDetails.title
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: 'Date & Time',
      description: `${eventDetails.date} at ${eventDetails.time}`
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Number of Guests',
      description: `${eventDetails.guests} ${eventDetails.guests === 1 ? 'Guest' : 'Guests'}`
    },
    ...(eventDetails.notes ? [{
      icon: <MessageSquare className="w-5 h-5" />,
      title: 'Special Notes',
      description: eventDetails.notes
    }] : [])
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:px-4">
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
            className="bg-[#050D1A] rounded-xl p-4 sm:p-6 w-full max-w-[95%] sm:max-w-md relative z-10 border border-dark-700 shadow-2xl mx-auto overflow-y-auto max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6, delay: 0.1 }}
                className="mx-auto mb-4"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl sm:text-2xl font-bold text-white mb-2"
              >
                Event Registration Confirmed!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 text-sm"
              >
                We're excited to see you at the event!
              </motion.p>
            </div>

            <div className="space-y-4">
              {details.map((detail, index) => (
                <motion.div
                  key={detail.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start p-3 bg-dark-600/50 rounded-lg border border-dark-500"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-dark-500 rounded-full flex items-center justify-center">
                    {detail.icon}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-300">{detail.title}</p>
                    <p className="text-sm text-white">{detail.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gray-400">
                Check your email for confirmation and additional details.
              </p>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EventRegistrationSuccess;
