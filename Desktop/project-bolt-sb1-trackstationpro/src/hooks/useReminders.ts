import { useState, useEffect } from 'react';
import { Reminder, License, Expense } from '../types';
import { storage } from '../utils/storage';
import { isUpcoming, getDaysUntil } from '../utils/date';
import toast from 'react-hot-toast';

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReminders = () => {
      try {
        const data = storage.getReminders();
        setReminders(data);
      } catch (error) {
        console.error('Error fetching reminders:', error);
        toast.error('Failed to load reminders');
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, []);

  const generateReminders = (daysThreshold = 30) => {
    try {
      const licenses = storage.getLicenses();
      const expenses = storage.getExpenses();
      const newReminders: Reminder[] = [];

      // Generate reminders for licenses
      licenses.forEach(license => {
        if (isUpcoming(license.nextDueDate, daysThreshold)) {
          const existingReminder = reminders.find(
            r => r.type === 'license' && r.referenceId === license.id
          );

          if (!existingReminder) {
            newReminders.push({
              id: crypto.randomUUID(),
              type: 'license',
              referenceId: license.id,
              dueDate: license.nextDueDate,
              reminderDate: new Date().toISOString(),
              dismissed: false
            });
          }
        }
      });

      // Generate reminders for expenses
      expenses.forEach(expense => {
        if (isUpcoming(expense.nextDueDate, daysThreshold)) {
          const existingReminder = reminders.find(
            r => r.type === 'expense' && r.referenceId === expense.id
          );

          if (!existingReminder) {
            newReminders.push({
              id: crypto.randomUUID(),
              type: 'expense',
              referenceId: expense.id,
              dueDate: expense.nextDueDate,
              reminderDate: new Date().toISOString(),
              dismissed: false
            });
          }
        }
      });

      if (newReminders.length > 0) {
        const updatedReminders = [...reminders, ...newReminders];
        storage.setReminders(updatedReminders);
        setReminders(updatedReminders);
        return newReminders.length;
      }

      return 0;
    } catch (error) {
      console.error('Error generating reminders:', error);
      toast.error('Failed to generate reminders');
      return 0;
    }
  };

  const dismissReminder = (id: string) => {
    try {
      const updatedReminders = reminders.map(reminder =>
        reminder.id === id ? { ...reminder, dismissed: true } : reminder
      );
      storage.setReminders(updatedReminders);
      setReminders(updatedReminders);
      toast.success('Reminder dismissed');
      return true;
    } catch (error) {
      console.error('Error dismissing reminder:', error);
      toast.error('Failed to dismiss reminder');
      return false;
    }
  };

  const deleteReminder = (id: string) => {
    try {
      const updatedReminders = reminders.filter(reminder => reminder.id !== id);
      storage.setReminders(updatedReminders);
      setReminders(updatedReminders);
      return true;
    } catch (error) {
      console.error('Error deleting reminder:', error);
      toast.error('Failed to delete reminder');
      return false;
    }
  };

  const getActiveReminders = () => {
    return reminders.filter(reminder => !reminder.dismissed);
  };

  const getReminderDetails = (reminder: Reminder, licenses: License[], expenses: Expense[]) => {
    if (reminder.type === 'license') {
      const license = licenses.find(l => l.id === reminder.referenceId);
      if (!license) return null;
      
      return {
        name: license.name,
        amount: license.renewalCost,
        dueDate: license.nextDueDate,
        daysUntil: getDaysUntil(license.nextDueDate),
        type: 'License Renewal'
      };
    } else {
      const expense = expenses.find(e => e.id === reminder.referenceId);
      if (!expense) return null;
      
      return {
        name: expense.name,
        amount: expense.amount,
        dueDate: expense.nextDueDate,
        daysUntil: getDaysUntil(expense.nextDueDate),
        type: 'Expense Payment'
      };
    }
  };

  return {
    reminders,
    loading,
    generateReminders,
    dismissReminder,
    deleteReminder,
    getActiveReminders,
    getReminderDetails
  };
}
