import { Outlet } from 'react-router-dom';
import { memo } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { SkipToContent } from '../A11yAnnouncer';

export const Layout = memo(function Layout() {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <SkipToContent />
      <header role="banner">
        <Navbar />
      </header>
      <main id="main-content" role="main" tabIndex={-1} className="min-h-screen outline-none">
        <div className="min-h-screen bg-gradient-to-b from-dark-300 to-dark-400 text-gray-100">
          <div className="fixed inset-0 bg-gradient-radial from-accent-700/20 via-dark-300/50 to-dark-400 pointer-events-none" aria-hidden="true" />
          <div className="relative">
            <Outlet />
          </div>
        </div>
      </main>
      <footer role="contentinfo">
        <Footer />
      </footer>
    </div>
  );
});

Layout.displayName = 'Layout';
