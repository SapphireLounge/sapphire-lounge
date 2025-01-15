import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/datepicker.css";
import { api } from '../lib/api';
import { generateReservationQRCode } from '../lib/qrcode';
import ReservationSuccess from '../components/ReservationSuccess';

interface ReservationData {
  date: Date | null;
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

interface ReservationResponse {
  success: boolean;
  message: string;
  data?: {
    reservation: {
      date: string;
      time: string;
      name: string;
      phone: string;
      guests: number;
      tablePreference?: string;
      occasion?: string;
      specialRequests?: string;
      qrCode: string;
    };
  };
  error?: string;
  details?: unknown;
}

function Reservations() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string>('');
  const [formData, setFormData] = useState<ReservationData>({
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
  });
  const [reservationData, setReservationData] = useState<ReservationData>({
    date: null,
    time: '',
    name: '',
    phone: '',
    email: '',
    guests: 0,
    tablePreference: '',
    occasion: '',
    specialRequests: '',
    qrCode: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setValidationError('');

    try {
      const qrCodeDataURL = await generateReservationQRCode(formData);
      
      // Store the reservation data with QR code
      const reservationWithQR = {
        ...formData,
        qrCode: qrCodeDataURL
      };

      // Show success modal with the data
      setReservationData(reservationWithQR);
      setIsSuccessModalOpen(true);
      
      // Clear form
      setFormData({
        date: null,
        time: '',
        name: '',
        phone: '',
        email: '',
        guests: 0,
        tablePreference: '',
        occasion: '',
        specialRequests: '',
        qrCode: ''
      });
      
    } catch (error) {
      console.error('Reservation error:', error);
      setValidationError('Failed to create reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const occasions = [
    "Select an occasion (optional)",
    "Birthday",
    "Anniversary",
    "Date Night",
    "Business Meeting",
    "Celebration",
    "Other"
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#020B18]">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">Make a Reservation</h1>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Reserve your perfect spot at Sapphire Shisha Lounge.
          </p>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-1">
            For parties larger than 8, please contact us directly.
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          {validationError && (
            <div className="p-3 rounded-lg bg-red-900/50 border border-red-500/50 text-red-200 text-sm">
              {validationError}
            </div>
          )}
          {/* Date and Time Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date Selection */}
            <div className="space-y-1">
              <label htmlFor="reservation-date" className="block text-sm font-medium text-gray-300">Date</label>
              <div className="relative">
                <Calendar className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                <DatePicker
                  id="reservation-date"
                  name="reservation-date"
                  selected={selectedDate}
                  onChange={(date: Date | null) => {
                    setSelectedDate(date);
                    setFormData(prev => ({ ...prev, date }));
                    setIsCalendarOpen(false);
                  }}
                  minDate={new Date()}
                  maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
                  dateFormat="dd/MM/yyyy"
                  className="w-full pl-9 pr-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent cursor-pointer hover:border-neutral-600 transition-colors"
                  placeholderText="Select date"
                  showPopperArrow={false}
                  open={isCalendarOpen}
                  onInputClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  onClickOutside={() => setIsCalendarOpen(false)}
                />
              </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-1">
              <label htmlFor="reservation-time" className="block text-sm font-medium text-gray-300">Time</label>
              <div className="relative">
                <Clock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                <select 
                  id="reservation-time"
                  name="reservation-time"
                  className="w-full pl-9 pr-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent cursor-pointer hover:border-neutral-600 transition-colors appearance-none"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                >
                  <option value="">Select time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="reservation-name" className="block text-sm font-medium text-gray-300">Name</label>
              <input
                id="reservation-name"
                name="reservation-name"
                type="text"
                className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="reservation-email" className="block text-sm font-medium text-gray-300">Email</label>
              <input
                id="reservation-email"
                name="reservation-email"
                type="email"
                className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => {
                  const newEmail = e.target.value;
                  setFormData({ ...formData, email: newEmail });
                  localStorage.setItem('reservationEmail', newEmail);
                }}
              />
            </div>
          </div>

          {/* Phone and Number of Guests Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="reservation-phone" className="block text-sm font-medium text-gray-300">Phone</label>
              <input
                id="reservation-phone"
                name="reservation-phone"
                type="tel"
                className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={(e) => {
                  const newPhone = e.target.value;
                  setFormData({ ...formData, phone: newPhone });
                  localStorage.setItem('reservationPhone', newPhone);
                }}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="reservation-guests" className="block text-sm font-medium text-gray-300">Number of Guests</label>
              <div className="relative">
                <Users className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                <select 
                  id="reservation-guests"
                  name="reservation-guests"
                  className="w-full pl-9 pr-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent cursor-pointer hover:border-neutral-600 transition-colors appearance-none"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) })}
                >
                  <option value="">Select number of guests</option>
                  {Array.from({ length: 8 }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>Table for {num}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table Preference and Special Occasion Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="reservation-table-preference" className="block text-sm font-medium text-gray-300">Table Preference (optional)</label>
              <select 
                id="reservation-table-preference"
                name="reservation-table-preference"
                className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent cursor-pointer hover:border-neutral-600 transition-colors appearance-none"
                value={formData.tablePreference}
                onChange={(e) => setFormData({ ...formData, tablePreference: e.target.value })}
              >
                <option value="">Select table preference</option>
                <option value="Booth">Booth</option>
                <option value="Regular">Regular Seating</option>
              </select>
            </div>
            <div className="space-y-1">
              <label htmlFor="reservation-occasion" className="block text-sm font-medium text-gray-300">Special Occasion (optional)</label>
              <select 
                id="reservation-occasion"
                name="reservation-occasion"
                className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent cursor-pointer hover:border-neutral-600 transition-colors appearance-none"
                value={formData.occasion}
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
              >
                {occasions.map(occasion => (
                  <option key={occasion} value={occasion === "Select an occasion (optional)" ? "" : occasion}>
                    {occasion}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-1">
            <label htmlFor="reservation-special-requests" className="block text-sm font-medium text-gray-300">Special Requests</label>
            <textarea
              id="reservation-special-requests"
              name="reservation-special-requests"
              className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              rows={2}
              placeholder="Any special requests or requirements?"
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            />
          </div>

          {/* Book Now Button */}
          <button
            className="w-full bg-gradient-to-r from-primary-400 to-accent-500 py-3 rounded-lg font-semibold text-white hover:from-primary-500 hover:to-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 transition-all"
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Submitting...' : 'Book Now'}
          </button>
        </motion.div>
      </div>

      <ReservationSuccess
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          // Reset form but keep the last successful reservation data for the success modal
          const lastReservation = { ...formData };
          setFormData({
            date: null,
            time: '',
            name: '',
            phone: '',
            email: '',
            guests: 0,
            tablePreference: '',
            occasion: '',
            specialRequests: '',
            qrCode: lastReservation.qrCode // Keep the QR code
          });
        }}
        reservationData={{
          ...reservationData,
          date: formatDate(reservationData.date)
        }}
      />
    </div>
  );
}

export default Reservations;