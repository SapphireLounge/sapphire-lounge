import React from 'react';
import { Flame } from 'lucide-react';

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full flex items-center justify-center">
        <Flame className="w-6 h-6 text-white absolute" />
      </div>
      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
        Sapphire
      </span>
    </div>
  );
}

export default Logo;