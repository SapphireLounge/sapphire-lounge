import { FileText, Bell, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { SummaryCard } from '../components/dashboard/SummaryCard';
import { UpcomingPayments } from '../components/dashboard/UpcomingPayments';
import { ExpenseChart } from '../components/dashboard/ExpenseChart';
import { useLicenses } from '../hooks/useLicenses';
import { useExpenses } from '../hooks/useExpenses';
import { useIncome } from '../hooks/useIncome';
import { useReminders } from '../hooks/useReminders';
import { formatCurrency } from '../utils/currency';
import { useAppContext } from '../hooks/useAppContext';
import { TEXT } from '../constants/text';

export default function Dashboard() {
  const { currency } = useAppContext();
  const { licenses } = useLicenses();
  const { expenses } = useExpenses();
  const { income } = useIncome();
  const { reminders } = useReminders();
  
  const activeReminders = reminders.filter(r => !r.dismissed).length;
  const licenseCosts = licenses.reduce((sum, license) => sum + license.renewalCost, 0);
  const expensesTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalExpenses = expensesTotal + licenseCosts;
  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  
  return (
    <div className="md:p-4 p-0 custom-container page-transition transform-gpu">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold gradient-text text-center sm:text-left w-full">{TEXT.dashboard}</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <SummaryCard
          title={TEXT.totalLicenses}
          value={licenses.length.toString()}
          icon={<FileText className="w-10 h-10 sm:w-12 sm:h-12 text-white" />}
          color="blue"
        />
        
        <SummaryCard
          title={TEXT.activeReminders}
          value={activeReminders.toString()}
          icon={<Bell className="w-10 h-10 sm:w-12 sm:h-12 text-white" />}
          color="purple"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <SummaryCard
          title={TEXT.totalIncome}
          value={formatCurrency(totalIncome, currency)}
          icon={<ArrowUpRight className="w-10 h-10 sm:w-12 sm:h-12 text-white" />}
          color="green"
        />
        
        <SummaryCard
          title={TEXT.totalExpenses}
          value={formatCurrency(totalExpenses, currency)}
          icon={<ArrowDownRight className="w-10 h-10 sm:w-12 sm:h-12 text-white" />}
          color="red"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:px-0 px-0">
        <ExpenseChart expenses={expenses} licenses={licenses} />
        <UpcomingPayments />
      </div>
    </div>
  );
}
