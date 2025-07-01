export const locales = ['en', 'ar', 'he'] as const;
export const defaultLocale = 'en';

export type Locale = (typeof locales)[number];

export const localeDetails = {
  en: { dir: 'ltr' },
  ar: { dir: 'rtl' },
  he: { dir: 'rtl' },
} as const; 