import { useState, useRef, useEffect } from 'react';
import { Calendar, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Expense } from '../../types';
import { formatDate, getDaysUntil, isOverdue } from '../../utils/date';
import { formatCurrency } from '../../utils/currency';
import { useAppContext } from '../../hooks/useAppContext';
import { TEXT } from '../../constants/text';

interface ExpenseCardProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
  onProcessPayment?: (id: string) => void; 
}

export function ExpenseCard({ expense, onEdit, onDelete }: ExpenseCardProps) {
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
  
  const daysUntilDue = getDaysUntil(expense.nextDueDate);
  const isExpenseOverdue = isOverdue(expense.nextDueDate);
  
  const getStatusBadge = () => {
    if (isExpenseOverdue) {
      return <Badge variant="danger">{TEXT.overdue}</Badge>;
    } else if (daysUntilDue <= 7) {
      return <Badge variant="warning">{TEXT.dueInDays(daysUntilDue)}</Badge>;
    } else {
      return <Badge variant="success">{TEXT.upcoming}</Badge>;
    }
  };
  
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      [TEXT.software]: 'bg-blue-500',
      [TEXT.hardware]: 'bg-green-500',
      [TEXT.services]: 'bg-purple-500',
      [TEXT.utilities]: 'bg-yellow-500',
      [TEXT.rent]: 'bg-red-500',
      [TEXT.salaries]: 'bg-indigo-500',
      [TEXT.other]: 'bg-gray-500'
    };
    
    return colors[category] || 'bg-gray-500';
  };
  
  // Format the category for display
  const getDisplayCategory = (category: string) => {
    // Map internal category values to display-friendly names
    const categoryMap: Record<string, string> = {
      'StudioRent': 'Studio Rent',
      'OfficeRent': 'Office Rent',
      'BroadcastingEquipment': 'Broadcasting Equipment',
      'BroadcastingLicenses': 'Broadcasting Licenses',
      'MusicLicensing': 'Music Licensing',
      'TalentFees': 'Talent Fees',
      'ProductionSoftware': 'Production Software',
      'Marketing': 'Marketing & Promotion'
    };
    
    return categoryMap[category] || category;
  };
  
  return (
    <Card 
      className="h-full transform transition-all duration-300 hover:shadow-lg sm:mx-0 -mx-6 sm:p-4 p-2"
      hover
    >
      {/* Mobile view layout */}
      <div className="flex justify-between items-start sm:hidden">
        <div>
          <h3 className="text-lg font-semibold mb-0 truncate pr-2">
            {expense.name}
            <span className="text-sm font-normal text-gray-400 ml-2">
              ({getDisplayCategory(expense.category)})
            </span>
          </h3>
          
          <div className="space-y-0.5 text-sm mb-1">
            <div className="flex items-center text-gray-300">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-gray-400 flex-shrink-0" />
              <span className="truncate">
                {formatDate(expense.nextDueDate)}
              </span>
            </div>
            
            <div className="flex items-center text-gray-300">
              <span className="flex items-center">
                <span className="font-medium text-sm">{formatCurrency(expense.amount, currency)}</span>
                <span className="ml-1 text-gray-400 text-xs">
                  {expense.frequency === 'monthly' 
                    ? TEXT.monthly 
                    : expense.frequency === 'quarterly' 
                      ? TEXT.quarterly 
                      : expense.frequency === 'yearly'
                        ? TEXT.yearly
                        : expense.frequency === 'custom'
                          ? TEXT.custom
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
                      onEdit(expense);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-700 transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {TEXT.edit}
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowActions(false);
                      onDelete(expense.id);
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
          <div className="mt-0.5">
            {getStatusBadge()}
          </div>
        </div>
      </div>
      
      {/* Desktop view layout - like LicenseCard */}
      <div className="hidden sm:block">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold mb-2 truncate pr-2">{expense.name}</h3>
          
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
          {getStatusBadge()}
          <Badge variant="secondary">
            {expense.frequency === 'monthly' 
              ? TEXT.monthly 
              : expense.frequency === 'quarterly' 
                ? TEXT.quarterly 
                : expense.frequency === 'yearly'
                  ? TEXT.yearly
                  : expense.frequency === 'custom'
                    ? TEXT.custom
                    : TEXT.oneTime
            }
          </Badge>
          <div className="flex items-center space-x-1">
            <span className={`w-2 h-2 rounded-full ${getCategoryColor(expense.category)}`}></span>
            <span className="text-xs text-gray-300">{getDisplayCategory(expense.category)}</span>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-300">
            <Calendar className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
            <span className="truncate">
              {TEXT.dueDate}: {formatDate(expense.nextDueDate)}
            </span>
          </div>
          
          <div className="flex items-center text-gray-300">
            <span className="truncate">
              {TEXT.amount}: {formatCurrency(expense.amount, currency)}
            </span>
          </div>
        </div>
        
        {expense.notes && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400 line-clamp-3">{expense.notes}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
