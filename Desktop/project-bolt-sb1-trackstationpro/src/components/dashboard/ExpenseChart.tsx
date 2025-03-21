import { useMemo, useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';
import { Card } from '../ui/Card';
import { useAppContext } from '../../hooks/useAppContext';
import { formatCurrency } from '../../utils/currency';
import { TEXT } from '../../constants/text';
import { Expense, License } from '../../types';

// Colors for the pie chart
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

interface ExpenseChartProps {
  expenses: Expense[];
  licenses?: License[];
}

export function ExpenseChart({ expenses, licenses = [] }: ExpenseChartProps) {
  const { currency } = useAppContext();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const pieData = useMemo(() => {
    // Group expenses by category and calculate totals
    const categories: Record<string, number> = {};
    
    expenses.forEach(expense => {
      const category = expense.category || TEXT.other;
      categories[category] = (categories[category] || 0) + expense.amount;
    });
    
    // Add license costs as a separate category
    if (licenses && licenses.length > 0) {
      const totalLicenseCost = licenses.reduce((sum, license) => sum + license.renewalCost, 0);
      categories[TEXT.licenses] = totalLicenseCost;
    }
    
    return Object.entries(categories).map(([name, value]) => ({
      name,
      value
    }));
  }, [expenses, licenses]);
  
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; name: string; }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 border border-gray-700 rounded-lg shadow-lg">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-gray-300">
            {formatCurrency(payload[0].value || 0, currency)}
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <Card className="custom-card h-full md:mx-0 -mx-6">
      <div className="md:p-4 p-0">
        <div className="flex items-center justify-center mb-4">
          <PieChartIcon className="w-5 h-5 mr-2 text-blue-500" />
          <h3 className="text-xl font-semibold">{TEXT.financialOverview}</h3>
        </div>
        
        {pieData.length > 0 ? (
          <div className="chart-container" style={{ height: isMobile ? '280px' : '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  labelLine={false}
                  outerRadius={isMobile ? 100 : 120}
                  innerRadius={isMobile ? 50 : 0} // Donut hole on mobile
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={1000}
                  animationBegin={200}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
            <p className="text-lg mb-2">{TEXT.noExpensesYet}</p>
            <p className="text-sm">{TEXT.noExpenses}</p>
          </div>
        )}
        
        {pieData.length > 0 && (
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {pieData.map((entry, index) => (
              <div 
                key={`legend-${index}`} 
                className="flex items-center"
              >
                <div 
                  style={{ 
                    backgroundColor: COLORS[index % COLORS.length],
                    width: isMobile ? '16px' : '16px',
                    height: isMobile ? '16px' : '16px',
                    borderRadius: '4px',
                    marginRight: '8px'
                  }} 
                />
                <span style={{ 
                  fontSize: isMobile ? '14px' : '14px',
                  fontWeight: 500
                }}>
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
