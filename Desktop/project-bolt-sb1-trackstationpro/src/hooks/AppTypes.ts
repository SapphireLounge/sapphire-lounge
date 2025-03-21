// Define types for AppContext
export type Theme = 'light' | 'dark';
export type Currency = 'GBP' | 'USD';
export type Region = Currency; // Alias for Currency to maintain backward compatibility
export type Tab = 'dashboard' | 'licenses' | 'expenses' | 'income' | 'settings' | 'about';

export interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  pendingCurrency: Currency | null;
  setPendingCurrency: (currency: Currency | null) => void;
  applyCurrencyChange: () => void;
  // The region is determined by the currency selection
  region: Region;
}
