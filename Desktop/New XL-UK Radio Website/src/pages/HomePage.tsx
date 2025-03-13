import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import Hero from '../components/Hero';
import ShowCard from '../components/ShowCard';
import NewsCard from '../components/NewsCard';
import EventCard from '../components/EventCard';
import SuccessModal from '../components/SuccessModal';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Sample data for featured shows
  const featuredShows = [
    {
      id: 'morning-vibes',
      title: 'Morning Vibes',
      dj: 'DJ Alex',
      time: 'Weekdays 6-10 AM',
      image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Start your day with the best music and positive energy to get you going.'
    },
    {
      id: 'afternoon-mix',
      title: 'Afternoon Mix',
      dj: 'DJ Sarah',
      time: 'Weekdays 12-3 PM',
      image: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'The perfect midday mix to keep your energy up through the afternoon.'
    },
    {
      id: 'evening-groove',
      title: 'Evening Groove',
      dj: 'DJ Lisa',
      time: 'Weekdays 5-8 PM',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Wind down your day with smooth beats and relaxing tunes.'
    }
  ];

  // Sample data for latest news
  const latestNews = [
    {
      id: 'summer-festival',
      title: 'XL:UK Radio Summer Festival Announced',
      date: 'May 15, 2025',
      image: '/images/festival.jpg',
      excerpt: 'Get ready for the biggest music event of the summer! XL:UK Radio is proud to announce our annual Summer Festival, featuring top artists and DJs.',
      category: 'Events'
    },
    {
      id: 'new-dj',
      title: 'Welcoming Our New Weekend DJ',
      date: 'May 10, 2025',
      image: '/images/dj.jpg',
      excerpt: 'XL:UK Radio is excited to welcome DJ Max to our weekend lineup. Bringing fresh beats and energy to your Saturday nights.',
      category: 'Staff'
    }
  ];

  // Sample data for upcoming events
  const upcomingEvents = [
    {
      title: 'XL:UK Radio Summer Festival',
      date: 'June 15, 2025',
      time: '12:00 PM - 10:00 PM',
      location: 'City Park Amphitheatre',
      image: '/images/event1.jpg'
    },
    {
      title: 'DJ Battle Night',
      date: 'May 28, 2025',
      time: '8:00 PM - 1:00 AM',
      location: 'Club Rhythm',
      image: '/images/event2.jpg'
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the email to your backend API
    // For now, we'll just show the success modal
    if (email.trim() !== '') {
      setShowSuccessModal(true);
      setEmail('');
    }
  };

  return (
    <div>
      <Hero />

      {/* Featured Shows */}
      <section className="pt-10 pb-10 bg-dark/80 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
            <div className="mb-3 sm:mb-0">
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-1 sm:mb-2">Featured Shows</h2>
              <p className="text-gray-400 text-sm sm:text-base">Tune in to our most popular radio shows</p>
            </div>
            <Link to="/shows" className="text-primary hover:text-primary-light flex items-center text-sm sm:text-base">
              View All Shows
              <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredShows.map((show, index) => (
              <ShowCard key={show.id} {...show} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest News & Events */}
      <section className="py-8 sm:py-10 bg-dark/70">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Latest News */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-display font-bold mb-2 sm:mb-0">Latest News</h2>
                <Link to="/news" className="text-primary hover:text-primary-light flex items-center text-sm sm:text-base">
                  All News
                  <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {latestNews.map((news, index) => (
                  <div key={news.id} className="h-[380px]">
                    <NewsCard {...news} index={index} />
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="mt-8 lg:mt-0">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-display font-bold mb-2 sm:mb-0">Upcoming Events</h2>
                <Link to="/events" className="text-primary hover:text-primary-light flex items-center text-sm sm:text-base">
                  All Events
                  <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="h-[380px]">
                    <EventCard {...event} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-8 sm:py-10 bg-dark-lighter/90 mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3 sm:mb-4">Stay Connected</h2>
            <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base">
              Subscribe to our newsletter to get the latest updates on shows, events, and exclusive content.
            </p>
            <form 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto"
              onSubmit={handleNewsletterSubmit}
            >
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-dark border border-dark-medium focus:outline-none focus:border-primary text-sm sm:text-base"
                required
                id="newsletter-email"
                name="email"
                aria-label="Email address for newsletter"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary whitespace-nowrap text-sm sm:text-base py-2 sm:py-3">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)}
        message="Thank you for subscribing to the XL:UK Radio newsletter! You'll now receive the latest updates on shows, events, and exclusive content directly to your inbox."
      />
    </div>
  );
};

export default HomePage;