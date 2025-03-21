import { Tab } from '../../hooks/AppTypes';
import { useNavigate } from 'react-router-dom';
import { TEXT } from '../../constants/text';
import { useAppContext } from '../../hooks/useAppContext';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItem {
  id: Tab;
  label: string;
  path: string;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const { activeTab, setActiveTab, theme } = useAppContext();
  const navigate = useNavigate();
  const isDarkMode = theme === 'dark';
  
  const navItems: NavItem[] = [
    { id: 'dashboard' as Tab, label: TEXT.dashboard, path: '/dashboard' },
    { id: 'licenses' as Tab, label: TEXT.licenses, path: '/licenses' },
    { id: 'expenses' as Tab, label: TEXT.expenses, path: '/expenses' },
    { id: 'income' as Tab, label: TEXT.income, path: '/income' },
    { id: 'settings' as Tab, label: TEXT.settings, path: '/settings' },
    { id: 'about' as Tab, label: TEXT.about, path: '/about' }
  ];
  
  const handleNavClick = (tabId: Tab, path: string) => {
    setActiveTab(tabId);
    navigate(path);
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      // If there's a way to close the sidebar, call it here
      // This assumes the parent component has a way to close the sidebar
      if (typeof isOpen !== 'undefined') {
        // This is a workaround since we don't have direct access to setSidebarOpen
        // The parent component should handle closing the sidebar
        document.dispatchEvent(new CustomEvent('closeSidebar'));
      }
    }
  };
  
  const sidebarBgClass = isDarkMode ? 'bg-lighter-black' : 'bg-white';
  const sidebarBorderClass = isDarkMode ? 'border-gray-900' : 'border-gray-200';
  const textClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const hoverBgClass = isDarkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100';
  const activeBgClass = isDarkMode ? 'bg-blue-600' : 'bg-blue-500';
  const footerBgClass = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
  const footerTextClass = isDarkMode ? 'text-gray-300' : 'text-gray-500';
  
  return (
    <aside className={`
      w-64 z-20 h-[calc(100vh-64px)]
      transform transition-transform duration-300 ease-in-out
      ${sidebarBgClass} border-r ${sidebarBorderClass}
      md:fixed md:top-[64px] md:left-0 md:translate-x-0
      fixed top-[64px] left-0 bottom-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="h-full flex flex-col">
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.path)}
              className={`
                w-full flex justify-center items-center px-4 py-3 rounded-lg 
                transition-all duration-300 ease-in-out
                ${activeTab === item.id 
                  ? `${activeBgClass} text-white shadow-md transform translate-x-1 animate-slide-in-left` 
                  : `${hoverBgClass} ${textClass} hover:text-white`
                }
              `}
            >
              <span className={`font-medium text-xl`}>{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className={`p-4 border-t ${sidebarBorderClass}`}>
          <div className={`${footerBgClass} rounded-lg p-4 text-center hover-scale`}>
            <p className={`text-sm ${footerTextClass}`}>{TEXT.version} 1.0.0</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
