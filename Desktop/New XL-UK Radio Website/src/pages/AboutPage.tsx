import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Radio, Music, Users, Award, Heart, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('about');

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };

  const staggerItem = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
    }
  };

  return (
    <>
      <Helmet>
        <title>About Us | XL:UK Radio</title>
        <meta name="description" content="Learn about XL:UK Radio, Swansea's premier urban, dance and alternative music station broadcasting to the UK and worldwide." />
      </Helmet>

      <div className="pt-24 md:pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">About XL:UK Radio</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Swansea's premier urban, dance and alternative music station broadcasting to the UK and worldwide.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-10 border-b border-dark-medium">
            <button 
              className={`px-6 py-3 font-medium text-lg transition-colors duration-300 ${activeTab === 'about' ? 'text-primary border-b-2 border-primary -mb-px' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('about')}
            >
              Our Story
            </button>
            <button 
              className={`px-6 py-3 font-medium text-lg transition-colors duration-300 ${activeTab === 'mission' ? 'text-primary border-b-2 border-primary -mb-px' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('mission')}
            >
              Mission & Values
            </button>
            <button 
              className={`px-6 py-3 font-medium text-lg transition-colors duration-300 ${activeTab === 'community' ? 'text-primary border-b-2 border-primary -mb-px' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('community')}
            >
              Community Impact
            </button>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {/* Our Story Tab */}
            {activeTab === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-10">
                  <div className="relative overflow-hidden rounded-xl mb-8">
                    <img 
                      src="/images/studio.jpg" 
                      alt="XL:UK Radio Studio" 
                      className="w-full h-[300px] md:h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-70"></div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Our Story</h2>
                  
                  <p className="text-gray-300 mb-4">
                    XL:UK Radio was established in Swansea as a community-focused radio station dedicated to bringing the best urban, dance, and alternative music to listeners across the UK and worldwide. What began as a passion project has grown into a vibrant platform that connects artists, DJs, and music lovers.
                  </p>
                  
                  <p className="text-gray-300 mb-4">
                    Based in the heart of Swansea at 10 High Street, High Street Arcade, our station has become a cultural hub for music enthusiasts. We pride ourselves on showcasing both established and emerging talent, with a particular focus on supporting local artists and the Welsh music scene.
                  </p>

                  <p className="text-gray-300">
                    Over the years, XL:UK Radio has expanded its reach beyond traditional radio broadcasting. Today, our station is available on multiple platforms, allowing listeners to tune in from anywhere in the world. Our dedicated team of presenters and DJs work tirelessly to create engaging content that resonates with our diverse audience.
                  </p>
                  
                  <p className="text-gray-300 mt-4 bg-dark-lighter p-4 rounded-lg border-l-4 border-primary">
                    <strong className="text-primary">Listen Anywhere:</strong> XL:UK Radio is available through our official app, Cardiff DAB, and various popular streaming platforms, making it easier than ever to enjoy your favorite shows and music wherever you are.
                  </p>
                </div>

                <motion.div 
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <motion.div variants={staggerItem} className="bg-dark-lighter rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <Radio className="h-8 w-8 text-primary mr-3" />
                      <h3 className="text-xl font-semibold">24/7 Broadcasting</h3>
                    </div>
                    <p className="text-gray-300">
                      We broadcast 24 hours a day, 7 days a week, bringing you the freshest tracks and engaging shows around the clock.
                    </p>
                  </motion.div>

                  <motion.div variants={staggerItem} className="bg-dark-lighter rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <Music className="h-8 w-8 text-primary mr-3" />
                      <h3 className="text-xl font-semibold">Diverse Music Selection</h3>
                    </div>
                    <p className="text-gray-300">
                      From urban beats to dance anthems and alternative tracks, our music selection caters to a wide range of tastes.
                    </p>
                  </motion.div>

                  <motion.div variants={staggerItem} className="bg-dark-lighter rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <Users className="h-8 w-8 text-primary mr-3" />
                      <h3 className="text-xl font-semibold">Talented Presenters</h3>
                    </div>
                    <p className="text-gray-300">
                      Our roster features passionate presenters and DJs who bring expertise, energy, and personality to every show.
                    </p>
                  </motion.div>

                  <motion.div variants={staggerItem} className="bg-dark-lighter rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <Calendar className="h-8 w-8 text-primary mr-3" />
                      <h3 className="text-xl font-semibold">Regular Events</h3>
                    </div>
                    <p className="text-gray-300">
                      We organize and participate in various events throughout the year, from music festivals to community gatherings.
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Mission & Values Tab */}
            {activeTab === 'mission' && (
              <motion.div
                key="mission"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Our Mission & Values</h2>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3 text-primary">Mission Statement</h3>
                  <p className="text-gray-300 mb-6">
                    At XL:UK Radio, our mission is to connect, inspire, and entertain through the power of music. We strive to provide a platform that celebrates diversity, promotes emerging talent, and brings communities together through shared musical experiences.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-primary">Our Vision</h3>
                  <p className="text-gray-300 mb-6">
                    We envision a world where music transcends boundaries, where artists have platforms to share their voices, and where communities are strengthened through cultural expression. XL:UK Radio aims to be at the forefront of this vision, continuously evolving to meet the needs of our listeners and the music industry.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-dark-lighter to-dark-light p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-semibold mb-4">Core Values</h3>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-4">
                        <span className="font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Passion for Music</h4>
                        <p className="text-gray-300">We are driven by our love for music in all its forms and expressions.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-4">
                        <span className="font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Community Focus</h4>
                        <p className="text-gray-300">We prioritize building and supporting our local and global communities.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-4">
                        <span className="font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Innovation</h4>
                        <p className="text-gray-300">We embrace new technologies and approaches to enhance the radio experience.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-4">
                        <span className="font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Diversity & Inclusion</h4>
                        <p className="text-gray-300">We celebrate diverse voices, perspectives, and musical styles.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-4">
                        <span className="font-bold">5</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Quality Content</h4>
                        <p className="text-gray-300">We are committed to delivering high-quality programming and experiences.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Link to="/roster" className="btn btn-primary py-2.5 px-8 text-base">
                    Meet Our Team
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Community Impact Tab */}
            {activeTab === 'community' && (
              <motion.div
                key="community"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Community Impact</h2>
                  
                  <p className="text-gray-300 mb-4">
                    At XL:UK Radio, we believe in the power of music to bring people together and create positive change. Our commitment to the community extends beyond broadcasting – we actively engage with local initiatives, support charitable causes, and provide platforms for important conversations.
                  </p>
                  
                  <div className="relative overflow-hidden rounded-xl my-8">
                    <img 
                      src="/images/charity.jpg" 
                      alt="XL:UK Radio Community Event" 
                      className="w-full h-[250px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-70"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="bg-dark-lighter rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Heart className="h-6 w-6 text-primary mr-2" />
                      Supporting Local Talent
                    </h3>
                    <p className="text-gray-300 mb-3">
                      We provide a platform for emerging artists from Swansea and across Wales to showcase their music and reach new audiences. Through dedicated segments and special features, we help local talent gain exposure and connect with industry professionals.
                    </p>
                    <p className="text-gray-300">
                      Our "Spotlight" sessions highlight new releases from local artists, and we regularly invite musicians to the studio for live performances and interviews.
                    </p>
                  </div>

                  <div className="bg-dark-lighter rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Award className="h-6 w-6 text-primary mr-2" />
                      Educational Initiatives
                    </h3>
                    <p className="text-gray-300 mb-3">
                      XL:UK Radio is committed to nurturing the next generation of radio talent. We offer workshops, internships, and mentoring programs for those interested in broadcasting, production, and music journalism.
                    </p>
                    <p className="text-gray-300">
                      Our team regularly visits local schools and colleges to share insights about the radio industry and inspire young people to pursue their passion for music and media.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4">Charitable Partnerships</h3>
                  <p className="text-gray-300 mb-6">
                    Throughout the year, XL:UK Radio partners with various charitable organizations to raise awareness and funds for important causes. From charity broadcasts to sponsored events, we leverage our platform to make a positive difference in our community.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-dark-medium/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Annual Fundraising Drive</h4>
                      <p className="text-gray-400 text-sm">
                        Our annual 24-hour broadcast marathon raises funds for local charities, featuring special guests and community challenges.
                      </p>
                    </div>
                    <div className="bg-dark-medium/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Community Spotlight</h4>
                      <p className="text-gray-400 text-sm">
                        Monthly segments dedicated to highlighting local non-profits and community initiatives making a difference in Swansea.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-300 mb-6">
                    Want to collaborate with us on a community project or charitable initiative?
                  </p>
                  <Link to="/contact" className="btn btn-primary py-2.5 px-8 text-base">
                    Get In Touch
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
