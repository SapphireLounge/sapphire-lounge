import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAudio } from '../context/audioUtils';
import AudioVisualizer from './AudioVisualizer';

const MiniPlayer = () => {
  const { isPlaying, togglePlay, volume, setVolume, currentShow } = useAudio();
  const [expanded, setExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);

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

  useEffect(() => {
    if (volume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  }, [volume]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="bg-dark-lighter border-t border-dark-medium p-6"
          >
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-6 md:mb-0">
                  {currentShow?.image && (
                    <img 
                      src={currentShow.image} 
                      alt={currentShow.title} 
                      className="w-24 h-24 object-cover rounded-lg mr-6"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">{currentShow?.title || 'Live Broadcast'}</h3>
                    <p className="text-gray-400">{currentShow?.dj || 'XL:UK Radio DJ'}</p>
                    <Link to="/listen-live" className="text-primary hover:text-primary-light mt-2 inline-block">
                      Go to full player
                    </Link>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="h-16">
                    <AudioVisualizer isPlaying={isPlaying} barCount={10} />
                  </div>
                  <button
                    onClick={togglePlay}
                    className="btn btn-primary rounded-full w-12 h-12 flex items-center justify-center mt-4"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                </div>
                
                <div className="flex items-center mt-6 md:mt-0">
                  <button
                    onClick={toggleMute}
                    className="text-gray-400 hover:text-white mr-2"
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 md:w-32"
                    id="mini-player-volume"
                    name="miniPlayerVolume"
                    aria-label="Volume control"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        className="bg-dark-lighter border-t border-dark-medium py-3 px-4 flex items-center justify-between"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <div className="flex items-center">
          <button
            onClick={togglePlay}
            className="btn btn-primary rounded-full w-10 h-10 flex items-center justify-center mr-4"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <div>
            <p className="font-medium">{currentShow?.title || 'Live Broadcast'}</p>
            <p className="text-sm text-gray-400">{currentShow?.dj || 'XL:UK Radio DJ'}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="hidden md:block mr-4 h-8">
            <AudioVisualizer isPlaying={isPlaying} barCount={5} />
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-400 hover:text-white"
          >
            {expanded ? <ChevronDown className="h-6 w-6" /> : <ChevronUp className="h-6 w-6" />}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default MiniPlayer;