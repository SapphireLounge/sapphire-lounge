import { Calendar, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useLicenses } from '../../hooks/useLicenses';
import { useExpenses } from '../../hooks/useExpenses';
import { formatDate, isUpcoming, getDaysUntil } from '../../utils/date';
import { formatCurrency } from '../../utils/currency';
import { useAppContext } from '../../hooks/useAppContext';
import { TEXT } from '../../constants/text';
import { useState, useEffect, useMemo } from 'react';

export function UpcomingPayments() {
  const { currency } = useAppContext();
  const { licenses } = useLicenses();
  const { expenses } = useExpenses();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const upcomingItems = useMemo(() => {
    const items = [
      ...licenses.map(license => ({
        id: license.id,
        name: license.name,
        dueDate: license.nextDueDate,
        amount: license.renewalCost,
        type: 'license' as const
      })),
      ...expenses.map(expense => ({
        id: expense.id,
        name: expense.name,
        dueDate: expense.nextDueDate,
        amount: expense.amount,
        type: 'expense' as const
      }))
    ];
    
    return items
      .filter(item => isUpcoming(item.dueDate))
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 5);
  }, [licenses, expenses]);
  
  const getStatusBadge = (daysLeft: number) => {
    if (daysLeft < 0) {
      return <Badge variant="danger">{TEXT.overdue}</Badge>;
    } else if (daysLeft <= 7) {
      return <Badge variant="warning">{TEXT.soon}</Badge>;
    } else {
      return <Badge variant="info">{TEXT.upcoming}</Badge>;
    }
  };
  
  const toggleExpand = (itemId: string) => {
    if (isMobile) {
      setExpandedItems(prev => ({
        ...prev,
        [itemId]: !prev[itemId]
      }));
    }
  };
  
  return (
    <Card className="h-full custom-card md:mx-0 -mx-8">
      <div className="md:p-4 p-0 md:h-auto h-full">
        <div className="flex items-center justify-center mb-4 md:mb-6">
          <Calendar className="w-5 h-5 mr-2 text-blue-500" />
          <h3 className="text-xl font-semibold">{TEXT.upcomingPayments}</h3>
        </div>
      
        {upcomingItems.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p className="text-lg">{TEXT.noUpcomingPayments}</p>
          </div>
        ) : (
          <div className="space-y-4 md:h-auto h-full md:overflow-visible overflow-y-auto">
            {upcomingItems.map(item => {
              const daysLeft = getDaysUntil(item.dueDate);
              const itemId = `${item.type}-${item.id}`;
              const isExpanded = expandedItems[itemId] || false;
              
              return (
                <div 
                  key={itemId}
                  className="rounded-md bg-gray-800 hover:bg-gray-700 transition-colors group shadow-lg border border-gray-700 relative overflow-hidden md:-mx-12 -mx-8"
                  style={{ marginBottom: '16px', maxHeight: !isMobile ? 'none' : undefined }}
                >
                  <div 
                    className="p-5 md:p-6 flex justify-between items-center cursor-pointer"
                    onClick={() => toggleExpand(itemId)}
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="text-base font-medium truncate mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-400">
                        {formatDate(item.dueDate)}
                      </p>
                    </div>
                    
                    {isMobile && (
                      <div className="flex flex-col items-end">
                        <div className="mb-2">
                          {getStatusBadge(daysLeft)}
                        </div>
                        <p className="text-base font-medium text-gray-300">
                          {formatCurrency(item.amount, currency)}
                        </p>
                      </div>
                    )}
                    
                    {!isMobile && (
                      <div className="flex items-center">
                        <p className="text-base font-medium text-gray-300">
                          {formatCurrency(item.amount, currency)}
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          icon={<ArrowRight className="w-5 h-5" />}
                          aria-label={TEXT.viewDetails}
                          className="ml-4"
                        >
                          {TEXT.view}
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {isMobile && isExpanded && (
                    <div className="px-5 md:px-6 pb-4 pt-2 border-t border-gray-700 bg-gray-750">
                      <div className="flex justify-end">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          icon={<ArrowRight className="w-5 h-5" />}
                          aria-label={TEXT.viewDetails}
                        >
                          {TEXT.viewDetails}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
}
