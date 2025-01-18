import { useCallback } from 'react';

export type HapticPattern = 'select' | 'delete' | 'increment' | 'decrement';

export const useHaptics = () => {
  const getPattern = (pattern: HapticPattern): number[] => {
    switch (pattern) {
      case 'select':
        return [50]; // Short vibration for selection
      case 'delete':
        return [100, 50, 100]; // Double vibration for deletion
      case 'increment':
        return [30]; // Very short vibration for increment
      case 'decrement':
        return [40]; // Slightly longer vibration for decrement
      default:
        return [50];
    }
  };

  const triggerHaptic = useCallback((pattern: HapticPattern = 'select') => {
    // Check if the device supports vibration
    if ('vibrate' in navigator) {
      navigator.vibrate(getPattern(pattern));
    }
  }, []);

  return { triggerHaptic };
};
