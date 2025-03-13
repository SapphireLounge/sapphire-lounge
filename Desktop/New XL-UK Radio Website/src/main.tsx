import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.pcss';
import AudioPlayerProvider from './contexts/AudioPlayerContext';
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AudioPlayerProvider>
          <App />
        </AudioPlayerProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);