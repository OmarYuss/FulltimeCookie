"use client";

import Link from 'next/link'
import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { CartSheet } from '@/components/cart-sheet'
import { MobileNav } from '@/components/mobile-nav'
import { useI18n } from '@/context/i18n-context'
import { LanguageSwitcher } from './language-switcher';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ChevronDown, User } from 'lucide-react';

export default function Header() {
  const { t } = useI18n();
  const navItems = [
    { name: t('header.home'), href: '/' },
    { name: t('header.recipes'), href: '/recipes' },
  ];
  
  const productCategories = [
    { name: t('header.categories.cookies'), href: '/products?tag=Cookies'},
    { name: t('header.categories.cupcakes'), href: '/products?tag=Cupcakes'},
    { name: t('header.categories.cakes'), href: '/products?tag=Cakes'},
    { name: t('header.categories.goods'), href: '/products?tag=Goods'},
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
             <Link href="/" className="transition-colors hover:text-primary">
                {t('header.home')}
              </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-primary focus:outline-none">
                {t('header.products')}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/products">{t('header.allProducts')}</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {productCategories.map(cat => (
                  <DropdownMenuItem key={cat.name} asChild>
                    <Link href={cat.href}>{cat.name}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/special-order">{t('header.specialOrder')}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/recipes" className="transition-colors hover:text-primary">
              {t('header.recipes')}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
          <CartSheet />
           <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                   <Link href="/login">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="md:hidden">
            <MobileNav navItems={navItems} />
          </div>
        </div>
      </div>
    </header>
  )
}
