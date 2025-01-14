import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Lazy load route components
export const Home = lazy(() => import('./pages/Home'));
export const Menu = lazy(() => import('./pages/Menu'));
export const Events = lazy(() => import('./pages/Events'));
export const Reservations = lazy(() => import('./pages/Reservations').then(module => ({ default: module.default })));
export const Contact = lazy(() => import('./pages/Contact'));
export const About = lazy(() => import('./pages/About'));
export const VIPServices = lazy(() => import('./pages/VIPServices'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: null, // Will be populated in Routes component
  },
  {
    path: '/menu',
    element: null,
  },
  {
    path: '/events',
    element: null,
  },
  {
    path: '/reservations',
    element: null,
  },
  {
    path: '/contact',
    element: null,
  },
  {
    path: '/about',
    element: null,
  },
  {
    path: '/vip-services',
    element: null,
  },
];
