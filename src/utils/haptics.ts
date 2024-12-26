// Check if the device supports the Vibration API
const hasVibrationSupport = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  try {
    // Check for vibration support and respect reduced motion preference
    const hasVibrate = 'vibrate' in navigator;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    return hasVibrate && !prefersReducedMotion && isMobile;
  } catch (error) {
    console.debug('Haptics not supported:', error);
    return false;
  }
};

// Safe vibrate function that doesn't require permissions
const safeVibrate = (pattern: number | number[]) => {
  try {
    if (!hasVibrationSupport()) {
      return false;
    }

    // Ensure pattern is within reasonable limits
    const normalizedPattern = Array.isArray(pattern)
      ? pattern.map(duration => Math.min(Math.max(duration, 1), 1000))
      : Math.min(Math.max(pattern, 1), 1000);

    return navigator.vibrate(normalizedPattern);
  } catch (error) {
    console.debug('Vibration failed:', error);
    return false;
  }
};

// Different vibration patterns for different types of feedback
export const haptics = {
  // Light tap feedback (single short pulse)
  light: () => safeVibrate(10),

  // Medium tap feedback (slightly longer)
  medium: () => safeVibrate(20),

  // Heavy tap feedback (even longer)
  heavy: () => safeVibrate(30),

  // Success feedback (two short pulses)
  success: () => safeVibrate([10, 30, 10]),

  // Warning feedback (three pulses increasing in duration)
  warning: () => safeVibrate([10, 20, 20, 20, 30]),

  // Error feedback (three strong pulses)
  error: () => safeVibrate([30, 20, 30, 20, 30]),

  // Selection feedback (single medium pulse)
  selection: () => safeVibrate(15),

  // Custom pattern (array of durations in milliseconds)
  custom: (pattern: number[]) => safeVibrate(pattern)
};
