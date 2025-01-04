import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Clock, Users } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { Toaster, toast } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/datepicker.css";

import { reservationSchema, type ReservationFormData } from '@/lib/validations';
import { handleFormSubmission } from '@/lib/form-handler';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import ReservationSuccess from '../components/ReservationSuccess';

function Reservations() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guests: 1,
      tablePreference: '',
      notes: '',
      specialOccasion: ''
    }
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedTablePreference, setSelectedTablePreference] = useState<string>('');
  const [selectedGuests, setSelectedGuests] = useState<number>(1);
  const [selectedOccasion, setSelectedOccasion] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

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

  // Load saved form data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('reservationFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as Pick<ReservationFormData, 'name' | 'email' | 'phone'>;
        if (parsedData.name) setValue('name', parsedData.name);
        if (parsedData.email) setValue('email', parsedData.email);
        if (parsedData.phone) setValue('phone', parsedData.phone);
      } catch (error) {
        console.error('Error parsing saved form data:', error);
        localStorage.removeItem('reservationFormData');
      }
    }
    // Initialize guests to 1 (minimum table size)
    setValue('guests', 1);
  }, [setValue]);

  const onSubmit = async (data: ReservationFormData) => {
    try {
      // Debug log
      console.log('Form submission data:', data);
      
      // Ensure date is in the correct format
      const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
      
      // Save basic contact information to localStorage
      const dataToSave = {
        name: data.name,
        email: data.email,
        phone: data.phone,
      };
      localStorage.setItem('reservationFormData', JSON.stringify(dataToSave));

      const formData = {
        ...data,
        date: formattedDate,
        guests: Number(data.guests),
        specialRequests: data.notes // Ensure special requests are included
      };

      console.log('Submitting reservation with formatted data:', formData);

      const result = await handleFormSubmission('reservations', formData);
      if (result.success) {
        // Update state variables with form data
        setSelectedGuests(Number(data.guests) || 0);
        setSelectedTablePreference(data.tablePreference ?? "defaultPreference");
        setSelectedOccasion(data.specialOccasion ?? "defaultOccasion");
        setSpecialRequests(data.notes ?? "No special requests");
        // Add a slight delay before showing success message
        setTimeout(() => {
          setShowSuccess(true);
        }, 500); // 500ms delay
        reset();
      } else {
        toast.error(result.message || 'Failed to make reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      toast.error('An error occurred while making your reservation. Please try again.');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#020B18]">
      <Toaster position="top-center" />
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
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Date and Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date Selection */}
              <div className="space-y-1">
                <label className="block text-sm font-medium">Select Date</label>
                <div className="relative">
                  <Calendar className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date | null) => {
                      if (date) {
                        setSelectedDate(date);
                        setValue('date', format(date, 'dd/MM/yyyy'));
                        setIsCalendarOpen(false);
                      }
                    }}
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 30)}
                    dateFormat="dd/MM/yyyy"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent cursor-pointer hover:border-neutral-600 transition-colors"
                    placeholderText="Select a date"
                    showPopperArrow={false}
                    open={isCalendarOpen}
                    onInputClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    onClickOutside={() => setIsCalendarOpen(false)}
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
                  <Clock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  <select
                    {...register('time')}
                    className="w-full pl-8 pr-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent appearance-none cursor-pointer hover:border-neutral-600 transition-colors"
                    onChange={(e) => setSelectedTime(e.target.value)}
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
            </div>

            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="space-y-1">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  placeholder="Your email"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Phone and Guests Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone Number */}
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

              {/* Number of Guests */}
              <div className="space-y-1">
                <label className="block text-sm font-medium">Number of Guests</label>
                <div className="relative">
                  <Users className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  <select
                    {...register('guests', { 
                      valueAsNumber: true,
                      onChange: (e) => setSelectedGuests(parseInt(e.target.value))
                    })}
                    className="w-full pl-8 pr-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent cursor-pointer hover:border-neutral-600 transition-colors"
                  >
                    <option value="1">Table for 1</option>
                    <option value="2">Table for 2</option>
                    <option value="3">Table for 3</option>
                    <option value="4">Table for 4</option>
                    <option value="5">Table for 5</option>
                    <option value="6">Table for 6</option>
                    <option value="7">Table for 7</option>
                    <option value="8">Table for 8</option>
                  </select>
                  {errors.guests && (
                    <p className="text-red-400 text-xs">{errors.guests.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Table and Special Occasion Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Table Preference */}
              <div className="space-y-1">
                <label className="block text-sm font-medium">
                  Table Preference <span className="text-gray-400">(optional)</span>
                </label>
                <div className="relative">
                  <Users className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  <select
                    {...register('tablePreference')}
                    className="w-full pl-8 pr-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent appearance-none cursor-pointer hover:border-neutral-600 transition-colors"
                    onChange={(e) => setSelectedTablePreference(e.target.value)}
                  >
                    <option value="">Select table preference</option>
                    <option value="booth">Booth</option>
                    <option value="regular">Regular</option>
                  </select>
                  {errors.tablePreference && (
                    <p className="text-red-400 text-xs">{errors.tablePreference.message}</p>
                  )}
                </div>
              </div>

              {/* Special Occasion */}
              <div className="space-y-1">
                <label className="block text-sm font-medium">
                  Special Occasion <span className="text-gray-400">(optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400">🎉</span>
                  <select
                    {...register('specialOccasion')}
                    className="w-full pl-8 pr-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent cursor-pointer hover:border-neutral-600 transition-colors"
                    onChange={(e) => setSelectedOccasion(e.target.value)}
                  >
                    <option value="">Select an occasion</option>
                    {occasions.slice(1).map((occasion) => (
                      <option key={occasion} value={occasion}>
                        {occasion}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-1">
              <label className="block text-sm font-medium">Special Requests</label>
              <textarea
                {...register('notes')}
                rows={3}
                className="w-full px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-sm"
                placeholder="Any special requests or requirements?"
                onChange={(e) => setSpecialRequests(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/2 bg-gradient-to-r from-primary-400 to-accent-500 py-3 rounded-md font-semibold hover:from-primary-500 hover:to-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 transition-all text-white shadow-lg"
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
      
      {showSuccess && selectedDate && selectedTime && (
        <ReservationSuccess
          isOpen={true}
          onClose={() => setShowSuccess(false)}
          reservationDetails={{
            date: format(selectedDate, 'EEEE, MMMM do, yyyy'),
            time: selectedTime,
            guests: selectedGuests,
            tableType: selectedTablePreference,
            occasion: selectedOccasion,
            specialRequests: specialRequests
          }}
        />
      )}
    </div>
  );
}

export default Reservations;