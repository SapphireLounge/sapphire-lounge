import { useState, useEffect } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      
      // Check if device is a tablet using user agent
      const isTablet = /iPad|Android(?!.*Mobile)|Tablet/i.test(navigator.userAgent);
      
      // Also check screen width ranges
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024 || isTablet) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    // Check initially
    checkDeviceType();

    // Recheck on resize
    window.addEventListener('resize', checkDeviceType);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  return deviceType;
}
