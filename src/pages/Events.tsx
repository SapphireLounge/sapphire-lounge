import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Music, Users, Star, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster, toast } from 'react-hot-toast';

import { eventRegistrationSchema, type EventRegistrationFormData } from '@/lib/validations/event';
import { handleFormSubmission } from '@/lib/form-handler';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import EventRegistrationSuccess from '../components/EventRegistrationSuccess';

function Events() {
  const events = [
    {
      id: 1,
      title: "Flavour Tasting Night",
      date: "January 15, 2025",
      time: "7 PM - 10 PM",
      image: "/images/events/cachimberos-o7A76QuFT00-unsplash.jpg",
      description: "Join us for an exclusive tasting of our newest premium flavours."
    },
    {
      id: 2,
      title: "DJ Night",
      date: "January 20, 2025",
      time: "8 PM - 2 AM",
      image: "/images/events/DJ Night.jpg",
      description: "Experience the perfect blend of music and atmosphere with our resident DJ."
    },
    {
      id: 3,
      title: "Student Night",
      date: "January 25, 2025",
      time: "6 PM - 11 PM",
      image: "/images/events/Student Night.avif",
      description: "Special discounts and offers for students. Valid student ID required."
    }
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<EventRegistrationFormData>({
    resolver: zodResolver(eventRegistrationSchema),
    defaultValues: {
      guests: 1
    }
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [registrationDetails, setRegistrationDetails] = useState<{
    title: string;
    date: string;
    time: string;
    guests: number;
    notes?: string;
  } | null>(null);

  const onSubmit = async (data: EventRegistrationFormData) => {
    try {
      const result = await handleFormSubmission('events', data);
      
      if (result.success) {
        setRegistrationDetails({
          title: data.eventChoice,
          date: events.find(e => e.title === data.eventChoice)?.date || '',
          time: events.find(e => e.title === data.eventChoice)?.time || '',
          guests: data.guests,
          notes: data.notes
        });
        
        setTimeout(() => {
          setShowSuccess(true);
        }, 500);
        
        reset();
      } else {
        toast.error(result.message || 'Failed to register for event');
      }
    } catch (error) {
      console.error('Event registration error:', error);
      toast.error('An error occurred while registering for the event. Please try again.');
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-8 bg-[#020B18]">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4 max-w-5xl">
        <EventRegistrationSuccess 
          isOpen={showSuccess}
          onClose={handleCloseSuccess}
          eventDetails={registrationDetails}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
            Events
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Join us for special events and unforgettable experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {events.map((event, index) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-dark-500/50 backdrop-blur-sm rounded-xl overflow-hidden border border-accent-700/20 shadow-xl"
            >
              <div className="relative h-56 md:h-72 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  src={event.image}
                  alt={`${event.title} at Sapphire Lounge`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-500 via-dark-500/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 pb-2">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">{event.title}</h3>
                  <p className="text-gray-200 text-xs md:text-sm mb-2">{event.description}</p>
                  <div className="flex items-center text-primary-300">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{event.date} • {event.time}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Feature Containers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="p-4 md:p-6 bg-dark-500/50 backdrop-blur-sm rounded-xl border border-accent-700/20 shadow-xl">
            <Music className="w-6 h-6 md:w-8 md:h-8 text-primary-300 mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-semibold mb-2">Live Entertainment</h3>
            <p className="text-gray-300 text-sm">Weekly DJ performances and live music sessions</p>
          </div>

          <div className="p-4 md:p-6 bg-dark-500/50 backdrop-blur-sm rounded-xl border border-accent-700/20 shadow-xl">
            <Users className="w-6 h-6 md:w-8 md:h-8 text-primary-300 mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-semibold mb-2">Private Events</h3>
            <p className="text-gray-300 text-sm">Book our exclusive space for your special occasions</p>
          </div>

          <div className="p-4 md:p-6 bg-dark-500/50 backdrop-blur-sm rounded-xl border border-accent-700/20 shadow-xl">
            <Star className="w-6 h-6 md:w-8 md:h-8 text-primary-300 mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-semibold mb-2">VIP Experience</h3>
            <p className="text-gray-300 text-sm">Enjoy premium service and exclusive benefits</p>
          </div>
        </motion.div>

        {/* Registration Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto bg-dark-500/50 backdrop-blur-sm rounded-xl p-6 border border-accent-700/20 shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 text-center">
            Register for an Event
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Event Selection */}
            <div>
              <label htmlFor="eventChoice" className="block text-xs font-medium text-gray-300 mb-1">
                Select Event
              </label>
              <select
                {...register('eventChoice')}
                id="eventChoice"
                className="w-full px-3 py-2 bg-dark-600 border border-dark-400 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-sm"
              >
                <option value="">Select an event</option>
                {events.map(event => (
                  <option key={event.id} value={event.title}>
                    {event.title} - {event.date}
                  </option>
                ))}
              </select>
              {errors.eventChoice && (
                <p className="mt-1 text-xs text-red-400">{errors.eventChoice.message}</p>
              )}
            </div>

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-gray-300 mb-1">Name</label>
              <input
                {...register('name')}
                type="text"
                id="name"
                autoComplete="name"
                className="w-full px-3 py-2 bg-dark-600 border border-dark-400 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-sm"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1">Email</label>
              <input
                {...register('email')}
                type="email"
                id="email"
                autoComplete="email"
                className="w-full px-3 py-2 bg-dark-600 border border-dark-400 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-sm"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-xs font-medium text-gray-300 mb-1">Phone</label>
              <input
                {...register('phone')}
                type="tel"
                id="phone"
                autoComplete="tel"
                className="w-full px-3 py-2 bg-dark-600 border border-dark-400 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-sm"
                placeholder="Your phone number"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>
              )}
            </div>

            {/* Number of Guests */}
            <div>
              <label htmlFor="guests" className="block text-xs font-medium text-gray-300 mb-1">
                Number of Guests
              </label>
              <select
                {...register('guests', { valueAsNumber: true })}
                id="guests"
                className="w-full px-3 py-2 bg-dark-600 border border-dark-400 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-sm"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
              {errors.guests && (
                <p className="mt-1 text-xs text-red-400">{errors.guests.message}</p>
              )}
            </div>

            {/* Notes Field */}
            <div>
              <label htmlFor="notes" className="block text-xs font-medium text-gray-300 mb-1">
                Special Requests (Optional)
              </label>
              <textarea
                {...register('notes')}
                id="notes"
                rows={3}
                className="w-full px-3 py-2 bg-dark-600 border border-dark-400 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-sm"
                placeholder="Any special requests or notes"
              />
              {errors.notes && (
                <p className="mt-1 text-xs text-red-400">{errors.notes.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary-400 to-accent-500 py-2.5 rounded-lg font-semibold hover:from-primary-500 hover:to-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner className="w-5 h-5 mr-2" />
                    Registering...
                  </>
                ) : (
                  'Register Now'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Events;