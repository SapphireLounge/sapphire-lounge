import { useState } from 'react';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { IncomeCard } from '../components/income/IncomeCard';
import { IncomeForm } from '../components/income/IncomeForm';
import { useIncome } from '../hooks/useIncome';
import { Income as IncomeType } from '../types';
import { TEXT } from '../constants/text';

export default function Income() {
  const { income, addIncome, updateIncome, deleteIncome } = useIncome();
  
  const [showForm, setShowForm] = useState(false);
  const [editIncome, setEditIncome] = useState<IncomeType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const handleAddIncome = (incomeItem: Omit<IncomeType, 'id'>) => {
    addIncome(incomeItem);
    setShowForm(false);
  };
  
  const handleUpdateIncome = (incomeItem: Omit<IncomeType, 'id'>) => {
    if (editIncome) {
      updateIncome(editIncome.id, incomeItem);
      setEditIncome(null);
    }
  };
  
  const handleEditClick = (incomeItem: IncomeType) => {
    setEditIncome(incomeItem);
  };
  
  const handleDeleteClick = (id: string) => {
    if (window.confirm(TEXT.confirmDeleteIncome)) {
      deleteIncome(id);
    }
  };
  
  const handleCancelForm = () => {
    setShowForm(false);
    setEditIncome(null);
  };
  
  const filteredIncome = income.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="p-4 animate-fade-in custom-container sm:flex sm:flex-col sm:h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold gradient-text custom-heading text-center sm:text-left w-full sm:w-auto">{TEXT.income}</h1>
        
        <Button 
          onClick={() => setShowForm(true)}
          icon={<Plus className="w-6 h-6" />}
          className="w-full sm:w-auto"
        >
          {TEXT.addIncome}
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder={TEXT.searchIncome}
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
      
      {(showForm || editIncome) && (
        <div className="mb-6 animate-slide-up">
          <IncomeForm
            onSubmit={editIncome ? handleUpdateIncome : handleAddIncome}
            onCancel={handleCancelForm}
            initialData={editIncome || undefined}
            isEdit={!!editIncome}
          />
        </div>
      )}
      
      <div className="sm:flex-1 sm:min-h-0 sm:overflow-auto">
        {filteredIncome.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-lg text-gray-400">{TEXT.noIncomeFound}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredIncome.map(item => (
              <div key={item.id} className="animate-fade-in">
                <IncomeCard
                  income={item}
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
