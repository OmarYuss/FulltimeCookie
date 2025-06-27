"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, LogIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Logo } from "./logo"
import { useI18n } from "@/context/i18n-context"
import { Separator } from "./ui/separator"

type NavItem = {
  name: string
  href: string
}

interface MobileNavProps {
  navItems: NavItem[]
}

export function MobileNav({ navItems }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useI18n()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open navigation menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="p-4 border-b">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Logo />
          </Link>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => (
            <SheetClose asChild key={item.href}>
                <Link
                href={item.href}
                className="block px-3 py-2 text-lg font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
                >
                {item.name}
                </Link>
            </SheetClose>
          ))}
          <Separator className="my-2" />
          <SheetClose asChild>
            <Link
              href="/login"
              className="flex items-center gap-2 px-3 py-2 text-lg font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              <LogIn className="w-5 h-5" />
              {t('header.login')}
            </Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
