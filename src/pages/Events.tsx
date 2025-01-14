import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Music, Users, Star } from 'lucide-react';
import EventSuccess from '../components/EventSuccess';

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

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState<EventData>({
    eventId: 0,
    name: localStorage.getItem('eventName') || '',
    email: localStorage.getItem('eventEmail') || '',
    phone: localStorage.getItem('eventPhone') || '',
    guests: 0,
    eventTitle: '',
    date: '',
    time: '',
  });
  const [validationError, setValidationError] = useState<string>('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.guests || !formData.eventTitle || !formData.eventId) {
      setValidationError('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Event registration failed:', data);
        setValidationError(data.error || 'Failed to register for event');
        return;
      }

      // Save form data to localStorage
      localStorage.setItem('eventName', formData.name);
      localStorage.setItem('eventEmail', formData.email);
      localStorage.setItem('eventPhone', formData.phone);

      // Create a new form data object with the QR code
      const updatedFormData = {
        ...formData,
        qrCode: data.data.qrCode
      };
      
      // Update the form data state with all the information
      setFormData(updatedFormData);
      
      // Show the success modal with a delay
      setTimeout(() => {
        setIsSuccessModalOpen(true);
      }, 500);
    } catch (error) {
      console.error('Event registration error:', error);
      setValidationError('Failed to process event registration');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-8 bg-[#020B18]">
      <div className="container mx-auto px-4 max-w-5xl">
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
            Join us for special events and unforgettable experiences. Contact us directly to register for events.
          </p>
          <p className="text-gray-300 text-sm mt-4">
            <span className="font-semibold">Phone:</span> 01792 555888 | <span className="font-semibold">Email:</span> info@sapphirelounge.com
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

        {/* Event Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-dark-500/50 backdrop-blur-sm rounded-xl border border-accent-700/20 shadow-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
              Event Registration
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-6">
                <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-300 mb-2">
                  Select Event *
                </label>
                <select
                  id="eventTitle"
                  value={formData.eventTitle}
                  onChange={handleEventSelect}
                  className="w-full px-4 py-2.5 bg-dark-600 border border-accent-700/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 text-gray-200"
                  required
                  autoComplete="off"
                >
                  <option value="">Select an event</option>
                  {events.map((event) => (
                    <option key={event.id} value={event.title}>
                      {event.title} - {event.date}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-dark-600 border border-accent-700/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 text-gray-200"
                    required
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-dark-600 border border-accent-700/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 text-gray-200"
                    required
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-dark-600 border border-accent-700/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 text-gray-200"
                    required
                    autoComplete="tel"
                  />
                </div>

                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-300 mb-2">
                    Number of Guests *
                  </label>
                  <select
                    id="guests"
                    value={formData.guests || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      guests: parseInt(e.target.value) 
                    }))}
                    className="w-full px-4 py-2.5 bg-dark-600 border border-accent-700/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 text-gray-200"
                    required
                    autoComplete="off"
                  >
                    <option value="">Select number of guests</option>
                    {[...Array(8)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {validationError && (
                <div className="text-red-400 text-sm mt-2 bg-red-900/20 p-3 rounded-lg">
                  {validationError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-primary-400 to-accent-400 text-white rounded-lg font-medium
                  hover:from-primary-500 hover:to-accent-500 focus:outline-none focus:ring-2 focus:ring-primary-300 
                  transition-all duration-300 transform hover:scale-[1.02]"
              >
                Register for Event
              </button>
            </form>
          </div>
        </motion.div>

        <EventSuccess
          isOpen={isSuccessModalOpen}
          onClose={() => {
            setIsSuccessModalOpen(false);
            // Reset form only after closing the success modal
            setFormData({
              eventId: 0,
              name: localStorage.getItem('eventName') || '',
              email: localStorage.getItem('eventEmail') || '',
              phone: localStorage.getItem('eventPhone') || '',
              guests: 0,
              eventTitle: '',
              date: '',
              time: '',
            });
          }}
          eventData={formData}
        />
      </div>
    </div>
  );
}

export default Events;