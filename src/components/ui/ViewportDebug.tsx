import { useState, useEffect } from 'react';

export const ViewportDebug = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-0 right-0 m-4 p-2 bg-black/75 text-white text-sm rounded-lg z-50">
      <div>Width: {dimensions.width}px</div>
      <div>Height: {dimensions.height}px</div>
      <div>
        Size:{' '}
        {dimensions.width < 640 ? 'xs' :
         dimensions.width < 768 ? 'sm' :
         dimensions.width < 1024 ? 'md' :
         dimensions.width < 1280 ? 'lg' : 'xl'}
      </div>
    </div>
  );
};
