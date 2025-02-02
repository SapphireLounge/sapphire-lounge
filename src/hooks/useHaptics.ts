import { useCallback, useEffect, useState } from 'react';

export type HapticPattern = 'select' | 'delete' | 'increment' | 'decrement';

export const useHaptics = () => {
  const [hasHaptics, setHasHaptics] = useState(false);

  useEffect(() => {
    // Check for vibration support
    const hasVibration = typeof navigator !== 'undefined' && 'vibrate' in navigator;
    setHasHaptics(hasVibration);
  }, []);

  const getPattern = (pattern: HapticPattern): number[] => {
    switch (pattern) {
      case 'select':
        return [50]; // Increased duration for better feel
      case 'delete':
        return [100, 50, 100]; // Increased duration for better feel
      case 'increment':
        return [35]; // Increased duration for better feel
      case 'decrement':
        return [45]; // Increased duration for better feel
      default:
        return [50];
    }
  };

  const triggerHaptic = useCallback((pattern: HapticPattern = 'select') => {
    if (!hasHaptics) return;

    try {
      // Use standard vibration API
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(getPattern(pattern));
      }
    } catch (error) {
      console.debug('Haptics not available:', error);
    }
  }, [hasHaptics]);

  return { triggerHaptic, hasHaptics };
};

export default useHaptics;
