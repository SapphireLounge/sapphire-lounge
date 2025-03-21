import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Licenses from './pages/Licenses';
import Settings from './pages/Settings';
import Income from './pages/Income';
import About from './pages/About';
import { AppContextProvider } from './hooks/AppContext';

function App() {
  useEffect(() => {
    // Apply theme class to body
    document.body.classList.add('bg-gray-900');
    document.body.classList.add('text-white');
    
    return () => {
      document.body.classList.remove('bg-gray-900');
      document.body.classList.remove('text-white');
    };
  }, []);

  return (
    <AppContextProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/licenses" element={<Licenses />} />
            <Route path="/income" element={<Income />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AppContextProvider>
  );
}

export default App;
