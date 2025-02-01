import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { A11yProvider } from './components/A11yAnnouncer';
import { JsonLd, restaurantJsonLd } from './components/JsonLd';
import { Layout } from './components/layout/Layout';
import { Suspense, lazy } from 'react';
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

// Preload all routes immediately
const preloadRoutes = () => {
  const routes = [
    import('./pages/Home'),
    import('./pages/About'),
    import('./pages/Reservations'),
    import('./pages/Menu'),
    import('./pages/Events'),
    import('./pages/Loyalty'),
    import('./pages/Contact'),
    import('./pages/FAQ'),
    import('./pages/Privacy'),
    import('./pages/Terms'),
    import('./pages/NotFound'),
    import('./pages/VIPServices')
  ];
  
  Promise.all(routes).catch(console.error);
};

// Start preloading immediately
preloadRoutes();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={null}>
            <Home />
          </Suspense>
        )
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={null}>
            <About />
          </Suspense>
        )
      },
      {
        path: "/reservations",
        element: (
          <Suspense fallback={null}>
            <Reservations />
          </Suspense>
        )
      },
      {
        path: "/menu",
        element: (
          <Suspense fallback={null}>
            <Menu />
          </Suspense>
        )
      },
      {
        path: "/events",
        element: (
          <Suspense fallback={null}>
            <Events />
          </Suspense>
        )
      },
      {
        path: "/loyalty",
        element: (
          <Suspense fallback={null}>
            <Loyalty />
          </Suspense>
        )
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={null}>
            <Contact />
          </Suspense>
        )
      },
      {
        path: "/faq",
        element: (
          <Suspense fallback={null}>
            <FAQ />
          </Suspense>
        )
      },
      {
        path: "/privacy",
        element: (
          <Suspense fallback={null}>
            <Privacy />
          </Suspense>
        )
      },
      {
        path: "/terms",
        element: (
          <Suspense fallback={null}>
            <Terms />
          </Suspense>
        )
      },
      {
        path: "/vip-services",
        element: (
          <Suspense fallback={null}>
            <VIPServices />
          </Suspense>
        )
      }
    ]
  }
]);

function App() {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(console.error);
      });
    }

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