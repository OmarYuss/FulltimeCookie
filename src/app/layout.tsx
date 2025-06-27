import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/context/cart-context"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProvider } from '@/context/i18n-context';

export const metadata: Metadata = {
  title: 'Fulltime Cookie',
  description: 'The best baked goods and recipes.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <CartProvider>
              {children}
              <Toaster />
            </CartProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
