import { useState, useEffect, ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';
import { Tab } from '../../hooks/AppTypes';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const location = useLocation();
  const { setActiveTab, theme } = useAppContext();
  const isDarkMode = theme === 'dark';
  
  // Sync active tab with current route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('dashboard')) {
      setActiveTab('dashboard' as Tab);
    } else if (path.includes('licenses')) {
      setActiveTab('licenses' as Tab);
    } else if (path.includes('expenses')) {
      setActiveTab('expenses' as Tab);
    } else if (path.includes('income')) {
      setActiveTab('income' as Tab);
    } else if (path.includes('settings')) {
      setActiveTab('settings' as Tab);
    } else if (path.includes('about')) {
      setActiveTab('about' as Tab);
    }
  }, [location.pathname, setActiveTab]);
  
  // Listen for closeSidebar event
  useEffect(() => {
    const handleCloseSidebar = () => {
      setSidebarOpen(false);
    };
    
    document.addEventListener('closeSidebar', handleCloseSidebar);
    
    return () => {
      document.removeEventListener('closeSidebar', handleCloseSidebar);
    };
  }, []);
  
  // Handle page transitions
  useEffect(() => {
    setIsPageTransitioning(true);
    const timer = setTimeout(() => {
      setIsPageTransitioning(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDarkMode ? '#374151' : '#ffffff',
            color: isDarkMode ? '#fff' : '#111827',
            border: `1px solid ${isDarkMode ? '#4B5563' : '#E5E7EB'}`,
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: isDarkMode ? '#fff' : '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: isDarkMode ? '#fff' : '#ffffff',
            },
          },
        }}
      />
      
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />
      
      <div className="flex flex-1 relative md:mt-0">
        {/* Sidebar - fixed on mobile, fixed on desktop */}
        <Sidebar isOpen={sidebarOpen} />
        
        {/* Main content */}
        <main className="flex-1 transition-all duration-300 overflow-y-auto md:ml-64">
          <div 
            className={`container mx-auto ${isPageTransitioning ? 'opacity-0' : 'page-transition'} p-4 md:p-6 h-full`}
          >
            {children}
          </div>
        </main>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden animate-fade-in-fast"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
