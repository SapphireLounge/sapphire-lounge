import { useState } from 'react';
import { X, Calendar, FileText, DollarSign } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { License } from '../../types';
import { useAppContext } from '../../hooks/useAppContext';
import { TEXT } from '../../constants/text';

interface LicenseFormProps {
  onSubmit: (license: Omit<License, 'id'>) => void;
  onCancel: () => void;
  initialData?: License;
  isEdit?: boolean;
}

export function LicenseForm({ 
  onSubmit, 
  onCancel, 
  initialData, 
  isEdit = false 
}: LicenseFormProps) {
  const { currency } = useAppContext();
  const [formData, setFormData] = useState<Omit<License, 'id'>>({
    name: initialData?.name || '',
    startDate: initialData?.startDate || new Date().toISOString().split('T')[0],
    renewalFrequency: initialData?.renewalFrequency || 'monthly',
    renewalCost: initialData?.renewalCost || 0,
    nextDueDate: initialData?.nextDueDate || new Date().toISOString().split('T')[0],
    notes: initialData?.notes || ''
  });
  
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
      case 'yearly':
        nextDueDate.setFullYear(nextDueDate.getFullYear() + 1);
        break;
      default:
        // For custom frequency, don't change the date
        break;
    }
    
    return nextDueDate.toISOString().split('T')[0];
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'startDate') {
      // When start date changes, update the start date and recalculate next due date
      const newNextDueDate = calculateNextDueDate(value, formData.renewalFrequency);
      setFormData(prev => ({
        ...prev,
        startDate: value,
        nextDueDate: formData.renewalFrequency === 'custom' ? prev.nextDueDate : newNextDueDate
      }));
    } else if (name === 'renewalFrequency') {
      // When frequency changes, recalculate the next due date
      const newNextDueDate = calculateNextDueDate(formData.startDate, value);
      setFormData(prev => ({
        ...prev,
        renewalFrequency: value as 'monthly' | 'yearly' | 'custom',
        nextDueDate: value === 'custom' ? prev.nextDueDate : newNextDueDate
      }));
    } else {
      // For other fields, just update the value
      setFormData(prev => ({
        ...prev,
        [name]: name === 'renewalCost' ? parseFloat(value) || 0 : value
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
    
    if (!formData.startDate) {
      newErrors.startDate = TEXT.startDateRequired;
    }
    
    if (!formData.nextDueDate) {
      newErrors.nextDueDate = TEXT.dueDateRequired;
    }
    
    if (formData.renewalCost <= 0) {
      newErrors.renewalCost = TEXT.validAmountRequired;
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
  
  const frequencyOptions = [
    { value: 'monthly', label: TEXT.monthly },
    { value: 'yearly', label: TEXT.yearly },
    { value: 'custom', label: TEXT.custom }
  ];
  
  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg border border-gray-700 p-3 sm:p-3 md:p-4 animate-fade-in">
      <h2 className="text-lg sm:text-xl font-bold mb-3 md:mb-3 gradient-text">
        {isEdit ? TEXT.editLicense : TEXT.addLicense}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-3 mb-3 md:mb-3">
        <Input
          label={TEXT.licenseName}
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
          icon={<FileText className="w-4 h-4" />}
        />
        
        <Select
          label={TEXT.renewalFrequency}
          name="renewalFrequency"
          value={formData.renewalFrequency}
          onChange={handleChange}
          options={frequencyOptions}
          required
        />
        
        <Input
          label={`${TEXT.renewalCost} (${currencySymbol})`}
          name="renewalCost"
          type="number"
          min="0"
          step="0.01"
          value={formData.renewalCost.toString()}
          onChange={handleChange}
          error={errors.renewalCost}
          required
          icon={<DollarSign className="w-4 h-4" />}
        />
        
        <Input
          label={TEXT.startDate}
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          error={errors.startDate}
          required
          icon={<Calendar className="w-4 h-4" />}
        />
        
        <div className="col-span-1 sm:col-span-2">
          <Input
            label={TEXT.nextDueDate}
            name="nextDueDate"
            type="date"
            value={formData.nextDueDate}
            onChange={handleChange}
            error={errors.nextDueDate}
            disabled={formData.renewalFrequency !== 'custom'}
            readOnly={formData.renewalFrequency !== 'custom'}
            required
            icon={<Calendar className="w-4 h-4" />}
          />
          {formData.renewalFrequency !== 'custom' && (
            <p className="text-xs text-gray-400 mt-1">
              {TEXT.autoCalculated}
            </p>
          )}
        </div>
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
          {isEdit ? TEXT.updateLicense : TEXT.saveLicense}
        </Button>
      </div>
    </form>
  );
}
