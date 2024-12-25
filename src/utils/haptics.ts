// Check if the device supports the Vibration API
const hasVibrationSupport = () => {
  try {
    return typeof window !== 'undefined' && 
           'vibrate' in navigator && 
           typeof navigator.vibrate === 'function' &&
           !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (error) {
    console.warn('Haptics API check failed:', error);
    return false;
  }
};

// Safe vibrate function
const safeVibrate = (pattern: number | number[]) => {
  try {
    if (hasVibrationSupport()) {
      navigator.vibrate(pattern);
      return true;
    }
    return false;
  } catch (error) {
    console.warn('Vibration failed:', error);
    return false;
  }
};

// Different vibration patterns for different types of feedback
export const haptics = {
  // Light tap feedback (15ms)
  light: () => safeVibrate(15),

  // Medium tap feedback (25ms)
  medium: () => safeVibrate(25),

  // Heavy feedback (35ms)
  heavy: () => safeVibrate(35),

  // Success celebration - powerful, satisfying burst
  celebrate: () => safeVibrate([50, 30, 100]),

  // Error pattern (three short pulses)
  error: () => safeVibrate([35, 50, 35, 50, 35]),

  // Custom pattern
  pattern: (pattern: number[]) => safeVibrate(pattern)
};
