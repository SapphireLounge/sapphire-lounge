import { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Income } from '../../types';
import { Save, X, DollarSign } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import { TEXT } from '../../constants/text';

interface IncomeFormProps {
  onSubmit: (income: Omit<Income, 'id'>) => void;
  onCancel: () => void;
  initialData?: Income;
  isEdit?: boolean;
}

export function IncomeForm({ onSubmit, onCancel, initialData, isEdit = false }: IncomeFormProps) {
  const { currency } = useAppContext();
  const [formData, setFormData] = useState<Omit<Income, 'id'>>({
    name: initialData?.name || '',
    category: initialData?.category || '',
    amount: initialData?.amount || 0,
    frequency: initialData?.frequency || 'monthly',
    nextReceiptDate: initialData?.nextReceiptDate || new Date().toISOString().split('T')[0],
    notes: initialData?.notes || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Common income categories
  const categoryOptions = [
    { value: '', label: TEXT.selectCategory },
    { value: 'Salary', label: TEXT.salary },
    { value: 'Freelance', label: TEXT.freelance },
    { value: 'Investments', label: TEXT.investments },
    { value: 'Rental', label: TEXT.rental },
    { value: 'Royalties', label: TEXT.royalties },
    { value: 'Business', label: TEXT.business },
    { value: 'Other', label: TEXT.other }
  ];

  const frequencyOptions = [
    { value: 'monthly', label: TEXT.monthly },
    { value: 'quarterly', label: TEXT.quarterly },
    { value: 'yearly', label: TEXT.yearly },
    { value: 'one-time', label: TEXT.oneTime }
  ];

  // Currency symbol for display
  const currencySymbol = currency === 'GBP' ? '£' : '$';

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg border border-gray-700 p-3 sm:p-3 md:p-4 animate-fade-in">
      <h2 className="text-lg sm:text-xl font-bold mb-3 md:mb-3 gradient-text">
        {isEdit ? TEXT.editIncome : TEXT.addIncome}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-3 mb-3 md:mb-3">
        <Input
          label={TEXT.incomeName}
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <Select
          label={TEXT.category}
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={categoryOptions}
          required
        />
        
        <Input
          label={`${TEXT.amount} (${currencySymbol})`}
          name="amount"
          type="number"
          min="0"
          step="0.01"
          value={formData.amount.toString()}
          onChange={handleChange}
          required
          icon={<DollarSign className="w-4 h-4" />}
        />
        
        <Select
          label={TEXT.frequency}
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          options={frequencyOptions}
          required
        />
        
        <Input
          label={TEXT.nextReceiptDate}
          name="nextReceiptDate"
          type="date"
          value={formData.nextReceiptDate}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3 sm:mb-4 md:col-span-3">
        <label className="block text-sm md:text-base font-medium text-gray-300 mb-1">
          {TEXT.notes}
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 md:col-span-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          icon={<X className="w-4 h-4 sm:w-5 sm:h-5" />}
          fullWidth
        >
          {TEXT.cancel}
        </Button>
        
        <Button
          type="submit"
          icon={<Save className="w-4 h-4 sm:w-5 sm:h-5" />}
          fullWidth
        >
          {isEdit ? TEXT.updateIncome : TEXT.saveIncome}
        </Button>
      </div>
    </form>
  );
}
