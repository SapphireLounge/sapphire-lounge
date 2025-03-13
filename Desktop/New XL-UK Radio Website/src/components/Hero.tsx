import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../context/audioUtils';
import { useState } from 'react';

const Hero = () => {
  const { isPlaying, togglePlay, volume, setVolume } = useAudio();
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume);
    } else {
      setPrevVolume(volume);
      setVolume(0);
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  return (
    <div className="relative min-h-[80vh] flex items-center overflow-hidden pt-24 md:pt-32 pb-16">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-dark/60 to-dark"></div>
      </div>

      {/* Animated circles */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full bg-primary/20 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full bg-secondary/20 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center mx-auto mt-10 md:mt-8">
          {/* XL:UK Radio Logo with hover/tap effect */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 relative"
            onHoverStart={() => setIsLogoHovered(true)}
            onHoverEnd={() => setIsLogoHovered(false)}
            onTap={() => setIsLogoHovered(!isLogoHovered)}
          >
            {/* Underglow effect */}
            <motion.div 
              className="absolute -inset-4 rounded-full bg-[#00eeff]/80 blur-xl z-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isLogoHovered ? 0.9 : 0, 
                scale: isLogoHovered ? 1.1 : 0.8,
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Logo image */}
            <motion.div
              className="relative z-10"
              animate={{ 
                scale: isLogoHovered ? 1.05 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="/xl-uk-logo.png" 
                alt="XL:UK Radio Logo" 
                className="w-48 h-48 md:w-64 md:h-64 object-contain relative z-10"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl text-center px-2"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-display font-bold mb-3">
              The <span className="gradient-text">Sound</span> And <span className="gradient-text">Vibe</span> Of Your City
            </h1>
            <div className="text-lg text-gray-300 mb-5">
              <p className="font-medium text-xl mb-1">Listen Live Anywhere</p>
              <p className="md:whitespace-nowrap">Tune into XL:UK Radio from your phone, tablet or computer</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div>
              <button 
                onClick={togglePlay} 
                className={`py-2.5 px-6 text-base font-semibold rounded-full transition-all duration-300 inline-flex items-center justify-center text-white ${
                  isPlaying 
                  ? "bg-primary hover:bg-primary-dark" 
                  : "bg-gradient-to-r from-primary-dark to-primary hover:from-primary hover:to-primary-dark"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="mr-2 h-5 w-5" />
                    Now Playing
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" />
                    Listen Live
                  </>
                )}
              </button>
            </div>
            
            <div className="h-10 mt-4">
              {isPlaying && (
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={toggleMute}
                    className="p-1 mr-2 rounded-full hover:bg-dark-lighter transition-colors"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Volume2 className="h-5 w-5 text-primary" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 md:w-32 accent-primary"
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;