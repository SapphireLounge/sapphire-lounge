import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
import './index.css';

// Register service worker
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  });
}

// Performance monitoring
if (process.env.NODE_ENV === 'production') {
  // Report Web Vitals
  const reportWebVitals = (metric: any) => {
    console.log(metric);
    // You can send these metrics to your analytics service
  };

  // Monitor performance
  if ('performance' in window && 'PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        reportWebVitals(entry);
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  }
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
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>
);
