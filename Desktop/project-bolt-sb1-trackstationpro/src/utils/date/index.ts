import { format, addMonths, addYears, addQuarters, isBefore, differenceInDays } from 'date-fns';

export const formatDate = (date: string | Date): string => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatShortDate = (date: string | Date): string => {
  return format(new Date(date), 'MM/dd/yyyy');
};

export const getNextDueDate = (
  startDate: string | Date,
  frequency: 'monthly' | 'quarterly' | 'yearly'
): Date => {
  const date = new Date(startDate);
  
  switch (frequency) {
    case 'monthly':
      return addMonths(date, 1);
    case 'quarterly':
      return addQuarters(date, 1);
    case 'yearly':
      return addYears(date, 1);
    default:
      return date;
  }
};

export const isUpcoming = (date: string | Date, daysThreshold = 30): boolean => {
  const today = new Date();
  const targetDate = new Date(date);
  const diff = differenceInDays(targetDate, today);
  
  return diff >= 0 && diff <= daysThreshold;
};

export const isOverdue = (date: string | Date): boolean => {
  const today = new Date();
  const targetDate = new Date(date);
  
  return isBefore(targetDate, today);
};

export const getDaysUntil = (date: string | Date): number => {
  const today = new Date();
  const targetDate = new Date(date);
  
  return differenceInDays(targetDate, today);
};
