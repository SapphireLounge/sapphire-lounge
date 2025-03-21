export interface License {
  id: string;
  name: string;
  startDate: string;
  renewalFrequency: 'monthly' | 'yearly' | 'custom';
  renewalCost: number;
  nextDueDate: string;
  notes?: string;
}

export interface Expense {
  id: string;
  name: string;
  category: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'yearly' | 'custom';
  nextDueDate: string;
  notes?: string;
}

export interface Income {
  id: string;
  name: string;
  category: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'yearly' | 'one-time';
  nextReceiptDate: string;
  notes?: string;
}

export interface Reminder {
  id: string;
  type: 'license' | 'expense' | 'income';
  referenceId: string;
  dueDate: string;
  reminderDate: string;
  dismissed: boolean;
}

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'es' | 'fr' | 'de';
export type Tab = 'dashboard' | 'licenses' | 'expenses' | 'settings';