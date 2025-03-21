import { useState } from 'react';
import { Sun, Globe, User, Bell, Shield, Database, Check, Mail } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Toggle } from '../components/ui/Toggle';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAppContext } from '../hooks/useAppContext';
import { Currency } from '../hooks/AppTypes';
import CURRENCIES from '../i18n/currencies';
import { TEXT } from '../constants/text';

// Define the currency details type
interface CurrencyDetails {
  name: string;
  symbol: string;
  code: string;
}

export default function Settings() {
  const { 
    theme, 
    setTheme, 
    currency, 
    pendingCurrency, 
    setPendingCurrency, 
    applyCurrencyChange,
    region
  } = useAppContext();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('weekly');
  const [dataExportFormat, setDataExportFormat] = useState('json');
  
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value as Currency;
    setPendingCurrency(newCurrency);
  };
  
  const handleApplyCurrencyChange = () => {
    applyCurrencyChange();
  };
  
  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const handleExportData = () => {
    // Placeholder for data export functionality
    alert(TEXT.exportFunctionalityComingSoon);
  };
  
  const handleImportData = () => {
    // Placeholder for data import functionality
    alert(TEXT.importFunctionalityComingSoon);
  };
  
  const handleResetData = () => {
    if (window.confirm(TEXT.confirmResetData)) {
      // Placeholder for data reset functionality
      alert(TEXT.resetFunctionalityComingSoon);
    }
  };
  
  // Convert CURRENCIES object to array for Select component
  const regionOptions = Object.entries(CURRENCIES)
    .map(([code, details]) => ({
      value: code,
      label: `${(details as CurrencyDetails).name} (${(details as CurrencyDetails).symbol})`
    }));
  
  return (
    <div className="p-4 sm:p-6 custom-container page-transition transform-gpu sm:flex sm:flex-col sm:h-full">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold gradient-text custom-heading tracking-wide text-center sm:text-left">{TEXT.settings}</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 sm:flex-1 sm:min-h-0 sm:overflow-auto">
        <div className="staggered-item transform-gpu">
          <Card 
            title={TEXT.appearance}
            icon={<Sun className="w-5 h-5 sm:w-6 sm:h-6" />}
            className="custom-card h-full"
          >
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="pr-4">
                  <h3 className="font-medium text-base sm:text-lg tracking-wide">{TEXT.darkMode}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 tracking-wide">{TEXT.darkModeDescription}</p>
                </div>
                <Toggle 
                  checked={theme === 'dark'} 
                  onChange={handleThemeToggle}
                />
              </div>
              
              <div>
                <h3 className="font-medium text-base sm:text-lg mb-2 sm:mb-3 tracking-wide">{TEXT.region}</h3>
                <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">
                  {TEXT.currentRegion}: {CURRENCIES[region]?.name || ''}
                </p>
                <Select
                  value={pendingCurrency || currency}
                  onChange={handleCurrencyChange}
                  options={regionOptions}
                  icon={<Globe className="w-4 h-4 sm:w-5 sm:h-5" />}
                  fullWidth
                />
                
                {pendingCurrency && (
                  <div className="mt-4 custom-fade-in" style={{ animationDuration: '0.3s' }}>
                    <Button 
                      variant="primary"
                      icon={<Check className="w-4 h-4 sm:w-5 sm:h-5" />}
                      onClick={handleApplyCurrencyChange}
                      fullWidth
                    >
                      {TEXT.applyChanges}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
        
        <div className="staggered-item transform-gpu">
          <Card 
            title={TEXT.notifications}
            icon={<Bell className="w-5 h-5 sm:w-6 sm:h-6" />}
            className="custom-card h-full"
          >
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="pr-4">
                  <h3 className="font-medium text-base sm:text-lg tracking-wide">{TEXT.enableNotifications}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 tracking-wide">{TEXT.notificationsDescription}</p>
                </div>
                <Toggle 
                  checked={notificationsEnabled} 
                  onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                />
              </div>
              
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="pr-4">
                  <h3 className="font-medium text-base sm:text-lg tracking-wide">{TEXT.emailNotifications}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 tracking-wide">{TEXT.emailNotificationsDescription}</p>
                </div>
                <Toggle 
                  checked={emailNotifications} 
                  onChange={() => setEmailNotifications(!emailNotifications)}
                  disabled={!notificationsEnabled}
                />
              </div>
              
              {emailNotifications && notificationsEnabled && (
                <div>
                  <h3 className="font-medium text-base sm:text-lg mb-2 sm:mb-3 tracking-wide">{TEXT.emailAddress}</h3>
                  <Input
                    type="email"
                    placeholder={TEXT.emailAddress}
                    icon={<Mail className="w-4 h-4 sm:w-5 sm:h-5" />}
                    fullWidth
                  />
                </div>
              )}
            </div>
          </Card>
        </div>
        
        <div className="staggered-item transform-gpu">
          <Card 
            title={TEXT.account}
            icon={<User className="w-5 h-5 sm:w-6 sm:h-6" />}
            className="custom-card h-full"
          >
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="font-medium text-base sm:text-lg mb-2 sm:mb-3 tracking-wide">{TEXT.profile}</h3>
                <div className="space-y-3 sm:space-y-5">
                  <Input
                    label={TEXT.name}
                    placeholder={TEXT.yourName}
                    fullWidth
                  />
                  <Input
                    label={TEXT.company}
                    placeholder={TEXT.yourCompany}
                    fullWidth
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-base sm:text-lg mb-2 sm:mb-3 tracking-wide">{TEXT.security}</h3>
                <Button 
                  variant="secondary"
                  icon={<Shield className="w-4 h-4 sm:w-5 sm:h-5" />}
                  fullWidth
                >
                  {TEXT.changePassword}
                </Button>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="staggered-item transform-gpu">
          <Card 
            title={TEXT.dataManagement}
            icon={<Database className="w-5 h-5 sm:w-6 sm:h-6" />}
            className="custom-card h-full"
          >
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="font-medium text-base sm:text-lg tracking-wide">{TEXT.autoBackup}</h3>
                </div>
                <Toggle 
                  checked={autoBackup} 
                  onChange={() => setAutoBackup(!autoBackup)}
                />
              </div>
              
              {autoBackup && (
                <div>
                  <h3 className="font-medium text-base sm:text-lg mb-2 sm:mb-3 tracking-wide">{TEXT.backupFrequency}</h3>
                  <Select
                    value={backupFrequency}
                    onChange={(e) => setBackupFrequency(e.target.value)}
                    options={[
                      { value: 'daily', label: TEXT.daily },
                      { value: 'weekly', label: TEXT.weekly },
                      { value: 'monthly', label: TEXT.monthly }
                    ]}
                    fullWidth
                  />
                </div>
              )}
              
              <div>
                <h3 className="font-medium text-base sm:text-lg mb-2 sm:mb-3 tracking-wide">{TEXT.exportFormat}</h3>
                <Select
                  value={dataExportFormat}
                  onChange={(e) => setDataExportFormat(e.target.value)}
                  options={[
                    { value: 'json', label: 'JSON' },
                    { value: 'csv', label: 'CSV' },
                    { value: 'excel', label: 'Excel' }
                  ]}
                  fullWidth
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Button 
                  variant="secondary"
                  onClick={handleExportData}
                  fullWidth
                >
                  {TEXT.exportData}
                </Button>
                <Button 
                  variant="secondary"
                  onClick={handleImportData}
                  fullWidth
                >
                  {TEXT.importData}
                </Button>
              </div>
              
              <div className="pt-3 sm:pt-4 border-t border-gray-700">
                <Button 
                  variant="danger"
                  onClick={handleResetData}
                  fullWidth
                >
                  {TEXT.resetData}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
