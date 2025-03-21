import { useState } from 'react';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ExpenseCard } from '../components/expenses/ExpenseCard';
import { ExpenseForm } from '../components/expenses/ExpenseForm';
import { useExpenses } from '../hooks/useExpenses';
import { Expense } from '../types';
import { TEXT } from '../constants/text';

export default function Expenses() {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  
  const [showForm, setShowForm] = useState(false);
  const [editExpense, setEditExpense] = useState<Expense | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    addExpense(expense);
    setShowForm(false);
  };
  
  const handleUpdateExpense = (expense: Omit<Expense, 'id'>) => {
    if (editExpense) {
      updateExpense(editExpense.id, expense);
      setEditExpense(null);
    }
  };
  
  const handleEditClick = (expense: Expense) => {
    setEditExpense(expense);
  };
  
  const handleDeleteClick = (id: string) => {
    if (window.confirm(TEXT.confirmDeleteExpense)) {
      deleteExpense(id);
    }
  };
  
  const handleCancelForm = () => {
    setShowForm(false);
    setEditExpense(null);
  };
  
  const filteredExpenses = expenses.filter(expense => 
    expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="p-4 animate-fade-in custom-container sm:flex sm:flex-col sm:h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold gradient-text custom-heading text-center sm:text-left w-full sm:w-auto">{TEXT.expenses}</h1>
        
        <Button 
          onClick={() => setShowForm(true)}
          icon={<Plus className="w-6 h-6" />}
          className="w-full sm:w-auto"
        >
          {TEXT.addExpense}
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder={TEXT.searchExpenses}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-5 h-5" />}
            fullWidth
          />
        </div>
        
        <Button
          variant="outline"
          icon={<SlidersHorizontal className="w-5 h-5" />}
          onClick={() => setShowFilters(!showFilters)}
          className="w-full sm:w-auto"
        >
          {TEXT.filters}
        </Button>
      </div>
      
      {showFilters && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 animate-fade-in mb-6">
          <p className="text-gray-400">{TEXT.filtersComingSoon}</p>
        </div>
      )}
      
      {(showForm || editExpense) && (
        <div className="mb-6 animate-slide-up">
          <ExpenseForm
            onSubmit={editExpense ? handleUpdateExpense : handleAddExpense}
            onCancel={handleCancelForm}
            initialData={editExpense || undefined}
            isEdit={!!editExpense}
          />
        </div>
      )}
      
      <div className="sm:flex-1 sm:min-h-0 sm:overflow-auto">
        {filteredExpenses.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-lg text-gray-400">{TEXT.noExpensesFound}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredExpenses.map(expense => (
              <div key={expense.id} className="animate-fade-in">
                <ExpenseCard
                  expense={expense}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
