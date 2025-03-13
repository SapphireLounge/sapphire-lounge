import { useState, useEffect, ReactNode, useRef } from 'react';
import { AudioContext, AudioContextType, STREAM_URL } from './audioUtils';

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentShow, setCurrentShow] = useState<{ title: string; dj: string; image: string } | null>(null);
  const streamUrl = STREAM_URL;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeRef = useRef(volume);
  
  // Keep volumeRef updated with the latest volume value
  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);
  
  // Initialize audio element when streamUrl changes
  useEffect(() => {
    // Create a new audio element with the stream URL
    audioRef.current = new Audio(streamUrl);
    
    // Set initial volume using the ref (no dependency on volume state)
    if (audioRef.current) {
      audioRef.current.volume = volumeRef.current;
    }
    
    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [streamUrl]);
  
  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  // Set default current show on mount
  useEffect(() => {
    setCurrentShow({
      title: 'XL:UK Radio',
      dj: 'Live Stream',
      image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    });
    
    // In a real implementation, you would fetch metadata from the stream
    // This could be done via Radio.co's API or by parsing stream metadata
  }, []);
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const value: AudioContextType = {
    isPlaying,
    togglePlay,
    volume,
    setVolume,
    currentShow,
    setCurrentShow,
    streamUrl
  };
  
  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};