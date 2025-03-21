import { useState, useEffect } from 'react';
import { Income } from '../types';
import { storage } from '../utils/storage';
import toast from 'react-hot-toast';

export function useIncome() {
  const [income, setIncome] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncome = () => {
      try {
        const data = storage.getIncome();
        setIncome(data);
      } catch (error) {
        console.error('Error fetching income:', error);
        toast.error('Failed to load income data');
      } finally {
        setLoading(false);
      }
    };

    fetchIncome();
  }, []);

  const addIncome = (incomeItem: Omit<Income, 'id'>) => {
    try {
      const newIncome = { 
        ...incomeItem, 
        id: crypto.randomUUID() 
      };
      const updatedIncome = [...income, newIncome];
      storage.setIncome(updatedIncome);
      setIncome(updatedIncome);
      toast.success('Income added successfully');
      return newIncome;
    } catch (error) {
      console.error('Error adding income:', error);
      toast.error('Failed to add income');
      return null;
    }
  };

  const updateIncome = (id: string, updates: Partial<Income>) => {
    try {
      const updatedIncome = income.map(item =>
        item.id === id ? { ...item, ...updates } : item
      );
      storage.setIncome(updatedIncome);
      setIncome(updatedIncome);
      toast.success('Income updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating income:', error);
      toast.error('Failed to update income');
      return false;
    }
  };

  const deleteIncome = (id: string) => {
    try {
      const updatedIncome = income.filter(item => item.id !== id);
      storage.setIncome(updatedIncome);
      setIncome(updatedIncome);
      toast.success('Income deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting income:', error);
      toast.error('Failed to delete income');
      return false;
    }
  };

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

  const getTotalIncome = () => {
    return income.reduce((total, item) => total + item.amount, 0);
  };

  return { 
    income, 
    loading, 
    addIncome, 
    updateIncome, 
    deleteIncome,
    getIncomeByCategory,
    getTotalIncome
  };
}
