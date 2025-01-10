import { motion } from 'framer-motion';
import { Calendar, Music, Users, Star } from 'lucide-react';
import { useState } from 'react';
import EventSuccess from '../components/EventSuccess';

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
  const [formData, setFormData] = useState({
    name: localStorage.getItem('eventName') || '',
    email: localStorage.getItem('eventEmail') || '',
    phone: localStorage.getItem('eventPhone') || '',
    guests: '',
    eventTitle: '',
    date: '',
    time: ''
  });
  const [validationError, setValidationError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Validate required fields
    const requiredFields = [
      { field: formData.name, name: 'Name' },
      { field: formData.email, name: 'Email' },
      { field: formData.phone, name: 'Phone' },
      { field: formData.guests, name: 'Number of Guests' },
      { field: formData.eventTitle, name: 'Event Title' }
    ];

    const missingFields = requiredFields
      .filter(({ field }) => !field)
      .map(({ name }) => name);

    if (missingFields.length > 0) {
      setValidationError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Save to localStorage
    localStorage.setItem('eventName', formData.name);
    localStorage.setItem('eventEmail', formData.email);
    localStorage.setItem('eventPhone', formData.phone);

    // Show success modal with delay
    setTimeout(() => {
      setIsSuccessModalOpen(true);
    }, 500);
  };

  const handleEventSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEventTitle = e.target.value;
    const selectedEvent = events.find(event => event.title === selectedEventTitle);
    
    if (selectedEvent) {
      setFormData(prev => ({
        ...prev,
        eventTitle: selectedEvent.title,
        date: selectedEvent.date,
        time: selectedEvent.time
      }));
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

        {/* Event Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-dark-500/50 backdrop-blur-sm rounded-xl p-6 border border-accent-700/20 shadow-xl max-w-2xl mx-auto mt-12"
        >
          <h2 className="text-2xl font-semibold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
            Event Registration
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {validationError && (
              <div className="p-3 rounded-lg bg-red-900/50 border border-red-500/50 text-red-200 text-sm">
                {validationError}
              </div>
            )}
            
            {/* Event Selection */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Select Event</label>
              <div className="relative">
                <Calendar className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                <select
                  id="event"
                  className="w-full pl-9 pr-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent cursor-pointer hover:border-neutral-600 transition-colors appearance-none text-white"
                  value={formData.eventTitle}
                  onChange={handleEventSelect}
                  required
                >
                  <option value="" className="text-gray-400">Select an Event</option>
                  {events.map(event => (
                    <option key={event.id} value={event.title} className="text-white">{event.title}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Name Input */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Name</label>
              <input 
                type="text" 
                placeholder="Your name" 
                className="w-full pl-3 pr-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-gray-400"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                required 
              />
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full pl-3 pr-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-gray-400"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                required 
              />
            </div>

            {/* Phone Input */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Phone</label>
              <input 
                type="tel" 
                placeholder="Your phone number" 
                className="w-full pl-3 pr-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-white placeholder-gray-400"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                required 
              />
            </div>

            {/* Number of Guests Input */}
            <div>
              <label htmlFor="guests" className="block text-sm font-medium mb-2">
                Number of Guests <span className="text-red-500">*</span>
              </label>
              <select
                id="guests"
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                required
              >
                <option value="" disabled>Select number of guests</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <button 
              type="submit" 
              className="w-full py-3 px-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-accent-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500 transition-colors"
            >
              Book Now
            </button>
          </form>
        </motion.div>

        <EventSuccess isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} eventData={formData} />
      </div>
    </div>
  );
}

export default Events;