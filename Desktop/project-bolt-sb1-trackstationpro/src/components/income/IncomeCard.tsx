import { useState, useRef, useEffect } from 'react';
import { Calendar, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Income } from '../../types';
import { formatCurrency } from '../../utils/currency';
import { formatDate } from '../../utils/date';
import { useAppContext } from '../../hooks/useAppContext';
import { TEXT } from '../../constants/text';

interface IncomeCardProps {
  income: Income;
  onEdit: (income: Income) => void;
  onDelete: (id: string) => void;
}

export function IncomeCard({ income, onEdit, onDelete }: IncomeCardProps) {
  const { currency } = useAppContext();
  const [showActions, setShowActions] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Add click-away listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowActions(false);
      }
    }
    
    // Add event listener when menu is shown
    if (showActions) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showActions]);

  // Mobile view layout
  const mobileView = (
    <div className="flex justify-between items-start sm:hidden">
      <div>
        <h3 className="text-lg font-semibold mb-0 truncate pr-2">
          {income.name}
        </h3>
        
        <div className="space-y-0.5 text-sm mb-1">
          <div className="flex items-center text-gray-300">
            <Calendar className="w-3.5 h-3.5 mr-1.5 text-gray-400 flex-shrink-0" />
            <span className="truncate">
              {formatDate(income.nextReceiptDate)}
            </span>
          </div>
          
          <div className="flex items-center text-gray-300">
            <span className="flex items-center">
              <span className="font-medium text-sm text-green-400">{formatCurrency(income.amount, currency)}</span>
              <span className="ml-1 text-gray-400 text-xs">
                {income.frequency === 'monthly' 
                  ? TEXT.monthly 
                  : income.frequency === 'quarterly' 
                    ? TEXT.quarterly 
                    : income.frequency === 'yearly'
                      ? TEXT.yearly
                      : TEXT.oneTime
                }
              </span>
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-end">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-0.5 text-gray-400 hover:text-white rounded-full hover:bg-gray-700 transition-colors"
            aria-label={TEXT.actions}
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          
          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-10 animate-fade-in">
              <div className="py-1">
                <button
                  onClick={() => {
                    setShowActions(false);
                    onEdit(income);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-700 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {TEXT.edit}
                </button>
                
                <button
                  onClick={() => {
                    setShowActions(false);
                    onDelete(income.id);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-left text-red-400 hover:bg-gray-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {TEXT.delete}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-2 flex justify-end">
          <Badge variant="secondary" className="text-xs">
            {income.category}
          </Badge>
        </div>
      </div>
    </div>
  );

  // Desktop view layout - like LicenseCard
  const desktopView = (
    <div className="hidden sm:block">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold mb-2 truncate pr-2">{income.name}</h3>
        
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700 transition-colors"
            aria-label={TEXT.actions}
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge variant="secondary">
          {income.frequency === 'monthly' 
            ? TEXT.monthly 
            : income.frequency === 'quarterly' 
              ? TEXT.quarterly 
              : income.frequency === 'yearly'
                ? TEXT.yearly
                : TEXT.oneTime
          }
        </Badge>
        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span className="text-xs text-gray-300">{income.category}</span>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-300">
          <Calendar className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
          <span className="truncate">
            {TEXT.nextReceipt}: {formatDate(income.nextReceiptDate)}
          </span>
        </div>
        
        <div className="flex items-center text-gray-300">
          <span className="truncate">
            {TEXT.amount}: {formatCurrency(income.amount, currency)}
          </span>
        </div>
      </div>
      
      {income.notes && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-sm text-gray-400 line-clamp-3">{income.notes}</p>
        </div>
      )}
    </div>
  );

  return (
    <Card 
      className="h-full transform transition-all duration-300 hover:shadow-lg sm:mx-0 -mx-6 sm:p-4 p-2"
      hover
    >
      {mobileView}
      {desktopView}
    </Card>
  );
}
