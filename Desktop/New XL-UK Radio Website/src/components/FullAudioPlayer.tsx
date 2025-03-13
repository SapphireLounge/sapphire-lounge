import React, { useRef, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAudio } from '../context/audioUtils';

const FullAudioPlayer = () => {
  const { isPlaying, togglePlay, volume, setVolume, currentShow } = useAudio();
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#FF4D8C',
        progressColor: '#FF0266',
        cursorColor: 'transparent',
        barWidth: 3,
        barGap: 2,
        barRadius: 3,
        height: 80,
        normalize: true,
        interact: false,
      });

      // Load the Radio.co stream URL
      wavesurfer.current.load('https://s3.radio.co/s113a5dc46/listen');

      return () => {
        if (wavesurfer.current) {
          wavesurfer.current.destroy();
        }
      };
    }
  }, []);

  useEffect(() => {
    if (wavesurfer.current) {
      if (isPlaying) {
        wavesurfer.current.play();
      } else {
        wavesurfer.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.setVolume(volume);
    }
  }, [volume]);

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
    <div className="bg-dark-lighter rounded-xl p-6 shadow-lg">
      <div className="flex flex-col md:flex-row items-center mb-6">
        {currentShow?.image && (
          <img 
            src={currentShow.image} 
            alt={currentShow.title} 
            className="w-32 h-32 object-cover rounded-lg mr-6 mb-4 md:mb-0"
          />
        )}
        <div>
          <h2 className="text-2xl font-semibold">{currentShow?.title || 'Live Broadcast'}</h2>
          <p className="text-gray-400 text-lg">{currentShow?.dj || 'XL:UK Radio DJ'}</p>
          <div className="flex items-center mt-4">
            <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
              LIVE
            </div>
            <div className="ml-3 text-gray-400">
              <span className="animate-pulse inline-block h-2 w-2 rounded-full bg-primary mr-2"></span>
              On Air Now
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6" ref={waveformRef}></div>

      <div className="flex flex-col md:flex-row items-center justify-between">
        <button
          onClick={togglePlay}
          className="btn btn-primary rounded-full w-14 h-14 flex items-center justify-center mb-4 md:mb-0"
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </button>

        <div className="flex items-center">
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
            className="w-32 md:w-48"
            id="full-player-volume"
            name="fullPlayerVolume"
            aria-label="Volume control"
            autoComplete="off"
          />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Coming Up Next</h3>
        <div className="space-y-4">
          {[
            { time: '12:00 PM', title: 'Afternoon Mix', dj: 'DJ Sarah' },
            { time: '3:00 PM', title: 'The Throwback Hour', dj: 'DJ Mike' },
            { time: '5:00 PM', title: 'Evening Groove', dj: 'DJ Lisa' }
          ].map((show, index) => (
            <motion.div 
              key={index}
              className="flex items-center p-3 rounded-lg hover:bg-dark-light transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="w-20 text-gray-400">{show.time}</div>
              <div>
                <p className="font-medium">{show.title}</p>
                <p className="text-sm text-gray-400">{show.dj}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullAudioPlayer;