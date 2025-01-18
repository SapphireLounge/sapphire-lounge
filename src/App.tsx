import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { A11yProvider } from './components/A11yAnnouncer';
import { JsonLd, restaurantJsonLd } from './components/JsonLd';
import { Layout } from './components/layout/Layout';
import { Suspense, lazy, memo } from 'react';
import ErrorBoundary from './components/ErrorBoundary'; 

// Lazy load routes with preload hints
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Reservations = lazy(() => import('./pages/Reservations'));
const Menu = lazy(() => import('./pages/Menu'));
const Events = lazy(() => import('./pages/Events'));
const Loyalty = lazy(() => import('./pages/Loyalty'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));
const VIPServices = lazy(() => import('./pages/VIPServices'));

// Enhanced loading component with ARIA
const LoadingSpinner = memo(() => (
  <div 
    className="min-h-screen flex items-center justify-center"
    role="status"
    aria-label="Loading content"
  >
    <div 
      className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"
      aria-hidden="true"
    />
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        )
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <About />
          </Suspense>
        )
      },
      {
        path: "/reservations",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Reservations />
          </Suspense>
        )
      },
      {
        path: "/menu",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Menu />
          </Suspense>
        )
      },
      {
        path: "/events",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Events />
          </Suspense>
        )
      },
      {
        path: "/loyalty",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Loyalty />
          </Suspense>
        )
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Contact />
          </Suspense>
        )
      },
      {
        path: "/faq",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <FAQ />
          </Suspense>
        )
      },
      {
        path: "/privacy",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Privacy />
          </Suspense>
        )
      },
      {
        path: "/terms",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Terms />
          </Suspense>
        )
      },
      {
        path: "/vip-services",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <VIPServices />
          </Suspense>
        )
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NotFound />
          </Suspense>
        )
      }
    ]
  }
], {
  future: {
    v7_normalizeFormMethod: true
  }
});

// Preload hints for routes
const preloadRoutes = () => {
  // Only preload routes after initial render
  setTimeout(() => {
    import('./pages/Home');
    import('./pages/About');
    import('./pages/Menu');
    import('./pages/Contact');
  }, 2000); // Wait for 2 seconds after initial render
};

function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
          console.log('Service worker registration failed:', error);
        });
      });
    }
    // Preload important routes after initial render
    preloadRoutes();
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <A11yProvider>
          <div className="min-h-screen bg-dark-950 text-white">
            <JsonLd type="Restaurant" data={restaurantJsonLd} />
            <RouterProvider router={router} fallbackElement={<LoadingSpinner />} />
          </div>
        </A11yProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;