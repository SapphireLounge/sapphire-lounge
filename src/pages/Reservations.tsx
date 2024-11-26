import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Clock, Users } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { Toaster } from 'react-hot-toast';

import { reservationSchema, type ReservationFormData } from '@/lib/validations';
import { handleFormSubmission } from '@/lib/form-handler';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

function Reservations() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

  // Define type for saved form data
  type SavedFormData = Pick<ReservationFormData, 'name' | 'email' | 'phone'>;

  // Load saved form data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('reservationFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as SavedFormData;
        // Only set the fields we know are strings and saved
        if (parsedData.name) setValue('name', parsedData.name);
        if (parsedData.email) setValue('email', parsedData.email);
        if (parsedData.phone) setValue('phone', parsedData.phone);
      } catch (error) {
        console.error('Error parsing saved form data:', error);
        localStorage.removeItem('reservationFormData');
      }
    }
  }, [setValue]);

  const onSubmit = async (data: ReservationFormData) => {
    // Save basic contact information to localStorage
    const dataToSave = {
      name: data.name,
      email: data.email,
      phone: data.phone,
    };
    localStorage.setItem('reservationFormData', JSON.stringify(dataToSave));

    const result = await handleFormSubmission('reservations', data);
    if (result.success) {
      reset();
    }
  };

  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', 
    '23:00', '23:30', '00:00', '00:30', '01:00', '01:30'
  ];

  const tableOptions = [
    { id: 'regular', name: 'Regular Seating' },
    { id: 'booth', name: 'Booth' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#020B18]">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">Make a Reservation</h1>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Reserve your perfect spot at Sapphire Shisha Lounge. For parties larger than 8,
            please contact us directly.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-900/50 backdrop-blur-sm p-4 rounded-lg shadow-lg mb-6 border border-accent-700/20 max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-full px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  placeholder="Your phone number"
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs">{errors.phone.message}</p>
                )}
              </div>

              {/* Date Selection */}
              <div className="space-y-1">
                <label className="block text-sm font-medium">Select Date</label>
                <div className="relative">
                  <Calendar className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    {...register('date')}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    max={format(addDays(new Date(), 30), 'yyyy-MM-dd')}
                    className="w-full pl-8 pr-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  />
                  {errors.date && (
                    <p className="text-red-400 text-xs">{errors.date.message}</p>
                  )}
                </div>
              </div>

              {/* Time Selection */}
              <div className="space-y-1">
                <label className="block text-sm font-medium">Select Time</label>
                <div className="relative">
                  <Clock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    {...register('time')}
                    className="w-full pl-8 pr-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent appearance-none"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  {errors.time && (
                    <p className="text-red-400 text-xs">{errors.time.message}</p>
                  )}
                </div>
              </div>

              {/* Number of Guests */}
              <div className="space-y-1">
                <label className="block text-sm font-medium">Number of Guests</label>
                <div className="relative">
                  <Users className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="number"
                    {...register('guests', { valueAsNumber: true })}
                    min="1"
                    max="8"
                    className="w-full pl-8 pr-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  />
                  {errors.guests && (
                    <p className="text-red-400 text-xs">{errors.guests.message}</p>
                  )}
                </div>
              </div>

              {/* Table Preference */}
              <div className="space-y-1">
                <label className="block text-sm font-medium">Table Preference</label>
                <select
                  {...register('tablePreference')}
                  className="w-full px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                >
                  <option value="">Select preference</option>
                  {tableOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label className="block text-sm font-medium">Special Requests</label>
              <textarea
                {...register('notes')}
                rows={3}
                className="w-full px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-sm"
                placeholder="Any special requests or notes..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary-300 to-accent-400 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-400 hover:to-accent-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <LoadingSpinner /> : 'Book Now'}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Circle Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mt-12"
        >
          <img 
            src="/images/logo/Sapphire Lounge Circle Logo.png"
            alt="Sapphire Lounge" 
            className="w-32 h-32"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default Reservations;