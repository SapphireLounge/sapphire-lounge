import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/datepicker.css";
import ReservationSuccess from '../components/ReservationSuccess';

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
    email: localStorage.getItem('reservationEmail') || '',
    phone: localStorage.getItem('reservationPhone') || '',
    guests: '',
    tablePreference: '',
    occasion: '',
    specialRequests: ''
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Validate required fields
    const requiredFields = [
      { field: selectedDate, name: 'Date' },
      { field: formData.time, name: 'Time' },
      { field: formData.name, name: 'Name' },
      { field: formData.email, name: 'Email' },
      { field: formData.phone, name: 'Phone' },
      { field: formData.guests, name: 'Number of Guests' }
    ];

    const missingFields = requiredFields
      .filter(({ field }) => !field)
      .map(({ name }) => name);

    if (missingFields.length > 0) {
      setValidationError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setIsSubmitting(true);

    // Save email and phone to localStorage
    localStorage.setItem('reservationEmail', formData.email);
    localStorage.setItem('reservationPhone', formData.phone);

    // Add delay before showing success message
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessModalOpen(true);
    }, 500);
  };

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
              <label className="block text-sm font-medium text-gray-300">Select Date</label>
              <div className="relative">
                <Calendar className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                <DatePicker
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
                  placeholderText="Select a date"
                  showPopperArrow={false}
                  open={isCalendarOpen}
                  onInputClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  onClickOutside={() => setIsCalendarOpen(false)}
                />
              </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Select Time</label>
              <div className="relative">
                <Clock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                <select 
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
              <label className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input
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
              <label className="block text-sm font-medium text-gray-300">Phone</label>
              <input
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
              <label className="block text-sm font-medium text-gray-300">Number of Guests</label>
              <div className="relative">
                <Users className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                <select 
                  className="w-full pl-9 pr-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent cursor-pointer hover:border-neutral-600 transition-colors appearance-none"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
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
              <label className="block text-sm font-medium text-gray-300">Table Preference (optional)</label>
              <select 
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
              <label className="block text-sm font-medium text-gray-300">Special Occasion (optional)</label>
              <select 
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
            <label className="block text-sm font-medium text-gray-300">Special Requests</label>
            <textarea
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
        onClose={() => setIsSuccessModalOpen(false)}
        reservationData={formData}
      />
    </div>
  );
}

export default Reservations;