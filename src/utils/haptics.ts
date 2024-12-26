// Check if the device supports the Vibration API
const hasVibrationSupport = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  try {
    // Check for vibration support and respect reduced motion preference
    const hasVibrate = 'vibrate' in navigator;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = /iPhone|iPad|iPod|Android|Mobile|webOS/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    return hasVibrate && !prefersReducedMotion && (isMobile || isStandalone);
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

    // Try to vibrate multiple times if the first attempt fails
    let attempts = 0;
    const maxAttempts = 3;
    
    const tryVibrate = () => {
      if (attempts >= maxAttempts) return false;
      
      const success = navigator.vibrate(normalizedPattern);
      if (!success && attempts < maxAttempts) {
        attempts++;
        setTimeout(tryVibrate, 100);
      }
      return success;
    };

    return tryVibrate();
  } catch (error) {
    console.debug('Vibration failed:', error);
    return false;
  }
};

// Different vibration patterns for different types of feedback
export const haptics = {
  // Light tap feedback (single short pulse)
  light: () => safeVibrate(15),

  // Medium tap feedback (slightly longer)
  medium: () => safeVibrate(25),

  // Heavy tap feedback (even longer)
  heavy: () => safeVibrate(35),

  // Success feedback (two short pulses)
  success: () => safeVibrate([15, 30, 15]),

  // Warning feedback (three pulses increasing in duration)
  warning: () => safeVibrate([15, 30, 25, 30, 35]),

  // Error feedback (three strong pulses)
  error: () => safeVibrate([35, 30, 35, 30, 35]),

  // Selection feedback (single medium pulse)
  selection: () => safeVibrate(20),

  // Custom pattern (array of durations in milliseconds)
  custom: (pattern: number[]) => safeVibrate(pattern)
};
