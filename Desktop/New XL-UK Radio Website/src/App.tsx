import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';

// Components
import Layout from './components/Layout';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ShowsPage from './pages/ShowsPage';
import ShowDetailPage from './pages/ShowDetailPage';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import EventsPage from './pages/EventsPage';
import DJsPage from './pages/DJsPage';
import DJProfilePage from './pages/DJProfilePage';
import ContactPage from './pages/ContactPage';

// Context
import { AudioProvider } from './context/AudioContext';

function App() {
  const location = useLocation();

  return (
    <HelmetProvider>
      <AudioProvider>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/shows" element={<ShowsPage />} />
              <Route path="/shows/:id" element={<ShowDetailPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:id" element={<NewsDetailPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/djs" element={<DJsPage />} />
              <Route path="/djs/:id" element={<DJProfilePage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </AudioProvider>
    </HelmetProvider>
  );
}

export default App;