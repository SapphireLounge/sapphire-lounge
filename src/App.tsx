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

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Menu = lazy(() => import('./pages/Menu'));
const Events = lazy(() => import('./pages/Events'));
const Reservations = lazy(() => import('./pages/Reservations'));
const Loyalty = lazy(() => import('./pages/Loyalty'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const VIPServices = lazy(() => import('./pages/VIPServices'));
const SpecialOccasions = lazy(() => import('./pages/SpecialOccasions'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Wrap lazy components with Suspense
const wrapWithSuspense = (Component: React.LazyExoticComponent<ComponentType>) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
};

// Layout wrapper with Suspense and ErrorBoundary
const LayoutWrapper = () => {
  const location = useLocation();
  
  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Layout>
          <Outlet />
        </Layout>
      </Suspense>
    </ErrorBoundary>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutWrapper />,
    children: [
      { path: '', element: wrapWithSuspense(Home) },
      { path: 'about', element: wrapWithSuspense(About) },
      { path: 'reservations', element: wrapWithSuspense(Reservations) },
      { path: 'menu', element: wrapWithSuspense(Menu) },
      { path: 'events', element: wrapWithSuspense(Events) },
      { path: 'loyalty', element: wrapWithSuspense(Loyalty) },
      { path: 'contact', element: wrapWithSuspense(Contact) },
      { path: 'faq', element: wrapWithSuspense(FAQ) },
      { path: 'privacy', element: wrapWithSuspense(Privacy) },
      { path: 'terms', element: wrapWithSuspense(Terms) },
      { path: 'vip-services', element: wrapWithSuspense(VIPServices) },
      { path: 'special-occasions', element: wrapWithSuspense(SpecialOccasions) },
      { path: '*', element: wrapWithSuspense(NotFound) }
    ]
  }
]);

const App = () => {
  useEffect(() => {
    // Preload important routes in the background
    [Home, About, Menu, Reservations].forEach(route => {
      const lazyComponent = route as unknown as { preload?: () => void };
      if (lazyComponent.preload) {
        lazyComponent.preload();
      }
    });
  }, []);

  return (
    <HelmetProvider>
      <A11yProvider>
        <JsonLd type="Restaurant" data={businessJsonLd} />
        <RouterProvider router={router} />
      </A11yProvider>
    </HelmetProvider>
  );
};

export default App;