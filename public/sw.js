const CACHE_NAME = 'sapphire-lounge-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .catch((error) => console.error('Cache installation failed:', error))
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Helper function to determine if a request should be cached
function shouldCache(request) {
  // Don't cache WebSocket connections
  if (request.url.includes('ws:') || request.url.includes('wss:')) {
    return false;
  }

  // Don't cache API requests
  if (request.url.includes('/api/')) {
    return false;
  }

  // Don't cache non-GET requests
  if (request.method !== 'GET') {
    return false;
  }

  return true;
}

// Fetch event - handle requests
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip WebSocket requests
  if (event.request.url.includes('ws:') || event.request.url.includes('wss:')) {
    return;
  }

  event.respondWith(
    (async () => {
      try {
        // Try to get from cache first
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }

        // If not in cache, try network
        const networkResponse = await fetch(event.request);
        
        // Cache valid responses if appropriate
        if (networkResponse.ok && shouldCache(event.request)) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
        }
        
        return networkResponse;
      } catch (error) {
        // Return cached version if available
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }

        // Return offline page for navigation requests
        if (event.request.mode === 'navigate') {
          const cache = await caches.open(CACHE_NAME);
          return cache.match('/');
        }

        // Return error response for other requests
        return new Response('Network error occurred', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain',
            'Cache-Control': 'no-store'
          })
        });
      }
    })()
  );
});
