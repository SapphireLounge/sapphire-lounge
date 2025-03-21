import { License, Expense, Income, Reminder } from '../types';

const STORAGE_KEYS = {
  LICENSES: 'trackstationpro_licenses',
  EXPENSES: 'trackstationpro_expenses',
  INCOME: 'trackstationpro_income',
  REMINDERS: 'trackstationpro_reminders',
};

export const storage = {
  getLicenses: (): License[] => {
    const data = localStorage.getItem(STORAGE_KEYS.LICENSES);
    return data ? JSON.parse(data) : [];
  },

  setLicenses: (licenses: License[]) => {
    localStorage.setItem(STORAGE_KEYS.LICENSES, JSON.stringify(licenses));
  },

  getExpenses: (): Expense[] => {
    const data = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    return data ? JSON.parse(data) : [];
  },

  setExpenses: (expenses: Expense[]) => {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  },

  getIncome: (): Income[] => {
    const data = localStorage.getItem(STORAGE_KEYS.INCOME);
    return data ? JSON.parse(data) : [];
  },

  setIncome: (income: Income[]) => {
    localStorage.setItem(STORAGE_KEYS.INCOME, JSON.stringify(income));
  },

  getReminders: (): Reminder[] => {
    const data = localStorage.getItem(STORAGE_KEYS.REMINDERS);
    return data ? JSON.parse(data) : [];
  },

  setReminders: (reminders: Reminder[]) => {
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
  },

  exportData: () => {
    return {
      licenses: storage.getLicenses(),
      expenses: storage.getExpenses(),
      income: storage.getIncome(),
      reminders: storage.getReminders(),
    };
  },

  importData: (data: { licenses: License[]; expenses: Expense[]; income: Income[]; reminders: Reminder[] }) => {
    storage.setLicenses(data.licenses);
    storage.setExpenses(data.expenses);
    if (data.income) storage.setIncome(data.income);
    storage.setReminders(data.reminders);
  },
};