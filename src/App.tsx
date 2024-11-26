import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import Reservations from './pages/Reservations';
import Menu from './pages/Menu';
import Events from './pages/Events';
import Shop from './pages/Shop';
import Loyalty from './pages/Loyalty';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/reservations",
        element: <Reservations />
      },
      {
        path: "/menu",
        element: <Menu />
      },
      {
        path: "/events",
        element: <Events />
      },
      {
        path: "/shop",
        element: <Shop />
      },
      {
        path: "/loyalty",
        element: <Loyalty />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/faq",
        element: <FAQ />
      },
      {
        path: "/privacy",
        element: <Privacy />
      },
      {
        path: "/terms",
        element: <Terms />
      }
    ]
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;