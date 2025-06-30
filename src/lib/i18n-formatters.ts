export function formatPrice(amount: number, locale: string) {
  // Use ILS for Hebrew and Arabic locales, USD for others.
  // 'ILS' is the standard ISO currency code for the Israeli New Shekel.
  const currency = ['ar', 'he'].includes(locale) ? 'ILS' : 'USD';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
} 