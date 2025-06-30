import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import '@/styles/globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import DirectionProvider from "@/components/providers/direction-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Fulltime Cookie',
  description: 'The best baked goods and recipes.',
  icons: {
    icon: '/favicon.ico',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  let messages;
  try {
    messages = require(`../../../public/locales/${locale}/common.json`);
  } catch (error) {
    notFound();
  }

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
