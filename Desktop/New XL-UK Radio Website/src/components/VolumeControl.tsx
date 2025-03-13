import React from 'react';
import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react';
import { useAudioPlayer } from '../contexts/useAudioPlayer';

interface VolumeControlProps {
  className?: string;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ className = 'w-24' }) => {
  const { volume, setVolume, isMuted, toggleMute } = useAudioPlayer();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className="h-4 w-4" />;
    if (volume < 0.4) return <Volume className="h-4 w-4" />;
    if (volume < 0.7) return <Volume1 className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  };

  return (
    <div className={`flex items-center ${className}`}>
      <button
        onClick={toggleMute}
        className="text-white hover:text-primary mr-2 focus:outline-none"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {getVolumeIcon()}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={isMuted ? 0 : volume}
        onChange={handleVolumeChange}
        className="w-full h-1.5 bg-dark-medium rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #00eeff ${(isMuted ? 0 : volume) * 100}%, #374151 ${(isMuted ? 0 : volume) * 100}%)`,
        }}
        aria-label="Volume"
        id="volume-control"
        name="volume"
        autoComplete="off"
      />
    </div>
  );
};

export default VolumeControl;
