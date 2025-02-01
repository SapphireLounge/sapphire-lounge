import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturedEventsProps {
  titleClassName?: string;
  buttonClassName?: string;
}

function FeaturedEvents({ titleClassName, buttonClassName }: FeaturedEventsProps) {
  const events = [
    {
      id: 1,
      title: "Flavour Tasting Night",
      date: "February 15, 2025",
      image: "/images/events/cachimberos-o7A76QuFT00-unsplash.jpg",
      description: "Join us for an exclusive tasting of our newest premium flavours."
    },
    {
      id: 2,
      title: "DJ Night",
      date: "February 20, 2025",
      image: "/images/events/DJ Night.jpg",
      description: "Experience the perfect blend of music and atmosphere with our resident DJ."
    },
    {
      id: 3,
      title: "Student Night",
      date: "February 25, 2025",
      image: "/images/events/Student Night.avif",
      description: "Special discounts and offers for students. Valid student ID required."
    }
  ];

  return (
    <section className="pt-8 pb-2 bg-[#020B18]">
      <div className="container mx-auto px-4">
        <h2 className={`text-2xl md:text-3xl font-bold text-center mb-[0.0625rem] bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 pb-0.5 ${titleClassName}`}>
          Upcoming Events
        </h2>
        <p className="text-gray-400 text-center mt-1.5 mb-2 md:mb-6 max-w-3xl mx-auto text-base">
          Join us for our specially curated events, designed to enhance your Sapphire Lounge experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events.map((event) => (
            <motion.article
              key={event.id}
              whileHover={{ y: -5 }}
              className="bg-dark-950/80 backdrop-blur-sm rounded-lg overflow-hidden border border-accent-700/20 shadow-lg"
            >
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  src={event.image}
                  alt={`${event.title} event at Sapphire Lounge`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-dark-500/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 pb-2">
                  <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                  <p className="text-gray-200 text-sm">{event.description}</p>
                </div>
              </div>
              <div className="p-3 pt-2">
                <div className="flex items-center text-primary-300 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{event.date}</span>
                </div>
                <Link to="/events" className={`w-full bg-gradient-to-r from-primary-400 to-accent-500 py-2 rounded-md font-semibold hover:from-primary-500 hover:to-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 transition-all text-white shadow-lg text-sm ${buttonClassName}`}>
                  RSVP Now
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedEvents;