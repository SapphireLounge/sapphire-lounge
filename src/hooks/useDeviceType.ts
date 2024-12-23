import { useState, useEffect } from 'react';

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop'>('desktop');

  useEffect(() => {
    // Get device type from header set by middleware
    const deviceTypeHeader = document.querySelector('meta[name="x-device-type"]')?.getAttribute('content');
    if (deviceTypeHeader) {
      setDeviceType(deviceTypeHeader as 'mobile' | 'desktop');
    }
  }, []);

  return deviceType;
}
