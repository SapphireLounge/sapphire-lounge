/**
 * Calculates the next due date based on the current date and frequency
 * @param currentDate The current date to calculate from
 * @param frequency The frequency type (monthly, quarterly, yearly, custom)
 * @returns A new Date object with the calculated next due date
 */
export function getNextDueDate(
  currentDate: string | Date,
  frequency: 'monthly' | 'yearly' | 'quarterly' | 'custom'
): Date {
  const date = new Date(currentDate);
  
  switch (frequency) {
    case 'monthly':
      return new Date(date.setMonth(date.getMonth() + 1));
    case 'quarterly':
      return new Date(date.setMonth(date.getMonth() + 3));
    case 'yearly':
      return new Date(date.setFullYear(date.getFullYear() + 1));
    case 'custom':
      // For custom frequency, we don't calculate automatically
      return new Date(date);
    default:
      return new Date(date);
  }
}

/**
 * Formats a date to a string in the format YYYY-MM-DD
 * @param date The date to format
 * @returns A string in the format YYYY-MM-DD
 */
export function formatDateToString(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Formats a date string to a more readable format (e.g., "Mar 21, 2025")
 * @param dateString The date string to format
 * @returns A formatted date string
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Calculates the number of days until a given date
 * @param dateString The target date string
 * @returns The number of days until the target date
 */
export function getDaysUntil(dateString: string): number {
  if (!dateString) return 0;
  
  const targetDate = new Date(dateString);
  const today = new Date();
  
  // Reset time part for accurate day calculation
  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

/**
 * Checks if a date is overdue (before today)
 * @param dateString The date string to check
 * @returns True if the date is overdue, false otherwise
 */
export function isOverdue(dateString: string): boolean {
  if (!dateString) return false;
  
  const targetDate = new Date(dateString);
  const today = new Date();
  
  // Reset time part for accurate comparison
  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  return targetDate < today;
}

/**
 * Checks if a date is upcoming (within the next 30 days)
 * @param dateString The date string to check
 * @param daysThreshold The number of days to consider as upcoming (default: 30)
 * @returns True if the date is upcoming, false otherwise
 */
export function isUpcoming(dateString: string, daysThreshold: number = 30): boolean {
  if (!dateString) return false;
  
  const days = getDaysUntil(dateString);
  return days >= 0 && days <= daysThreshold;
}
