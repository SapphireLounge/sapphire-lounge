import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { A11yProvider } from './components/A11yAnnouncer';
import { JsonLd, restaurantJsonLd } from './components/JsonLd';
import { Layout } from './components/layout/Layout';
import { Suspense, lazy, memo } from 'react';
import { ViewportDebug } from './components/ui/ViewportDebug';

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

// Layout wrapper with Suspense
const LayoutWrapper = () => (
  <Layout>
    <Suspense fallback={<LoadingSpinner />}>
      <Outlet />
    </Suspense>
  </Layout>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutWrapper />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'reservations', element: <Reservations /> },
      { path: 'menu', element: <Menu /> },
      { path: 'events', element: <Events /> },
      { path: 'loyalty', element: <Loyalty /> },
      { path: 'contact', element: <Contact /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'terms', element: <Terms /> },
      { path: 'vip-services', element: <VIPServices /> }
    ]
  }
]);

// Preload important routes
const preloadRoutes = () => {
  // Only preload routes after initial render
  setTimeout(() => {
    Promise.all([
      import('./pages/Home'),
      import('./pages/About'),
      import('./pages/Menu'),
      import('./pages/Contact')
    ]).catch(error => {
      console.error('Error preloading routes:', error);
    });
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
    <A11yProvider>
      <HelmetProvider>
        <JsonLd data={restaurantJsonLd} />
        <RouterProvider router={router} />
        {process.env.NODE_ENV === 'development' && <ViewportDebug />}
      </HelmetProvider>
    </A11yProvider>
  );
}

export default App;