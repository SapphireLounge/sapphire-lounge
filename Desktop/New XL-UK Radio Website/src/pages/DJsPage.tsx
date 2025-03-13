import { motion } from 'framer-motion';
import DJCard from '../components/DJCard';

const DJsPage = () => {
  // Sample data for DJs
  const djs = [
    {
      id: 'dj-alex',
      name: 'DJ Alex',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      show: 'Morning Vibes',
      instagram: 'https://instagram.com/djalex',
      twitter: 'https://twitter.com/djalex',
      facebook: 'https://facebook.com/djalex'
    },
    {
      id: 'dj-sarah',
      name: 'DJ Sarah',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      show: 'Afternoon Mix',
      instagram: 'https://instagram.com/djsarah',
      twitter: 'https://twitter.com/djsarah',
      facebook: 'https://facebook.com/djsarah'
    },
    {
      id: 'dj-lisa',
      name: 'DJ Lisa',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      show: 'Evening Groove',
      instagram: 'https://instagram.com/djlisa',
      twitter: 'https://twitter.com/djlisa',
      facebook: 'https://facebook.com/djlisa'
    },
    {
      id: 'dj-mike',
      name: 'DJ Mike',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      show: 'Late Night Sessions',
      instagram: 'https://instagram.com/djmike',
      twitter: 'https://twitter.com/djmike',
      facebook: 'https://facebook.com/djmike'
    },
    {
      id: 'dj-chris',
      name: 'DJ Chris',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      show: 'Weekend Party',
      instagram: 'https://instagram.com/djchris',
      twitter: 'https://twitter.com/djchris',
      facebook: 'https://facebook.com/djchris'
    },
    {
      id: 'dj-emma',
      name: 'DJ Emma',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      show: 'Sunday Chill',
      instagram: 'https://instagram.com/djemma',
      twitter: 'https://twitter.com/djemma',
      facebook: 'https://facebook.com/djemma'
    },
    {
      id: 'dj-tom',
      name: 'DJ Tom',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      show: 'Throwback Thursday',
      instagram: 'https://instagram.com/djtom',
      twitter: 'https://twitter.com/djtom',
      facebook: 'https://facebook.com/djtom'
    },
    {
      id: 'dj-olivia',
      name: 'DJ Olivia',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      show: 'Indie Spotlight',
      instagram: 'https://instagram.com/djolivia',
      twitter: 'https://twitter.com/djolivia',
      facebook: 'https://facebook.com/djolivia'
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
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Meet Our Presenters</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The talented voices and personalities behind your favourite radio shows.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {djs.map((dj, index) => (
            <DJCard key={dj.id} {...dj} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-dark-lighter rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-display font-bold mb-4">Want to Join Our Team?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            XL:UK Radio is always looking for fresh talent. If you're passionate about music and radio, 
            we'd love to hear from you!
          </p>
          <a href="/contact" className="btn btn-primary">
            Apply Now
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default DJsPage;