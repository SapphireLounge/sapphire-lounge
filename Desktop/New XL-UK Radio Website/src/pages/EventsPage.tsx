import { motion } from 'framer-motion';
import EventCard from '../components/EventCard';

const EventsPage = () => {
  // Sample data for events
  const upcomingEvents = [
    {
      title: 'XL:UK Radio Summer Festival',
      date: 'June 15, 2025',
      time: '12:00 PM - 10:00 PM',
      location: 'City Park Amphitheatre',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'DJ Battle Night',
      date: 'May 28, 2025',
      time: '8:00 PM - 1:00 AM',
      location: 'Club Rhythm',
      image: 'https://images.unsplash.com/photo-1571266028253-6c7f1cffe321?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Live Acoustic Session',
      date: 'June 5, 2025',
      time: '7:00 PM - 10:00 PM',
      location: 'The Melody Lounge',
      image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Indie Band Showcase',
      date: 'June 20, 2025',
      time: '6:00 PM - 11:00 PM',
      location: 'Underground Stage',
      image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Electronic Music Night',
      date: 'July 3, 2025',
      time: '9:00 PM - 3:00 AM',
      location: 'Pulse Nightclub',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'XL:UK Radio Charity Concert',
      date: 'July 15, 2025',
      time: '6:00 PM - 11:00 PM',
      location: 'City Concert Hall',
      image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Sample data for past events
  const pastEvents = [
    {
      title: 'Spring Music Festival',
      date: 'April 10, 2025',
      time: '1:00 PM - 11:00 PM',
      location: 'Riverside Park',
      image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'DJ Workshop',
      date: 'March 25, 2025',
      time: '2:00 PM - 5:00 PM',
      location: 'XL:UK Radio Studio',
      image: 'https://images.unsplash.com/photo-1571266028253-6c7f1cffe321?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Events</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join us at our upcoming events and experience the best music and entertainment live.
          </p>
        </motion.div>

        <div className="mb-16">
          <h2 className="text-2xl font-display font-bold mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <EventCard key={index} {...event} index={index} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-display font-bold mb-8">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <EventCard key={index} {...event} index={index} />
            ))}
          </div>
        </div>

        <div className="mt-16 bg-dark-lighter rounded-xl p-8 text-center">
          <h2 className="text-2xl font-display font-bold mb-4">Host Your Event with XL:UK Radio</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Looking to host a music event? Partner with XL:UK Radio for promotion, DJs, and more. 
            We can help make your event a success!
          </p>
          <a href="/contact" className="btn btn-primary">
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;