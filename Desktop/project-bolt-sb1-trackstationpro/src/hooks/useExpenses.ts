import { useState, useEffect } from 'react';
import { Expense } from '../types';
import { storage } from '../utils/storage';
import toast from 'react-hot-toast';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = () => {
      try {
        const data = storage.getExpenses();
        setExpenses(data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
        toast.error('Failed to load expenses');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    try {
      const newExpense = { 
        ...expense, 
        id: crypto.randomUUID() 
      };
      const updatedExpenses = [...expenses, newExpense];
      storage.setExpenses(updatedExpenses);
      setExpenses(updatedExpenses);
      toast.success('Expense added successfully');
      return newExpense;
    } catch (error) {
      console.error('Error adding expense:', error);
      toast.error('Failed to add expense');
      return null;
    }
  };

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    try {
      const updatedExpenses = expenses.map(expense =>
        expense.id === id ? { ...expense, ...updates } : expense
      );
      storage.setExpenses(updatedExpenses);
      setExpenses(updatedExpenses);
      toast.success('Expense updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating expense:', error);
      toast.error('Failed to update expense');
      return false;
    }
  };

  const deleteExpense = (id: string) => {
    try {
      const updatedExpenses = expenses.filter(expense => expense.id !== id);
      storage.setExpenses(updatedExpenses);
      setExpenses(updatedExpenses);
      toast.success('Expense deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast.error('Failed to delete expense');
      return false;
    }
  };

  const getExpensesByCategory = () => {
    const categories: Record<string, number> = {};
    
    expenses.forEach(expense => {
      if (categories[expense.category]) {
        categories[expense.category] += expense.amount;
      } else {
        categories[expense.category] = expense.amount;
      }
    });
    
    return Object.entries(categories).map(([name, value]) => ({
      name,
      value
    }));
  };

  return { 
    expenses, 
    loading, 
    addExpense, 
    updateExpense, 
    deleteExpense,
    getExpensesByCategory
  };
}
