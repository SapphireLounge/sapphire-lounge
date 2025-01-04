import { lazy, Suspense } from 'react';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Lazy load route components
const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Events = lazy(() => import('./pages/Events'));
const Reservations = lazy(() => import('./pages/Reservations'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const VIPServices = lazy(() => import('./pages/VIPServices'));

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark-900">
    <LoadingSpinner size="lg" />
  </div>
);

export const routes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/menu',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Menu />
      </Suspense>
    ),
  },
  {
    path: '/events',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Events />
      </Suspense>
    ),
  },
  {
    path: '/reservations',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Reservations />
      </Suspense>
    ),
  },
  {
    path: '/contact',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Contact />
      </Suspense>
    ),
  },
  {
    path: '/about',
    element: (
      <Suspense fallback={<PageLoader />}>
        <About />
      </Suspense>
    ),
  },
  {
    path: '/vip-services',
    element: (
      <Suspense fallback={<PageLoader />}>
        <VIPServices />
      </Suspense>
    ),
  },
];
