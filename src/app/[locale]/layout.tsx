import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from 'next-intl/server';
import '@/styles/globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import DirectionProvider from "@/components/providers/direction-provider";
import { Metadata } from "next";
import { locales } from "@/config/i18n";

export const metadata: Metadata = {
  title: 'Fulltime Cookie',
  description: 'Your favorite bakery',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale }
}: RootLayoutProps) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  return (
    <html lang={locale} dir={locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Open+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <DirectionProvider>
            <ThemeProvider
              defaultTheme="system"
              storageKey="ui-theme"
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </DirectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
