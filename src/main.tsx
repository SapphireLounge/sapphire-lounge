import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { SpeedInsights } from '@vercel/speed-insights/react';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App.tsx';
import './index.css';

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

const ErrorFallback = () => (
  <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-neutral-800 p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
      <p className="mb-4">We apologize for the inconvenience. Please try refreshing the page.</p>
      <button 
        onClick={() => window.location.reload()} 
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
      >
        Refresh Page
      </button>
    </div>
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Toaster position="top-center" />
        <SpeedInsights 
          sampleRate={1.0}
          debug={import.meta.env.DEV}
        />
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>
);
