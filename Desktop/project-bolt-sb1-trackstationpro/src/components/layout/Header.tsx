import { Radio, Bell, X, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useReminders } from '../../hooks/useReminders';
import { Badge } from '../ui/Badge';
import { useAppContext } from '../../hooks/useAppContext';
import { TEXT } from '../../constants/text';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function Header({ toggleSidebar, isSidebarOpen }: HeaderProps) {
  const { theme } = useAppContext();
  const { getActiveReminders } = useReminders();
  const [activeReminders, setActiveReminders] = useState<number>(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    const reminders = getActiveReminders();
    setActiveReminders(reminders.length);
  }, [getActiveReminders]);

  // Dynamic classes based on theme
  const headerBgClass = isDarkMode ? 'bg-lighter-black' : 'bg-white';
  const headerBorderClass = isDarkMode ? 'border-gray-900' : 'border-gray-200';
  const buttonHoverClass = isDarkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100';
  const buttonTextClass = isDarkMode ? 'text-gray-300' : 'text-gray-500';
  const buttonHoverTextClass = isDarkMode ? 'hover:text-white' : 'hover:text-gray-900';
  const notificationBgClass = isDarkMode ? 'bg-lighter-black' : 'bg-white';
  const notificationBorderClass = isDarkMode ? 'border-gray-900' : 'border-gray-200';
  const notificationTextClass = isDarkMode ? 'text-gray-300' : 'text-gray-500';

  return (
    <header className={`${headerBgClass} border-b ${headerBorderClass} md:sticky relative top-0 z-20`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            className={`md:hidden p-2 ${buttonTextClass} ${buttonHoverTextClass} ${buttonHoverClass} rounded-lg transition-colors`}
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <div className="flex items-center space-x-3 group">
            <Radio className="w-8 h-8 text-blue-500 group-hover:animate-pulse transition-all duration-300" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              TrackStation Pro
            </h1>
          </div>
        </div>
        
        <nav className="flex items-center space-x-4">
          <div className="relative">
            <button 
              className={`p-2 ${buttonHoverClass} rounded-full relative transition-all duration-200 hover:rotate-12`}
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {activeReminders > 0 && (
                <Badge 
                  variant="danger" 
                  size="sm" 
                  pill 
                  className="absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center animate-pulse"
                >
                  {activeReminders}
                </Badge>
              )}
            </button>
            
            {showNotifications && (
              <div className={`absolute right-0 mt-2 w-80 ${notificationBgClass} border ${notificationBorderClass} rounded-lg shadow-lg z-20 overflow-hidden animate-fade-in`}>
                <div className={`p-3 border-b ${notificationBorderClass} flex justify-between items-center`}>
                  <h3 className="font-medium">{TEXT.notifications}</h3>
                  <button 
                    className={`${buttonTextClass} ${buttonHoverTextClass}`}
                    onClick={() => setShowNotifications(false)}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {activeReminders === 0 ? (
                    <div className={`p-4 text-center ${notificationTextClass}`}>
                      <p>No Notifications</p>
                    </div>
                  ) : (
                    <div className="p-2">
                      {/* Notification items would go here */}
                      <p className={`text-sm ${notificationTextClass} p-2`}>
                        You have {activeReminders} active reminders
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
