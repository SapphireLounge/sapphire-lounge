// Check if the device supports the Vibration API
const hasVibrationSupport = () => {
  return 'vibrate' in navigator;
};

// Different vibration patterns for different types of feedback
export const haptics = {
  // Light tap feedback (15ms)
  light: () => {
    if (hasVibrationSupport()) {
      navigator.vibrate(15);
    }
  },

  // Medium tap feedback (25ms)
  medium: () => {
    if (hasVibrationSupport()) {
      navigator.vibrate(25);
    }
  },

  // Heavy feedback (35ms)
  heavy: () => {
    if (hasVibrationSupport()) {
      navigator.vibrate(35);
    }
  },

  // Success celebration - powerful, satisfying burst
  celebrate: () => {
    if (hasVibrationSupport()) {
      // Strong initial pulse (200ms), brief pause, then medium follow-up (100ms)
      navigator.vibrate([200, 50, 100]);
    }
  },

  // Error pattern (three short pulses)
  error: () => {
    if (hasVibrationSupport()) {
      navigator.vibrate([15, 50, 15, 50, 15]);
    }
  },

  // Custom pattern
  pattern: (pattern: number[]) => {
    if (hasVibrationSupport()) {
      navigator.vibrate(pattern);
    }
  }
};
