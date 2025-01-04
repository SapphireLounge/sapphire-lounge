import { useCallback } from 'react';

export const useHaptics = () => {
  const triggerHaptic = useCallback(() => {
    // Check if the device supports vibration
    if ('vibrate' in navigator) {
      // Short vibration for menu selection
      navigator.vibrate(50);
    }
  }, []);

  return { triggerHaptic };
};
