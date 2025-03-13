import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AudioVisualizerProps {
  isPlaying: boolean;
  barCount?: number;
}

const AudioVisualizer = ({ isPlaying, barCount = 20 }: AudioVisualizerProps) => {
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    // Generate random heights for the bars
    const generateBars = () => {
      return Array.from({ length: barCount }, () => Math.random());
    };

    setBars(generateBars());

    // Update bars periodically if playing
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setBars(generateBars());
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, barCount]);

  return (
    <div className="flex items-end h-full justify-center space-x-0.5">
      {bars.map((height, index) => (
        <motion.div
          key={index}
          className="audio-bar"
          initial={{ height: '10%' }}
          animate={{ 
            height: isPlaying ? `${Math.max(20, height * 100)}%` : '10%' 
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;