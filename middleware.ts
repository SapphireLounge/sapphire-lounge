import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
export function middleware(request: NextRequest) {
  // Get user agent
  const userAgent = request.headers.get('user-agent') || '';
  
  // Check if mobile/tablet
  const isMobileDevice = isMobile(userAgent);

  // Clone the response
  const response = NextResponse.next();

  // Add device type to headers
  response.headers.set('x-device-type', isMobileDevice ? 'mobile' : 'desktop');

  return response;
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
