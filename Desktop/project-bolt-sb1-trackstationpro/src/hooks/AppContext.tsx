import { createContext, useState, useEffect, ReactNode } from 'react';
import { AppContextType, Theme, Currency, Tab } from './AppTypes';

// Create and export the context
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Define AppContextProvider props
interface AppContextProviderProps {
  children: ReactNode;
}

// Define and export AppContextProvider component
export function AppContextProvider({ children }: AppContextProviderProps) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [currency, setCurrencyState] = useState<Currency>('GBP');
  const [activeTab, setActiveTabState] = useState<Tab>('dashboard');
  const [pendingCurrency, setPendingCurrency] = useState<Currency | null>(null);
  
  // Apply theme on initial load and when theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);
  
  // Change currency
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
  };
  
  // Set pending currency (to be applied when user clicks "Apply Changes")
  const applyCurrencyChange = () => {
    if (pendingCurrency) {
      setCurrency(pendingCurrency);
      setPendingCurrency(null);
    }
  };
  
  // Change theme
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };
  
  // Apply theme to document
  const applyTheme = (theme: Theme) => {
    if (theme === 'light') {
      // Add light theme class to root
      document.documentElement.classList.add('light-theme');
      
      // Update body background and text
      document.body.classList.remove('bg-black');
      document.body.classList.add('bg-gray-100');
      document.body.classList.remove('text-white');
      document.body.classList.add('text-gray-900');
      
      // Update various UI elements
      document.querySelectorAll('.custom-card').forEach(el => {
        el.classList.remove('bg-gray-800');
        el.classList.add('bg-white');
        el.classList.remove('border-gray-700');
        el.classList.add('border-gray-200');
      });
      
      document.querySelectorAll('.gradient-text').forEach(el => {
        el.classList.remove('text-gradient-dark');
        el.classList.add('text-gradient-light');
      });
      
      document.querySelectorAll('.hover\\:bg-gray-700').forEach(el => {
        el.classList.remove('hover:bg-gray-700');
        el.classList.add('hover:bg-gray-200');
      });
    } else {
      // Remove light theme class from root
      document.documentElement.classList.remove('light-theme');
      
      // Update body background and text
      document.body.classList.remove('bg-gray-100');
      document.body.classList.add('bg-black');
      document.body.classList.remove('text-gray-900');
      document.body.classList.add('text-white');
      
      // Update various UI elements
      document.querySelectorAll('.custom-card').forEach(el => {
        el.classList.remove('bg-white');
        el.classList.add('bg-gray-800');
        el.classList.remove('border-gray-200');
        el.classList.add('border-gray-700');
      });
      
      document.querySelectorAll('.gradient-text').forEach(el => {
        el.classList.remove('text-gradient-light');
        el.classList.add('text-gradient-dark');
      });
      
      document.querySelectorAll('.hover\\:bg-gray-200').forEach(el => {
        el.classList.remove('hover:bg-gray-200');
        el.classList.add('hover:bg-gray-700');
      });
    }
  };
  
  // Change active tab
  const setActiveTab = (tab: Tab) => {
    setActiveTabState(tab);
  };
  
  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        currency,
        setCurrency,
        activeTab,
        setActiveTab,
        pendingCurrency,
        setPendingCurrency,
        applyCurrencyChange,
        region: currency // Region is determined by the currency selection
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
