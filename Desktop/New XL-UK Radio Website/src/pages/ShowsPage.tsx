import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import ShowCard from '../components/ShowCard';

const ShowsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Sample data for shows
  const allShows = [
    {
      id: 'morning-vibes',
      title: 'Morning Vibes',
      dj: 'DJ Alex',
      time: 'Weekdays 6-10 AM',
      image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Start your day with the best music and positive energy to get you going.',
      category: 'weekday'
    },
    {
      id: 'afternoon-mix',
      title: 'Afternoon Mix',
      dj: 'DJ Sarah',
      time: 'Weekdays 12-3 PM',
      image: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'The perfect midday mix to keep your energy up through the afternoon.',
      category: 'weekday'
    },
    {
      id: 'evening-groove',
      title: 'Evening Groove',
      dj: 'DJ Lisa',
      time: 'Weekdays 5-8 PM',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Wind down your day with smooth beats and relaxing tunes.',
      category: 'weekday'
    },
    {
      id: 'late-night',
      title: 'Late Night Sessions',
      dj: 'DJ Mike',
      time: 'Weekdays 10 PM-1 AM',
      image: 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Deep house and electronic beats to take you through the night.',
      category: 'weekday'
    },
    {
      id: 'weekend-party',
      title: 'Weekend Party',
      dj: 'DJ Chris',
      time: 'Saturday 8 PM-12 AM',
      image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'The hottest party tracks to kick off your weekend right.',
      category: 'weekend'
    },
    {
      id: 'sunday-chill',
      title: 'Sunday Chill',
      dj: 'DJ Emma',
      time: 'Sunday 10 AM-2 PM',
      image: 'https://images.unsplash.com/photo-1519111887837-a48ccf9edc00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Relaxing tunes to help you unwind and recharge for the week ahead.',
      category: 'weekend'
    },
    {
      id: 'throwback-thursday',
      title: 'Throwback Thursday',
      dj: 'DJ Tom',
      time: 'Thursday 7-10 PM',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Classic hits from the 80s, 90s, and 2000s to take you back in time.',
      category: 'special'
    },
    {
      id: 'indie-spotlight',
      title: 'Indie Spotlight',
      dj: 'DJ Olivia',
      time: 'Wednesday 8-10 PM',
      image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Discover the best new indie artists and underground tracks.',
      category: 'special'
    }
  ];

  // Filter shows based on search term and active filter
  const filteredShows = allShows.filter(show => {
    const matchesSearch = show.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          show.dj.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || show.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Our Shows</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover all of our radio shows and find your new favourite programme to tune into.
          </p>
        </motion.div>

        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search shows or DJs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg bg-dark-lighter border border-dark-medium focus:outline-none focus:border-primary"
                id="shows-search"
                name="showsSearch"
                aria-label="Search shows or DJs"
                autoComplete="off"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2 w-full md:w-auto">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeFilter === 'all' 
                    ? 'bg-primary text-white' 
                    : 'bg-dark-lighter text-gray-300 hover:bg-dark-light'
                }`}
              >
                All Shows
              </button>
              <button
                onClick={() => setActiveFilter('weekday')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeFilter === 'weekday' 
                    ? 'bg-primary text-white' 
                    : 'bg-dark-lighter text-gray-300 hover:bg-dark-light'
                }`}
              >
                Weekday
              </button>
              <button
                onClick={() => setActiveFilter('weekend')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeFilter === 'weekend' 
                    ? 'bg-primary text-white' 
                    : 'bg-dark-lighter text-gray-300 hover:bg-dark-light'
                }`}
              >
                Weekend
              </button>
              <button
                onClick={() => setActiveFilter('special')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeFilter === 'special' 
                    ? 'bg-primary text-white' 
                    : 'bg-dark-lighter text-gray-300 hover:bg-dark-light'
                }`}
              >
                Special
              </button>
            </div>
          </div>
        </div>

        {filteredShows.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShows.map((show, index) => (
              <ShowCard key={show.id} {...show} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No shows found matching your search.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setActiveFilter('all');
              }}
              className="mt-4 text-primary hover:text-primary-light"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowsPage;