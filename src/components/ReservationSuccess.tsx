import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Calendar, Clock, Users, MapPin, Mail, Phone, Star, ScrollText } from 'lucide-react';

interface ReservationData {
  date: Date | null;
  time: string;
  name: string;
  email: string;
  phone: string;
  guests: string;
  tablePreference: string;
  occasion: string;
  specialRequests: string;
}

interface ReservationSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  reservationData: ReservationData;
}

const ReservationSuccess: React.FC<ReservationSuccessProps> = ({ isOpen, onClose, reservationData }) => {
  const formatDate = (date: Date | null) => {
    if (!date) return 'Not specified';
    
    const day = date.getDate();
    const ordinal = (n: number) => {
      const s = ['th', 'st', 'nd', 'rd'];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };
    
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).replace(/\d+/, ordinal(day));
  };

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
            className="relative bg-[#020B18] rounded-xl p-2 w-full max-w-lg shadow-xl border border-white"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-2">
              <div className="flex justify-center mb-1">
                <CheckCircle2 
                  className="w-16 h-16 text-green-500" 
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Reservation Confirmed!
              </h3>
              <div className="text-gray-400 space-y-0.125 md:space-y-0">
                <p>Your table has been reserved.</p>
                <p className="mb-6">Your reservation details:</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3 bg-[#0A1628] p-1 rounded-lg border border-dark-700/50">
                <Calendar className="w-5 h-5 text-primary-400" />
                <span className="text-gray-100 font-medium">Date:</span>
                <span className="text-gray-300">{formatDate(reservationData.date)}</span>
              </div>
              <div className="flex items-start space-x-3 bg-[#0A1628] p-1 rounded-lg border border-dark-700/50">
                <Clock className="w-5 h-5 text-primary-400" />
                <span className="text-gray-100 font-medium">Time:</span>
                <span className="text-gray-300">{reservationData.time}</span>
              </div>
              <div className="flex items-start space-x-3 bg-[#0A1628] p-1 rounded-lg border border-dark-700/50">
                <Users className="w-5 h-5 text-primary-400" />
                <span className="text-gray-100 font-medium">Name:</span>
                <span className="text-gray-300">{reservationData.name}</span>
              </div>
              <div className="flex items-start space-x-3 bg-[#0A1628] p-1 rounded-lg border border-dark-700/50">
                <Mail className="w-5 h-5 text-primary-400" />
                <span className="text-gray-100 font-medium">Email:</span>
                <span className="text-gray-300">{reservationData.email}</span>
              </div>
              <div className="flex items-start space-x-3 bg-[#0A1628] p-1 rounded-lg border border-dark-700/50">
                <Phone className="w-5 h-5 text-primary-400" />
                <span className="text-gray-100 font-medium">Phone:</span>
                <span className="text-gray-300">{reservationData.phone}</span>
              </div>
              <div className="flex items-start space-x-3 bg-[#0A1628] p-1 rounded-lg border border-dark-700/50">
                <Users className="w-5 h-5 text-primary-400" />
                <span className="text-gray-100 font-medium">Guests:</span>
                <span className="text-gray-300">{reservationData.guests}</span>
              </div>
              {reservationData.tablePreference && (
                <div className="flex items-start space-x-3 bg-[#0A1628] p-1 rounded-lg border border-dark-700/50">
                  <MapPin className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-100 font-medium">Table Preference:</span>
                  <span className="text-gray-300">{reservationData.tablePreference}</span>
                </div>
              )}
              {reservationData.occasion && (
                <div className="flex items-start space-x-3 bg-[#0A1628] p-1 rounded-lg border border-dark-700/50">
                  <Star className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-100 font-medium">Special Occasion:</span>
                  <span className="text-gray-300">{reservationData.occasion}</span>
                </div>
              )}
              {reservationData.specialRequests && (
                <div className="flex items-start space-x-3 bg-[#0A1628] p-1 rounded-lg border border-dark-700/50">
                  <ScrollText className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-100 font-medium">Special Requests:</span>
                  <span className="text-gray-300">{reservationData.specialRequests}</span>
                </div>
              )}
            </div>

            <div className="text-sm text-gray-400 text-center mt-1">
              <p>A confirmation email has been sent to {reservationData.email}</p>
              <p className="mt-1">We look forward to serving you!</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReservationSuccess;
