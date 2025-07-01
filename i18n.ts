import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {locales, type Locale} from './src/config/i18n';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`./public/locales/${locale}/common.json`)).default
  };
});