import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const USD_TO_NIS_RATE = 3.6;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertNISToUSD(nisPrice: number): number {
  return Number((nisPrice / USD_TO_NIS_RATE).toFixed(2));
}

export function convertUSDToNIS(usdPrice: number): number {
  return Number((usdPrice * USD_TO_NIS_RATE).toFixed(2));
}

export function formatCurrency(amount: number, currency: string, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
