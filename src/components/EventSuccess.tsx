import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Users, Mail, Phone, Calendar, Clock } from 'lucide-react';

interface EventSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  eventData: {
    name: string;
    email: string;
    phone: string;
    guests: string;
    eventTitle: string;
    date: string;
    time: string;
  };
}

const EventSuccess: React.FC<EventSuccessProps> = ({ isOpen, onClose, eventData }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="relative bg-[#020B18] rounded-xl p-6 w-full max-w-lg shadow-xl border border-white"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Event Booking Confirmed!
              </h3>
              <p className="text-gray-400 mb-2">
                Your event booking details:
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 bg-[#0A1628] p-2 rounded-lg border border-dark-700/50">
                  <Users className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-100 font-medium">Name:</span>
                  <span className="text-gray-300">{eventData.name}</span>
                </div>
                <div className="flex items-start space-x-3 bg-[#0A1628] p-2 rounded-lg border border-dark-700/50">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-100 font-medium">Email:</span>
                  <span className="text-gray-300">{eventData.email}</span>
                </div>
                <div className="flex items-start space-x-3 bg-[#0A1628] p-2 rounded-lg border border-dark-700/50">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-100 font-medium">Phone:</span>
                  <span className="text-gray-300">{eventData.phone}</span>
                </div>
                <div className="flex items-start space-x-3 bg-[#0A1628] p-2 rounded-lg border border-dark-700/50">
                  <Users className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-100 font-medium">Number of Guests:</span>
                  <span className="text-gray-300">{eventData.guests}</span>
                </div>
                <div className="flex items-start space-x-3 bg-[#0A1628] p-2 rounded-lg border border-dark-700/50">
                  <Calendar className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-100 font-medium">Event:</span>
                  <span className="text-gray-300">{eventData.eventTitle}</span>
                </div>
                <div className="flex items-start space-x-3 bg-[#0A1628] p-2 rounded-lg border border-dark-700/50">
                  <Calendar className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-100 font-medium">Date:</span>
                  <span className="text-gray-300">{eventData.date}</span>
                </div>
                <div className="flex items-start space-x-3 bg-[#0A1628] p-2 rounded-lg border border-dark-700/50">
                  <Clock className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-100 font-medium">Time:</span>
                  <span className="text-gray-300">{eventData.time}</span>
                </div>
              </div>
              <div className="text-center mt-4">
                <p className="text-gray-400">A confirmation email has been sent to <span className="font-semibold">{eventData.email}</span></p>
                <p className="text-gray-400">We look forward to serving you!</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EventSuccess;
