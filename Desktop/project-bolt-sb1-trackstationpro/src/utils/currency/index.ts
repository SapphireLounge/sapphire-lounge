import CURRENCIES from '../../i18n/currencies';
import { useAppContext } from '../../hooks/useAppContext';
import { Currency } from '../../hooks/AppTypes';

// Helper function to get the currency symbol
export const getCurrencySymbol = (currencyCode: Currency): string => {
  return CURRENCIES[currencyCode]?.symbol || '£';
};

export const formatCurrency = (amount: number, currencyCode?: Currency): string => {
  // Use the provided currency code or get the current currency from context
  // Note: This should be used with the useAppContext hook to get the current currency
  const currencySymbol = currencyCode ? getCurrencySymbol(currencyCode) : '£';
  return `${currencySymbol}${amount.toFixed(2)}`;
};

// Component-based formatter that uses the current currency from context
export const CurrencyFormatter = ({ amount }: { amount: number }): string => {
  const { currency } = useAppContext();
  return formatCurrency(amount, currency);
};

export const calculateMonthlyTotal = (amount: number, frequency: 'monthly' | 'quarterly' | 'yearly'): number => {
  switch (frequency) {
    case 'monthly':
      return amount;
    case 'quarterly':
      return amount / 3;
    case 'yearly':
      return amount / 12;
    default:
      return amount;
  }
};

export const calculateYearlyTotal = (amount: number, frequency: 'monthly' | 'quarterly' | 'yearly'): number => {
  switch (frequency) {
    case 'monthly':
      return amount * 12;
    case 'quarterly':
      return amount * 4;
    case 'yearly':
      return amount;
    default:
      return amount;
  }
};
