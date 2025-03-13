import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Instagram, Twitter, Calendar, Clock, Music } from 'lucide-react';
import { useAudio } from '../context/audioUtils';

const DJProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { togglePlay, setCurrentShow } = useAudio();
  
  // Sample data for DJs
  const allDJs = [
    {
      id: 'dj-alex',
      name: 'DJ Alex',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      show: 'Morning Vibes',
      showTime: 'Weekdays 6-10 AM',
      bio: 'DJ Alex has been with XL:UK Radio since its inception, bringing energy and positivity to weekday mornings. With a background in club DJing and a passion for all genres of music, Alex creates the perfect mix to start your day right. When not on air, Alex can be found producing original tracks and remixes in the studio.',
      instagram: 'https://instagram.com/djalex',
      twitter: 'https://twitter.com/djalex',
      featuredTracks: [
        { title: 'Morning Energy Mix', duration: '45 min' },
        { title: 'Weekend Warmup', duration: '60 min' },
        { title: 'Summer Vibes 2025', duration: '55 min' }
      ],
      upcomingEvents: [
        { title: 'XL:UK Radio Summer Festival', date: 'June 15, 2025' },
        { title: 'Club Rhythm Guest Set', date: 'May 28, 2025' }
      ]
    },
    {
      id: 'dj-sarah',
      name: 'DJ Sarah',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      show: 'Afternoon Mix',
      showTime: 'Weekdays 12-3 PM',
      bio: 'DJ Sarah is known for her eclectic taste and smooth transitions. With over 10 years of experience in radio and live events, she brings a wealth of musical knowledge to her afternoon show. Sarah specializes in discovering emerging artists and bringing them to a wider audience. Her Afternoon Mix is the perfect soundtrack to power you through the middle of your day.',
      instagram: 'https://instagram.com/djsarah',
      twitter: 'https://twitter.com/djsarah',
      featuredTracks: [
        { title: 'Lunchtime Grooves', duration: '50 min' },
        { title: 'Indie Discoveries Vol. 3', duration: '65 min' },
        { title: 'Midweek Motivation Mix', duration: '45 min' }
      ],
      upcomingEvents: [
        { title: 'XL:UK Radio Summer Festival', date: 'June 15, 2025' },
        { title: 'Indie Band Showcase', date: 'June 20, 2025' }
      ]
    }
    // Add more DJs as needed
  ];

  const dj = allDJs.find(dj => dj.id === id);

  useEffect(() => {
    // Set the current show when the page loads
    if (dj) {
      setCurrentShow({
        title: dj.show,
        dj: dj.name,
        image: dj.image
      });
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id, setCurrentShow, dj]);

  if (!dj) {
    return (
      <div className="pt-24 md:pt-32 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl font-bold mb-4">DJ Not Found</h1>
          <p className="mb-6">The DJ profile you're looking for doesn't exist or has been removed.</p>
          <Link to="/djs" className="btn btn-primary">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to DJs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <Link to="/djs" className="inline-flex items-center text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to DJs
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
                  src={dj.image} 
                  alt={dj.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h1 className="text-3xl md:text-4xl font-display font-bold">{dj.name}</h1>
                  <p className="text-xl text-gray-300">{dj.show}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center bg-dark-lighter px-4 py-2 rounded-lg">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  <span>{dj.showTime}</span>
                </div>
                <div className="flex items-center space-x-4">
                  {dj.instagram && (
                    <a 
                      href={dj.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {dj.twitter && (
                    <a 
                      href={dj.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">About</h2>
                <p className="text-gray-300 leading-relaxed">{dj.bio}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Featured Mixes</h2>
                <div className="space-y-4">
                  {dj.featuredTracks.map((track, index) => (
                    <motion.div 
                      key={index}
                      className="bg-dark-lighter p-4 rounded-lg flex justify-between items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div>
                        <h3 className="font-medium">{track.title}</h3>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-400 mr-4">{track.duration}</span>
                        <button className="btn btn-primary p-2 rounded-full">
                          <Music className="h-5 w-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
                <div className="space-y-4">
                  {dj.upcomingEvents.map((event, index) => (
                    <motion.div 
                      key={index}
                      className="bg-dark-lighter p-4 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-primary mr-3" />
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-gray-400">{event.date}</p>
                        </div>
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
              <h2 className="text-xl font-semibold mb-4">Listen to {dj.name}</h2>
              <img 
                src={dj.image} 
                alt={dj.name} 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-400 mb-6">
                Tune in to {dj.show} with {dj.name} {dj.showTime}.
              </p>
              <button 
                onClick={() => {
                  togglePlay();
                }}
                className="btn btn-primary w-full mb-4"
              >
                <Music className="mr-2 h-5 w-5" />
                Listen Live
              </button>
              
              <Link to={`/shows/${dj.show.toLowerCase().replace(/\s+/g, '-')}`} className="btn btn-outline w-full">
                Show Details
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DJProfilePage;