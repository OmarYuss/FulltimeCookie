"use client";

import Link from 'next/link'
import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { CartSheet } from '@/components/cart-sheet'
import { MobileNav } from '@/components/mobile-nav'
import { useI18n } from '@/context/i18n-context'
import { LanguageSwitcher } from './language-switcher';
import { Button } from './ui/button';

export default function Header() {
  const { t } = useI18n();
  const navItems = [
    { name: t('header.home'), href: '/' },
    { name: t('header.products'), href: '/products' },
    { name: t('header.recipes'), href: '/recipes' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
          <CartSheet />
           <div className="hidden md:block">
            <Button asChild variant="outline">
              <Link href="/login">{t('header.login')}</Link>
            </Button>
          </div>
          <div className="md:hidden">
            <MobileNav navItems={navItems} />
          </div>
        </div>
      </div>
    </header>
  )
}
