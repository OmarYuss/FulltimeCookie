"use client"

import * as React from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Logo } from "./logo"
import { Separator } from "./ui/separator"

type NavItem = {
  href: string
  label: string
}

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const t = useTranslations('nav')

  const navItems: NavItem[] = [
    { href: "/shop", label: t('shop') },
    { href: "/recipes", label: t('recipes') },
    { href: "/special-order", label: t('specialOrder') },
    { href: "/account", label: t('account') },
    { href: "/orders", label: t('orders') },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="flex justify-between items-center mb-4 pr-6">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setOpen(false)}
          >
            <Logo />
            <span className="sr-only">Home</span>
          </Link>
          <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </div>
        <Separator className="mb-4" />
        <div className="flex flex-col space-y-3 pr-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
