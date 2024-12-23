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
  const isMobileDevice = isMobile(userAgent);

  // Get the requested URL
  const url = request.nextUrl.clone();
  
  // Define the mobile site URL (you'll need to update this with your actual mobile site URL)
  const MOBILE_SITE = 'https://mobile.sapphirelounge.vercel.app';
  const DESKTOP_SITE = 'https://sapphirelounge.vercel.app';

  // If mobile device and on desktop site, redirect to mobile site
  if (isMobileDevice && url.origin === DESKTOP_SITE) {
    url.href = `${MOBILE_SITE}${url.pathname}${url.search}`;
    return NextResponse.redirect(url);
  }

  // If desktop device and on mobile site, redirect to desktop site
  if (!isMobileDevice && url.origin === MOBILE_SITE) {
    url.href = `${DESKTOP_SITE}${url.pathname}${url.search}`;
    return NextResponse.redirect(url);
  }

  // For all other cases, continue with the request
  return NextResponse.next();
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
