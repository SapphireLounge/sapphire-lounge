export interface License {
  id: string;
  name: string;
  startDate: string;
  renewalFrequency: 'monthly' | 'yearly';
  renewalCost: number;
  nextDueDate: string;
  notes?: string;
}

export interface Expense {
  id: string;
  name: string;
  category: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'yearly';
  nextDueDate: string;
  notes?: string;
}

export interface Reminder {
  id: string;
  title: string;
  message: string;
  date: string;
  dismissed: boolean;
  type: 'license' | 'expense' | 'system';
  relatedItemId?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'es' | 'fr' | 'de';
export type Tab = 'dashboard' | 'licenses' | 'expenses' | 'settings';
