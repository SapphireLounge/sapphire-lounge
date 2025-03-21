import { useState, useRef, useEffect } from 'react';
import { Calendar, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { License } from '../../types';
import { formatDate, getDaysUntil, isOverdue } from '../../utils/date';
import { formatCurrency } from '../../utils/currency';
import { useAppContext } from '../../hooks/useAppContext';
import { TEXT } from '../../constants/text';

interface LicenseCardProps {
  license: License;
  onEdit: (license: License) => void;
  onDelete: (id: string) => void;
}

export function LicenseCard({ license, onEdit, onDelete }: LicenseCardProps) {
  const { currency } = useAppContext();
  const [showActions, setShowActions] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const daysUntilRenewal = getDaysUntil(license.nextDueDate);
  const isLicenseOverdue = isOverdue(license.nextDueDate);
  
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
  
  const getStatusBadge = () => {
    if (isLicenseOverdue) {
      return <Badge variant="danger">{TEXT.overdue}</Badge>;
    } else if (daysUntilRenewal <= 7) {
      return <Badge variant="warning">{TEXT.dueInDays(daysUntilRenewal)}</Badge>;
    } else {
      return <Badge variant="success">{TEXT.active}</Badge>;
    }
  };
  
  return (
    <Card 
      className="h-full transform transition-all duration-300 hover:shadow-lg"
      hover
    >
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold mb-2 truncate pr-2">{license.name}</h3>
        
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700 transition-colors"
            aria-label={TEXT.actions}
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          
          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-10 animate-fade-in">
              <div className="py-1">
                <button
                  onClick={() => {
                    setShowActions(false);
                    onEdit(license);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-700 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {TEXT.edit}
                </button>
                
                <button
                  onClick={() => {
                    setShowActions(false);
                    onDelete(license.id);
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
      </div>
      
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {getStatusBadge()}
        <Badge variant="secondary">
          {license.renewalFrequency === 'monthly' 
            ? TEXT.monthly 
            : license.renewalFrequency === 'yearly' 
              ? TEXT.yearly
              : license.renewalFrequency === 'custom'
                ? TEXT.custom
                : TEXT.oneTime
          }
        </Badge>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-300">
          <Calendar className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
          <span className="truncate">
            {TEXT.nextRenewal}: {formatDate(license.nextDueDate)}
          </span>
        </div>
        
        <div className="flex items-center text-gray-300">
          <span className="truncate">
            {TEXT.cost}: {formatCurrency(license.renewalCost, currency)}
          </span>
        </div>
      </div>
      
      {license.notes && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-sm text-gray-400 line-clamp-3">{license.notes}</p>
        </div>
      )}
    </Card>
  );
}
