/**
 * Formats a number as currency with the appropriate symbol
 * @param amount The amount to format
 * @param currencyCode The currency code (USD or GBP)
 * @returns A formatted currency string
 */
export function formatCurrency(amount: number, currencyCode: string = 'USD'): string {
  try {
    // Use en-GB locale for GBP and en-US for USD
    const locale = currencyCode === 'GBP' ? 'en-GB' : 'en-US';
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    // Fallback formatting
    const symbol = currencyCode === 'GBP' ? '£' : '$';
    return `${symbol}${amount.toFixed(2)}`;
  }
}
