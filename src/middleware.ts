import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './config/i18n';

export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix: 'always'
});

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 