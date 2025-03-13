import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Clock, Calendar, User, ArrowLeft } from 'lucide-react';
import { useAudio } from '../context/audioUtils';

const ShowDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { togglePlay, setCurrentShow } = useAudio();
  
  // Sample data for shows
  const allShows = [
    {
      id: 'morning-vibes',
      title: 'Morning Vibes',
      dj: 'DJ Alex',
      time: 'Weekdays 6-10 AM',
      image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Start your day with the best music and positive energy to get you going.',
      longDescription: 'Morning Vibes is the perfect way to kickstart your day with a mix of upbeat tunes, the latest hits, and positive energy. DJ Alex brings you four hours of great music, news updates, weather forecasts, and entertaining segments to make your morning commute more enjoyable. Tune in for celebrity interviews, listener call-ins, and the hottest tracks to set the tone for your day.',
      schedule: 'Monday to Friday, 6:00 AM - 10:00 AM',
      socialMedia: {
        instagram: 'https://instagram.com/djalex',
        twitter: 'https://twitter.com/djalex'
      },
      episodes: [
        { date: 'May 15, 2025', title: 'Interview with Pop Star Emma', duration: '45 min' },
        { date: 'May 14, 2025', title: 'New Music Wednesday', duration: '60 min' },
        { date: 'May 13, 2025', title: 'Throwback Tuesday', duration: '55 min' }
      ]
    },
    {
      id: 'afternoon-mix',
      title: 'Afternoon Mix',
      dj: 'DJ Sarah',
      time: 'Weekdays 12-3 PM',
      image: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'The perfect midday mix to keep your energy up through the afternoon.',
      longDescription: 'The Afternoon Mix is designed to keep your energy levels high during the midday slump. DJ Sarah curates a perfect blend of current hits, classic favourites, and hidden gems across various genres. The show features interactive segments, listener requests, and special themed days to make your afternoon more enjoyable. Whether you\'re at work, running errands, or just relaxing at home, the Afternoon Mix provides the perfect soundtrack.',
      schedule: 'Monday to Friday, 12:00 PM - 3:00 PM',
      socialMedia: {
        instagram: 'https://instagram.com/djsarah',
        twitter: 'https://twitter.com/djsarah'
      },
      episodes: [
        { date: 'May 15, 2025', title: 'Throwback Thursday Special', duration: '60 min' },
        { date: 'May 14, 2025', title: 'Listener Request Hour', duration: '60 min' },
        { date: 'May 13, 2025', title: 'New Releases Spotlight', duration: '45 min' }
      ]
    },
    // Add more shows as needed
  ];

  const show = allShows.find(show => show.id === id);

  useEffect(() => {
    // Set the current show when the page loads
    if (show) {
      setCurrentShow({
        title: show.title,
        dj: show.dj,
        image: show.image
      });
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id, setCurrentShow, show]);

  if (!show) {
    return (
      <div className="pt-24 md:pt-32 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Show Not Found</h1>
          <p className="mb-6">The show you're looking for doesn't exist or has been removed.</p>
          <Link to="/shows" className="btn btn-primary">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Shows
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <Link to="/shows" className="inline-flex items-center text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Shows
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-6">
                <img 
                  src={show.image} 
                  alt={show.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h1 className="text-3xl md:text-4xl font-display font-bold">{show.title}</h1>
                  <p className="text-xl text-gray-300">{show.dj}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center bg-dark-lighter px-4 py-2 rounded-lg">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  <span>{show.time}</span>
                </div>
                <div className="flex items-center bg-dark-lighter px-4 py-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary mr-2" />
                  <span>{show.schedule}</span>
                </div>
                <div className="flex items-center bg-dark-lighter px-4 py-2 rounded-lg">
                  <User className="h-5 w-5 text-primary mr-2" />
                  <span>{show.dj}</span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">About the Show</h2>
                <p className="text-gray-300 leading-relaxed mb-4">{show.longDescription}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Recent Episodes</h2>
                <div className="space-y-4">
                  {show.episodes.map((episode, index) => (
                    <motion.div 
                      key={index}
                      className="bg-dark-lighter p-4 rounded-lg flex justify-between items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div>
                        <p className="text-sm text-gray-400">{episode.date}</p>
                        <h3 className="font-medium">{episode.title}</h3>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-400 mr-4">{episode.duration}</span>
                        <button className="btn btn-primary p-2 rounded-full">
                          <Play className="h-5 w-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-dark-lighter rounded-xl p-6 sticky top-24"
            >
              <h2 className="text-xl font-semibold mb-4">Listen Now</h2>
              <img 
                src={show.image} 
                alt={show.title} 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-400 mb-6">
                Tune in to {show.title} with {show.dj} and enjoy the best music and entertainment.
              </p>
              <button 
                onClick={() => {
                  togglePlay();
                }}
                className="btn btn-primary w-full mb-4"
              >
                <Play className="mr-2 h-5 w-5" />
                Listen Live
              </button>
              
              <h3 className="font-medium mb-3 mt-6">Follow {show.dj}</h3>
              <div className="flex space-x-4">
                {show.socialMedia.instagram && (
                  <a 
                    href={show.socialMedia.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Instagram
                  </a>
                )}
                {show.socialMedia.twitter && (
                  <a 
                    href={show.socialMedia.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Twitter
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetailPage;