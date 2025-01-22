// Check if the device supports the Vibration API
const hasVibrationSupport = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    console.debug('Haptics: Window or Navigator not available');
    return false;
  }

  try {
    // Check for secure context
    const isSecureContext = window.isSecureContext;
    
    // Check for vibration support and respect reduced motion preference
    const hasVibrate = 'vibrate' in navigator;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = /iPhone|iPad|iPod|Android|Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isDevelopment = process.env.NODE_ENV === 'development';

    // Log the detection results for debugging
    console.debug('Haptics Environment:', {
      isSecureContext,
      isDevelopment,
      environment: process.env.NODE_ENV,
      protocol: window.location.protocol,
      host: window.location.host
    });

    console.debug('Haptics Support:', {
      hasVibrate,
      prefersReducedMotion,
      isMobile,
      isStandalone,
      isTouchDevice,
      userAgent: navigator.userAgent
    });

    // In development, be more permissive
    if (isDevelopment) {
      // Allow desktop testing in development mode
      return hasVibrate && !prefersReducedMotion;
    }

    // In production, require secure context and proper support
    return isSecureContext && hasVibrate && !prefersReducedMotion && (isMobile || isStandalone);
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
      if (attempts >= maxAttempts) {
        console.debug('Haptics: Max vibration attempts reached');
        return false;
      }
      
      attempts++;
      const success = navigator.vibrate(normalizedPattern);
      console.debug(`Haptics: Vibration attempt ${attempts} ${success ? 'succeeded' : 'failed'} on ${window.location.href}`);
      
      if (!success && attempts < maxAttempts) {
        setTimeout(tryVibrate, 100);
      }
      return success;
    };

    return tryVibrate();
  } catch (error) {
    console.debug('Haptics vibration failed:', error);
    return false;
  }
};

// Different vibration patterns for different types of feedback
export const haptics = {
  // Light tap feedback (single short pulse)
  light() {
    return safeVibrate(10);
  },

  // Medium tap feedback (slightly longer)
  medium() {
    return safeVibrate(20);
  },

  // Heavy tap feedback (even longer)
  heavy() {
    return safeVibrate(30);
  },

  // Success feedback (two short pulses)
  success() {
    return safeVibrate([10, 30, 10]);
  },

  // Warning feedback (three pulses increasing in duration)
  warning() {
    return safeVibrate([10, 20, 15, 30, 20]);
  },

  // Error feedback (three strong pulses)
  error() {
    return safeVibrate([30, 20, 30, 20, 30]);
  },

  // Selection feedback (single medium pulse)
  selection() {
    return safeVibrate(15);
  },

  // Custom pattern (array of durations in milliseconds)
  custom(pattern: number[]) {
    return safeVibrate(pattern);
  },
};
