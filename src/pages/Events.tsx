import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Music, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

function Events() {
  const events = [
    {
      id: 1,
      title: "Flavour Tasting Night",
      date: "December 15, 2023",
      time: "7 PM - 10 PM",
      image: "/images/events/cachimberos-o7A76QuFT00-unsplash.jpg",
      description: "Join us for an exclusive tasting of our newest premium flavours."
    },
    {
      id: 2,
      title: "DJ Night",
      date: "December 16, 2023",
      time: "8 PM - 2 AM",
      image: "/images/events/DJ Night.jpg",
      description: "Experience the perfect blend of music and atmosphere with our resident DJ."
    },
    {
      id: 3,
      title: "Student Night",
      date: "December 20, 2023",
      time: "6 PM - 11 PM",
      image: "/images/events/Student Night.avif",
      description: "Special discounts and offers for students. Valid student ID required."
    }
  ];

  return (
    <div className="min-h-screen pt-16 pb-12 bg-[#020B18]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
            Upcoming Events
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Join us for specially curated events, designed to enhance your Sapphire Lounge experience
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {events.map((event, index) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 relative group"
              >
                <div className="relative h-72 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={event.image}
                    alt={`${event.title} at Sapphire Lounge`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 pb-2">
                    <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                    <p className="text-gray-200 text-sm mb-2">{event.description}</p>
                    <div className="flex items-center text-primary-300">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">{event.date} • {event.time}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 pt-2">
                  <Link to="/reservations">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-primary-400 to-accent-500 py-3 rounded-lg font-semibold 
                               hover:from-primary-500 hover:to-accent-600 focus:outline-none focus:ring-2 
                               focus:ring-offset-2 focus:ring-primary-400 transition-all text-white shadow-lg"
                    >
                      Book Now
                    </motion.button>
                  </Link>
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-accent-500/5 opacity-0 
                              group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 relative group overflow-hidden">
              <Music className="w-8 h-8 text-primary-300 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Live Entertainment</h3>
              <p className="text-gray-400">Weekly DJ performances and live music sessions</p>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-accent-500/5 opacity-0 
                            group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 relative group overflow-hidden">
              <Users className="w-8 h-8 text-primary-300 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Private Events</h3>
              <p className="text-gray-400">Book our exclusive space for your special occasions</p>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-accent-500/5 opacity-0 
                            group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 relative group overflow-hidden">
              <Star className="w-8 h-8 text-primary-300 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">VIP Experience</h3>
              <p className="text-gray-400">Enjoy premium service and exclusive benefits</p>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-accent-500/5 opacity-0 
                            group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Events;