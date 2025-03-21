import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Income } from '../../types';
import { formatCurrency } from '../../utils/currency';
import { useAppContext } from '../../hooks/useAppContext';

interface IncomeChartProps {
  income: Income[];
}

interface ChartData {
  name: string;
  value: number;
}

export function IncomeChart({ income }: IncomeChartProps) {
  const { t } = useTranslation();
  const { theme, currency } = useAppContext();
  const isDarkMode = theme === 'dark';

  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#06B6D4', '#EF4444'];
  
  const getIncomeByCategory = () => {
    const categories: Record<string, number> = {};
    
    income.forEach(item => {
      if (categories[item.category]) {
        categories[item.category] += item.amount;
      } else {
        categories[item.category] = item.amount;
      }
    });
    
    return Object.entries(categories).map(([name, value]) => ({
      name,
      value
    }));
  };
  
  const data = getIncomeByCategory();
  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  
  const cardBgClass = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const cardBorderClass = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const textClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  
  interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
      payload: ChartData;
      value: number;
      name: string;
    }>;
  }
  
  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={`${cardBgClass} p-2 border ${cardBorderClass} rounded shadow-lg`}>
          <p className="font-medium">{data.name}</p>
          <p className={`${textClass}`}>
            {formatCurrency(data.value, currency)} 
            ({((data.value / totalIncome) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className={`${cardBgClass} rounded-lg border ${cardBorderClass} p-4 h-full flex flex-col`}>
      <h2 className="text-xl font-bold mb-4 gradient-text">{t('incomeByCategory')}</h2>
      
      {income.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className={`text-center ${textClass}`}>{t('noIncomeData')}</p>
        </div>
      ) : (
        <div className="flex-1 min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <span className={textClass}>{t('totalIncome')}</span>
          <span className="text-xl font-bold text-green-500">
            {formatCurrency(totalIncome, currency)}
          </span>
        </div>
      </div>
    </div>
  );
}
