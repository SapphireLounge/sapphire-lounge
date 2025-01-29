import { useState, useEffect, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Phone, Mail, Pen, Table, ChevronDown, Gift } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/datepicker.css";
import { generateReservationQRCode, submitReservation } from '../lib/qrcode';
import ReservationSuccess from '../components/ReservationSuccess';

interface ReservationData {
  date: string | null;
  time: string;
  name: string;
  phone: string;
  email?: string;
  guests: number;
  tablePreference: string;
  occasion: string;
  specialRequests: string;
  qrCode?: string;
}

// Helper function to convert Date to string format
const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return date.toISOString().split('T')[0];
};

const Reservations = memo(() => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [formData, setFormData] = useState<ReservationData>(() => ({
    date: null,
    time: '',
    name: '',
    phone: localStorage.getItem('reservationPhone') || '',
    email: localStorage.getItem('reservationEmail') || '',
    guests: 0,
    tablePreference: '',
    occasion: '',
    specialRequests: '',
    qrCode: ''
  }));

  const [reservationData, setReservationData] = useState<ReservationData>(() => ({
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    guests: 0,
    tablePreference: '',
    occasion: '',
    specialRequests: '',
    qrCode: ''
  }));

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setValidationError('');

    try {
      const qrCodeDataURL = await generateReservationQRCode(formData);
      
      const reservationWithQR: ReservationData = {
        ...formData,
        qrCode: qrCodeDataURL
      };

      const response = await submitReservation(reservationWithQR);
      
      if (typeof response === 'string') {
        console.error(response);
        setErrorMessage(response);
      } else {
        setErrorMessage('');
        setReservationData({
          ...reservationWithQR,
          date: reservationWithQR.date !== null ? formatDate(new Date(reservationWithQR.date)) : 'default-date-string'
        });
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      console.error('Reservation submission error:', error);
      setErrorMessage('An error occurred while submitting your reservation.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  useEffect(() => {
    const handleResize = () => {
      // Removed the setWindowSize call
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', 
    '23:00', '23:30', '00:00', '00:30', '01:00', '01:30'
  ];

  return (
    <main className="min-h-screen pt-24 pb-12 bg-[#020B18]">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">Make a Reservation</h1>
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto">
            Reserve your perfect spot at Sapphire Shisha Lounge.
          </p>
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto mt-1">
            For parties larger than 8, please contact us directly.
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10 transition-colors hover:bg-black/50"
        >
          {validationError && (
            <div className="p-3 rounded-lg bg-red-900/50 border border-red-500/50 text-red-200 text-sm">
              {validationError}
            </div>
          )}
          {/* Date and Time Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Selection */}
            <div className="space-y-1">
              <label htmlFor="reservation-date" className="block text-base md:text-lg font-medium text-gray-300">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                <DatePicker
                  id="reservation-date"
                  name="reservation-date"
                  selected={selectedDate}
                  onChange={(date: Date | null) => {
                    if (date) {
                      setSelectedDate(date);
                      setFormData({ ...formData, date: formatDate(date) });
                      setIsCalendarOpen(false);
                    }
                  }}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  placeholderText="Select date"
                  className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-base md:text-lg placeholder-gray-400"
                  showPopperArrow={false}
                  open={isCalendarOpen}
                  onClickOutside={() => setIsCalendarOpen(false)}
                  onInputClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  calendarClassName="bg-neutral-900 border-neutral-700"
                />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-1">
              <label htmlFor="reservation-time" className="block text-base md:text-lg font-medium text-gray-300">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <select 
                  id="reservation-time"
                  name="reservation-time"
                  className={`w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent cursor-pointer hover:border-neutral-600 transition-colors appearance-none text-base md:text-lg ${!formData.time ? 'text-gray-400' : 'text-white'}`}
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                >
                  <option value="" disabled>Select time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label htmlFor="reservation-name" className="block text-base md:text-lg font-medium text-gray-300">Name</label>
              <div className="relative">
                <Pen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                  type="text"
                  id="reservation-name"
                  name="reservation-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-base md:text-lg placeholder-gray-400"
                  placeholder="Your name"
                  required
                />
              </div>
            </div>
            <div className="space-y-1">
              <label htmlFor="reservation-email" className="block text-base md:text-lg font-medium text-gray-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                  type="email"
                  id="reservation-email"
                  name="reservation-email"
                  value={formData.email}
                  onChange={(e) => {
                    const newEmail = e.target.value;
                    setFormData({ ...formData, email: newEmail });
                    localStorage.setItem('reservationEmail', newEmail);
                  }}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-base md:text-lg placeholder-gray-400"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>

          {/* Phone and Number of Guests Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label htmlFor="reservation-phone" className="block text-base md:text-lg font-medium text-gray-300">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                  type="tel"
                  id="reservation-phone"
                  name="reservation-phone"
                  value={formData.phone}
                  onChange={(e) => {
                    const newPhone = e.target.value;
                    setFormData({ ...formData, phone: newPhone });
                    localStorage.setItem('reservationPhone', newPhone);
                  }}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-base md:text-lg placeholder-gray-400"
                  placeholder="Your phone number"
                  required
                />
              </div>
            </div>
            <div className="space-y-1">
              <label htmlFor="reservation-guests" className="block text-base md:text-lg font-medium text-gray-300">Number of Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <select 
                  id="reservation-guests"
                  name="reservation-guests"
                  className={`w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent cursor-pointer hover:border-neutral-600 transition-colors appearance-none text-base md:text-lg ${formData.guests === 0 ? 'text-gray-400' : 'text-white'}`}
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) })}
                >
                  <option value={0} disabled>Select number of guests</option>
                  {Array.from({ length: 8 }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>Table for {num}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Table Preference and Special Occasion Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label htmlFor="reservation-table-preference" className="block text-base md:text-lg font-medium text-gray-300">Table Preference <span className="text-gray-400 ml-1">(optional)</span></label>
              <div className="relative">
                <Table className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <select 
                  id="reservation-table-preference"
                  name="reservation-table-preference"
                  className={`w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent cursor-pointer hover:border-neutral-600 transition-colors appearance-none text-base md:text-lg ${!formData.tablePreference ? 'text-gray-400' : 'text-white'}`}
                  value={formData.tablePreference}
                  onChange={(e) => setFormData({ ...formData, tablePreference: e.target.value })}
                >
                  <option value="" disabled>Select table preference</option>
                  <option value="Booth">Booth</option>
                  <option value="Regular">Regular Seating</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1">
              <label htmlFor="reservation-occasion" className="block text-base md:text-lg font-medium text-gray-300">Special Occasion <span className="text-gray-400 ml-1">(optional)</span></label>
              <div className="relative">
                <Gift className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <select 
                  id="reservation-occasion"
                  name="reservation-occasion"
                  className={`w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent cursor-pointer hover:border-neutral-600 transition-colors appearance-none text-base md:text-lg ${!formData.occasion ? 'text-gray-400' : 'text-white'}`}
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                >
                  <option value="" disabled>Select an occasion</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Date Night">Date Night</option>
                  <option value="Business Meeting">Business Meeting</option>
                  <option value="Celebration">Celebration</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-1">
            <label htmlFor="reservation-special-requests" className="block text-base md:text-lg font-medium text-gray-300">Special Requests <span className="text-gray-400 ml-1">(optional)</span></label>
            <textarea
              id="reservation-special-requests"
              name="reservation-special-requests"
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-base md:text-lg placeholder-gray-400"
              rows={3}
              placeholder="Any special requests or notes"
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
              {errorMessage}
            </div>
          )}

          {/* Book Now Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all duration-200 ${
              isSubmitting
                ? 'bg-primary-600/50 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-400 to-accent-400 hover:from-primary-500 hover:to-accent-500 active:from-primary-600 active:to-accent-600'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Make Reservation'
            )}
          </button>
        </motion.form>

        {/* Success Modal */}
        {isSuccessModalOpen && (
          <ReservationSuccess
            isOpen={isSuccessModalOpen}
            reservationData={reservationData}
            onClose={() => setIsSuccessModalOpen(false)}
          />
        )}
      </div>
    </main>
  );
});

export default Reservations;