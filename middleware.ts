import { Request, Response, NextFunction } from 'express';

// Extend the Express Request type using module augmentation
declare module 'express' {
  interface Request {
    isMobile: boolean;
  }
}

// Array of mobile device identifiers
const MOBILE_AGENTS = [
  /Android/i,
  /webOS/i,
  /iPhone/i,
  /iPad/i,
  /iPod/i,
  /BlackBerry/i,
  /Windows Phone/i,
];

// Function to check if user agent is mobile
function isMobile(userAgent: string) {
  return MOBILE_AGENTS.some((regex) => regex.test(userAgent));
}

// Middleware function
export function middleware(req: Request, res: Response, next: NextFunction) {
  const userAgent = req.headers['user-agent'] || '';
  const isMobileDevice = isMobile(userAgent);

  // Add mobile detection to request object
  req.isMobile = isMobileDevice;

  // You can add your routing logic here if needed
  // For example:
  // if (isMobileDevice && req.path === '/some-path') {
  //   return res.redirect('/mobile-path');
  // }

  next();
}

// Export the middleware function as default
export default middleware;
