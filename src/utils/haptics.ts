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

// Attempt to get vibration permission
const requestVibrationPermission = async () => {
  try {
    if ('permissions' in navigator) {
      const result = await navigator.permissions.query({ name: 'vibrate' as PermissionName });
      return result.state === 'granted';
    }
    return true; // If permissions API is not available, assume granted
  } catch (error) {
    console.warn('Vibration permission request failed:', error);
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
  light: async () => {
    const hasPermission = await requestVibrationPermission();
    if (hasPermission) {
      return safeVibrate(15);
    }
    return false;
  },

  // Medium tap feedback (25ms)
  medium: async () => {
    const hasPermission = await requestVibrationPermission();
    if (hasPermission) {
      return safeVibrate(25);
    }
    return false;
  },

  // Heavy feedback (35ms)
  heavy: async () => {
    const hasPermission = await requestVibrationPermission();
    if (hasPermission) {
      return safeVibrate(35);
    }
    return false;
  },

  // Success celebration - powerful, satisfying burst
  celebrate: async () => {
    const hasPermission = await requestVibrationPermission();
    if (hasPermission) {
      return safeVibrate([50, 30, 50, 30, 50]);
    }
    return false;
  },

  // Error pattern (three short pulses)
  error: async () => {
    const hasPermission = await requestVibrationPermission();
    if (hasPermission) {
      return safeVibrate([30, 20, 30, 20, 30]);
    }
    return false;
  },

  // Custom pattern
  pattern: async (pattern: number[]) => {
    const hasPermission = await requestVibrationPermission();
    if (hasPermission) {
      return safeVibrate(pattern);
    }
    return false;
  }
};
