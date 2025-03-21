import { useState } from 'react';
import { X, Calendar, DollarSign } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Expense } from '../../types';
import { useAppContext } from '../../hooks/useAppContext';
import { TEXT } from '../../constants/text';

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, 'id'>) => void;
  onCancel: () => void;
  initialData?: Expense;
  isEdit?: boolean;
}

export function ExpenseForm({ 
  onSubmit, 
  onCancel, 
  initialData, 
  isEdit = false 
}: ExpenseFormProps) {
  const { currency } = useAppContext();
  const [formData, setFormData] = useState<Omit<Expense, 'id'>>({
    name: initialData?.name || '',
    category: initialData?.category || '',
    amount: initialData?.amount || 0,
    frequency: initialData?.frequency || 'monthly',
    nextDueDate: initialData?.nextDueDate || new Date().toISOString().split('T')[0],
    notes: initialData?.notes || ''
  });
  
  const [startDate, setStartDate] = useState<string>(
    initialData?.nextDueDate || new Date().toISOString().split('T')[0]
  );
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Calculate next due date based on start date and frequency
  const calculateNextDueDate = (date: string, frequency: string): string => {
    if (!date) return '';
    
    const startDate = new Date(date);
    const nextDueDate = new Date(startDate);
    
    switch (frequency) {
      case 'monthly':
        nextDueDate.setMonth(nextDueDate.getMonth() + 1);
        break;
      case 'quarterly':
        nextDueDate.setMonth(nextDueDate.getMonth() + 3);
        break;
      case 'yearly':
        nextDueDate.setFullYear(nextDueDate.getFullYear() + 1);
        break;
      default:
        // For one-time or custom frequencies, don't change the date
        break;
    }
    
    return nextDueDate.toISOString().split('T')[0];
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'frequency') {
      // When frequency changes, recalculate the next due date
      const newNextDueDate = calculateNextDueDate(startDate, value);
      setFormData(prev => ({
        ...prev,
        frequency: value as 'monthly' | 'quarterly' | 'yearly' | 'custom',
        nextDueDate: newNextDueDate
      }));
    } else if (name === 'startDate') {
      // When start date changes, update both the start date state and recalculate next due date
      setStartDate(value);
      const newNextDueDate = calculateNextDueDate(value, formData.frequency);
      setFormData(prev => ({
        ...prev,
        nextDueDate: newNextDueDate
      }));
    } else {
      // For other fields, just update the value
      setFormData(prev => ({
        ...prev,
        [name]: name === 'amount' ? parseFloat(value) || 0 : value
      }));
    }
    
    // Clear any error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = TEXT.nameRequired;
    }
    
    if (!formData.category.trim()) {
      newErrors.category = TEXT.categoryRequired;
    }
    
    if (formData.amount <= 0) {
      newErrors.amount = TEXT.validAmountRequired;
    }
    
    if (!formData.nextDueDate) {
      newErrors.nextDueDate = TEXT.dueDateRequired;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  // Currency symbol for display
  const currencySymbol = currency === 'GBP' ? '£' : '$';
  
  // Common expense categories
  const categoryOptions = [
    { value: '', label: TEXT.selectCategory },
    { value: 'StudioRent', label: TEXT.studioRent },
    { value: 'OfficeRent', label: TEXT.officeRent },
    { value: 'BroadcastingEquipment', label: TEXT.broadcastingEquipment },
    { value: 'BroadcastingLicenses', label: TEXT.broadcastingLicenses },
    { value: 'MusicLicensing', label: TEXT.musicLicensing },
    { value: 'TalentFees', label: TEXT.talentFees },
    { value: 'ProductionSoftware', label: TEXT.productionSoftware },
    { value: 'Marketing', label: TEXT.marketing },
    { value: 'Utilities', label: TEXT.utilities },
    { value: 'Insurance', label: TEXT.insurance },
    { value: 'Subscriptions', label: TEXT.subscriptions },
    { value: 'Other', label: TEXT.other }
  ];
  
  const frequencyOptions = [
    { value: 'monthly', label: TEXT.monthly },
    { value: 'quarterly', label: TEXT.quarterly },
    { value: 'yearly', label: TEXT.yearly }
  ];
  
  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg border border-gray-700 p-3 sm:p-3 md:p-4 animate-fade-in">
      <h2 className="text-lg sm:text-xl font-bold mb-3 md:mb-3 gradient-text">
        {isEdit ? TEXT.editExpense : TEXT.addExpense}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-3 mb-3 md:mb-3">
        <Input
          label={TEXT.expenseName}
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        
        <Select
          label={TEXT.category}
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={categoryOptions}
          error={errors.category}
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
          error={errors.amount}
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
          label={TEXT.startDate}
          name="startDate"
          type="date"
          value={startDate}
          onChange={handleChange}
          required
          icon={<Calendar className="w-4 h-4" />}
        />
        
        <Input
          label={TEXT.nextDueDate}
          name="nextDueDate"
          type="date"
          value={formData.nextDueDate}
          readOnly
          disabled
          icon={<Calendar className="w-4 h-4" />}
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
          fullWidth
        >
          {isEdit ? TEXT.updateExpense : TEXT.saveExpense}
        </Button>
      </div>
    </form>
  );
}
