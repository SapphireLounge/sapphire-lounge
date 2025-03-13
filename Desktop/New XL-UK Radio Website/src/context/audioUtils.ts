import { createContext, useContext } from 'react';

export interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  volume: number;
  setVolume: (volume: number) => void;
  currentShow: {
    title: string;
    dj: string;
    image: string;
  } | null;
  setCurrentShow: (show: { title: string; dj: string; image: string } | null) => void;
  streamUrl: string;
}

export const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

// Export the stream URL as a constant
export const STREAM_URL = 'https://s3.radio.co/s113a5dc46/listen';
