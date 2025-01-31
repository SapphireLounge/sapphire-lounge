import { useState, lazy, Suspense, useEffect } from 'react';
import { Calendar, Music, Users, Star, Mail, Phone, Pen, ChevronDown } from 'lucide-react';
import { generateEventQRCode } from '../lib/qrcode';
import { motion } from 'framer-motion';

// Preload EventSuccess component
const EventSuccess = lazy(() => import('../components/EventSuccess'));
// Preload the component in a hidden Suspense boundary
const PreloadedEventSuccess = () => (
  <div style={{ display: 'none' }}>
    <Suspense fallback={null}>
      <EventSuccess isOpen={false} onClose={() => {}} eventData={undefined} />
    </Suspense>
  </div>
);

interface EventData {
  eventId: number;
  eventTitle: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  qrCode?: string;
}

interface EventFormData {
  name: string;
  email: string;
  phone: string;
  guests: number;
  eventTitle: string;
  date: string;
  time: string;
  eventId?: number;
}

function Events() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    name: localStorage.getItem('eventName') || '',
    email: localStorage.getItem('eventEmail') || '',
    phone: localStorage.getItem('eventPhone') || '',
    guests: 0,
    eventTitle: '',
    date: '',
    time: ''
  });
  const [validationError, setValidationError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null;
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setValidationError('');

    try {
      const selectedEvent = events.find(event => event.title === formData.eventTitle);
      if (!selectedEvent || typeof selectedEvent.id !== 'number') {
        throw new Error('Selected event not found or invalid id');
      }

      const qrCodeDataURL = await generateEventQRCode({
        ...formData,
        eventId: Number(selectedEvent.id).toString(),
        eventTitle: selectedEvent.title,
        date: selectedEvent.date,
        time: selectedEvent.time
      });

      // Add a 1-second delay before showing success
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Save form data to localStorage
      localStorage.setItem('eventName', formData.name);
      localStorage.setItem('eventEmail', formData.email);
      localStorage.setItem('eventPhone', formData.phone);

      setEventData({
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        date: selectedEvent.date,
        time: selectedEvent.time,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        guests: formData.guests,
        qrCode: qrCodeDataURL
      });

      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Event registration error:', error);
      setValidationError('An error occurred while registering for the event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEventSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEventTitle = e.target.value;
    const selectedEvent = events.find(event => event.title === selectedEventTitle);
    
    if (selectedEvent) {
      setFormData(prev => ({
        ...prev,
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        date: selectedEvent.date,
        time: selectedEvent.time,
        guests: prev.guests || 0
      }));
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 0.5
      }}
      className="min-h-screen pt-24 pb-8 bg-[#020B18]"
    >
      <div className="container mx-auto px-2 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Upcoming Events
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Join us for an unforgettable evening of entertainment and luxury
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-10 max-w-[98%] md:max-w-[100%] mx-auto mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {events.map(event => (
            <div key={event.id} className="bg-dark-500/50 backdrop-blur-sm rounded-xl overflow-hidden border border-accent-700/20 shadow-xl hover:translate-y-[-10px] transition-transform duration-300">
              <div className="relative h-56 md:h-80 overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-400 hover:scale-105"
                  src={event.image}
                  alt={`${event.title} at Sapphire Lounge`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-500 via-dark-500/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 pb-2 md:pb-4">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{event.title}</h3>
                  <p className="text-gray-200 text-xs md:text-base mb-2 md:mb-3">{event.description}</p>
                  <div className="flex items-center text-primary-300">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    <span className="text-sm md:text-base font-medium">{event.date} • {event.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-10 max-w-[98%] md:max-w-[100%] mx-auto">
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-colors hover:bg-black/50">
            <div className="flex items-center gap-3 mb-4">
              <Music className="w-6 h-6 md:w-10 md:h-10 text-primary-300" />
              <h3 className="text-lg md:text-xl font-semibold">Live Entertainment</h3>
            </div>
            <p className="text-gray-300 text-sm md:text-base">Weekly DJ performances and live music sessions</p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-colors hover:bg-black/50">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 md:w-10 md:h-10 text-primary-300" />
              <h3 className="text-lg md:text-xl font-semibold">Private Events</h3>
            </div>
            <p className="text-gray-300 text-sm md:text-base">Host your special occasions in our exclusive venue</p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-colors hover:bg-black/50">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-6 h-6 md:w-10 md:h-10 text-primary-300" />
              <h3 className="text-lg md:text-xl font-semibold">VIP Experience</h3>
            </div>
            <p className="text-gray-300 text-sm md:text-base">Exclusive packages for a premium experience</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 bg-black/40 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10 transition-colors hover:bg-black/50">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 md:pb-1 md:px-0.5">
              Event Registration
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-4">
                <label htmlFor="event-title" className="block text-base md:text-lg font-medium text-gray-300 mb-1.5">
                  Select Event
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  <select
                    id="event-title"
                    name="event-title"
                    value={formData.eventTitle}
                    onChange={handleEventSelect}
                    className={`w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent appearance-none text-base md:text-lg ${!formData.eventTitle ? 'text-gray-400' : 'text-white'}`}
                    required
                  >
                    <option value="" disabled>Select an event</option>
                    {events.map(event => (
                      <option key={event.id} value={event.title}>
                        {event.title} - {event.date}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="event-name" className="block text-base md:text-lg font-medium text-gray-300 mb-1.5">
                    Name
                  </label>
                  <div className="relative">
                    <Pen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    <input
                      type="text"
                      id="event-name"
                      name="event-name"
                      value={formData.name}
                      onChange={(e) => {
                        const newName = e.target.value;
                        setFormData({ ...formData, name: newName });
                        localStorage.setItem('eventName', newName);
                      }}
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-base md:text-lg"
                      placeholder="Your name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="event-email" className="block text-base md:text-lg font-medium text-gray-300 mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    <input
                      type="email"
                      id="event-email"
                      name="event-email"
                      value={formData.email}
                      onChange={(e) => {
                        const newEmail = e.target.value;
                        setFormData({ ...formData, email: newEmail });
                        localStorage.setItem('eventEmail', newEmail);
                      }}
                      className="w-full pl-11 pr-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-base md:text-lg"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="event-phone" className="block text-base md:text-lg font-medium text-gray-300 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    <input
                      type="tel"
                      id="event-phone"
                      name="event-phone"
                      value={formData.phone}
                      onChange={(e) => {
                        const newPhone = e.target.value;
                        setFormData({ ...formData, phone: newPhone });
                        localStorage.setItem('eventPhone', newPhone);
                      }}
                      className="w-full pl-11 pr-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-base md:text-lg"
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="guests" className="block text-base md:text-lg font-medium text-gray-300 mb-1.5">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    <select
                      id="guests"
                      value={formData.guests || ''}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        guests: parseInt(e.target.value) 
                      }))}
                      className={`w-full pl-11 pr-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent cursor-pointer hover:border-neutral-600 transition-colors appearance-none text-base md:text-lg ${!formData.guests ? 'text-gray-400' : 'text-white'}`}
                      required
                      autoComplete="off"
                    >
                      <option value="" disabled>Select number of guests</option>
                      {[...Array(8)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {validationError && (
                <div className="p-3 rounded-lg bg-red-900/50 border border-red-500/50 text-red-200 text-sm">
                  {validationError}
                </div>
              )}

              <div className="mt-6">
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
                    'Register for Event'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {isSuccessModalOpen && (
          <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>}>
            <EventSuccess
              isOpen={isSuccessModalOpen}
              onClose={() => {
                setIsSuccessModalOpen(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  guests: 1,
                  eventTitle: '',
                  date: '',
                  time: '',
                });
              }}
              eventData={eventData || undefined}
            />
          </Suspense>
        )}
        <PreloadedEventSuccess />
      </div>
    </motion.main>
  );
}

export default Events;