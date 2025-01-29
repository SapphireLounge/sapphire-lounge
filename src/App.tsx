import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { A11yProvider } from './components/A11yAnnouncer';
import { JsonLd, restaurantJsonLd } from './components/JsonLd';
import { Layout } from './components/layout/Layout';
import { Suspense, lazy, memo } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { LazyMotion, domAnimation } from 'framer-motion';

// Lazy load routes
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
      }
    ]
  }
]);

// Preload critical routes
function preloadRoutes() {
  // Preload critical routes using dynamic imports
  const preloadCriticalRoutes = () => {
    import('./pages/Home');
    import('./pages/Menu');
    import('./pages/Reservations');
  };

  // Preload other routes after initial load
  const preloadOtherRoutes = () => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        import('./pages/About');
        import('./pages/Events');
        import('./pages/Contact');
        import('./pages/FAQ');
      });
    } else {
      setTimeout(() => {
        import('./pages/About');
        import('./pages/Events');
        import('./pages/Contact');
        import('./pages/FAQ');
      }, 2000);
    }
  };

  // Execute preloading strategy
  if (typeof window !== 'undefined') {
    // Preload critical routes immediately
    preloadCriticalRoutes();

    // Preload other routes after page load
    window.addEventListener('load', () => {
      preloadOtherRoutes();
    });
  }
}

function App() {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(console.error);
      });
    }

    // Preload routes
    preloadRoutes();

    // Optimize performance with connection-aware loading
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection.saveData) {
        // Disable preloading if save-data is enabled
        return;
      }
      if (connection.effectiveType === '4g') {
        // Aggressive preloading for fast connections
        import('./pages/About');
        import('./pages/Events');
        import('./pages/Contact');
      }
    }
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <A11yProvider>
          <LazyMotion features={domAnimation}>
            <JsonLd type="Restaurant" data={restaurantJsonLd} />
            <RouterProvider router={router} />
          </LazyMotion>
        </A11yProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;