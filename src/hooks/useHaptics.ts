import { useCallback, useEffect, useState } from 'react';

export type HapticPattern = 'select' | 'delete' | 'increment' | 'decrement';

export const useHaptics = () => {
  const [hasHaptics, setHasHaptics] = useState(false);

  useEffect(() => {
    // Check for vibration support
    const hasVibration = 'vibrate' in navigator;
    
    // Check for iOS haptics support
    const hasIOSHaptics = 'Haptics' in window;
    
    setHasHaptics(hasVibration || hasIOSHaptics);
  }, []);

  const getPattern = (pattern: HapticPattern): number[] => {
    switch (pattern) {
      case 'select':
        return [40]; // Short vibration for selection
      case 'delete':
        return [80, 40, 80]; // Double vibration for deletion
      case 'increment':
        return [25]; // Very short vibration for increment
      case 'decrement':
        return [35]; // Slightly longer vibration for decrement
      default:
        return [40];
    }
  };

  const triggerHaptic = useCallback((pattern: HapticPattern = 'select') => {
    if (!hasHaptics) return;

    try {
      // Try iOS haptics first if available
      if ('Haptics' in window) {
        const impact = { 
          select: 'light',
          delete: 'medium',
          increment: 'light',
          decrement: 'light'
        }[pattern] as 'light' | 'medium' | 'heavy';

        // @ts-ignore - iOS haptics
        window.Haptics.impact({ style: impact });
      } 
      // Fallback to standard vibration API
      else if ('vibrate' in navigator) {
        navigator.vibrate(getPattern(pattern));
      }
    } catch (error) {
      console.debug('Haptics not available:', error);
    }
  }, [hasHaptics]);

  return { triggerHaptic, hasHaptics };
};
