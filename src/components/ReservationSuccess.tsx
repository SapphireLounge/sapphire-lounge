import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Calendar, Clock, MapPin, Users } from 'lucide-react';

interface ReservationSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  reservationDetails: {
    date: string;
    time: string;
    guests: number;
    tableType?: string;
    occasion?: string;
    specialRequests?: string;
  };
}

const ReservationSuccess: React.FC<ReservationSuccessProps> = ({ isOpen, onClose, reservationDetails }) => {
  const steps = [
    {
      icon: <Calendar className="w-5 h-5" />,
      title: 'Date Confirmed',
      description: reservationDetails.date
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: 'Time Reserved',
      description: reservationDetails.time
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Party Size',
      description: `Table for ${reservationDetails.guests} ${reservationDetails.guests === 1 ? 'guest' : 'guests'}`
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'Table Type',
      description: reservationDetails.tableType === 'booth' 
        ? 'Booth Seating'
        : reservationDetails.tableType === 'regular' 
          ? 'Regular Seating' 
          : 'Regular Seating'
    },
    ...(reservationDetails.occasion ? [{
      icon: <span className="text-xl">🎉</span>,
      title: 'Special Occasion',
      description: reservationDetails.occasion
    }] : []),
    ...(reservationDetails.specialRequests ? [{
      icon: <span className="text-xl">📝</span>,
      title: 'Special Requests',
      description: reservationDetails.specialRequests
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
                Reservation Confirmed!
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-gray-200"
              >
                We're excited to welcome you to Sapphire Lounge
              </motion.p>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start space-x-3 bg-[#0A1628] p-2 sm:p-3 rounded-lg border border-dark-700/50"
                >
                  <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-gray-100 text-sm sm:text-base font-medium">{step.title}</h4>
                    <p className="text-gray-300 text-xs sm:text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 space-y-3"
            >
              <p className="text-gray-300 text-sm text-center">
                A confirmation email has been sent to<br />your registered email address.
              </p>
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-primary-400 to-accent-500 py-3 rounded-md font-semibold hover:from-primary-500 hover:to-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 transition-all text-white shadow-lg"
              >
                View My Reservations
              </button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReservationSuccess;
