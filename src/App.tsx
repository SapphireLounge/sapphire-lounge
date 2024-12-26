import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { A11yProvider } from './components/A11yAnnouncer';
import { JsonLd } from './components/JsonLd';
import { Suspense, lazy, ComponentType } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { Layout } from './components/layout/Layout';

// Business data for JSON-LD
const businessJsonLd = {
  name: 'Sapphire Lounge',
  image: '/images/sapphire-lounge.jpg',
  description: 'Premium shisha lounge in Swansea offering luxury flavors and a sophisticated atmosphere',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Wind Street',
    addressLocality: 'Swansea',
    addressRegion: 'Wales',
    postalCode: 'SA1 1DY',
    addressCountry: 'GB'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '51.6214',
    longitude: '-3.9436'
  },
  telephone: '01792555888',
  openingHours: ['Tu-Su 17:00-02:00'],
  priceRange: '££'
};

// Lazy load components with error boundaries
const lazyLoad = (importFn: () => Promise<{ default: ComponentType<any> }>) => {
  const LazyComponent = lazy(importFn);
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
};

// Layout wrapper
const LayoutWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutWrapper />,
    errorElement: lazyLoad(() => import('./pages/NotFound')),
    children: [
      { index: true, element: lazyLoad(() => import('./pages/Home')) },
      { path: 'about', element: lazyLoad(() => import('./pages/About')) },
      { path: 'menu', element: lazyLoad(() => import('./pages/Menu')) },
      { path: 'events', element: lazyLoad(() => import('./pages/Events')) },
      { path: 'reservations', element: lazyLoad(() => import('./pages/Reservations')) },
      { path: 'loyalty', element: lazyLoad(() => import('./pages/Loyalty')) },
      { path: 'contact', element: lazyLoad(() => import('./pages/Contact')) },
      { path: 'faq', element: lazyLoad(() => import('./pages/FAQ')) },
      { path: 'privacy', element: lazyLoad(() => import('./pages/Privacy')) },
      { path: 'terms', element: lazyLoad(() => import('./pages/Terms')) },
      { path: 'vip-services', element: lazyLoad(() => import('./pages/VIPServices')) },
      { path: 'special-occasions', element: lazyLoad(() => import('./pages/SpecialOccasions')) },
      { path: '*', element: lazyLoad(() => import('./pages/NotFound')) }
    ]
  }
]);

function App() {
  return (
    <HelmetProvider>
      <A11yProvider>
        <JsonLd data={businessJsonLd} />
        <RouterProvider router={router} />
      </A11yProvider>
    </HelmetProvider>
  );
}

export default App;