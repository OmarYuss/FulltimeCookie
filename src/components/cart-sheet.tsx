"use client"

import Image from "next/image"
import { useCartStore } from "@/stores/cart-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Trash2 } from "lucide-react"
import { useTranslations } from 'next-intl'

export function CartSheet() {
  const t = useTranslations('cart')
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative" aria-label={t('openCart')}>
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>{t('cartTitle', { count: itemCount })}</SheetTitle>
        </SheetHeader>
        <Separator />
        {itemCount > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-6 p-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                       <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        className="object-cover"
                        data-ai-hint={item.dataAiHint}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ₪{item.price.toFixed(2)}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                         <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          className="h-8 w-16"
                          onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        />
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} aria-label={t('removeItem', { name: item.name })}>
                           <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="p-6">
              <div className="flex w-full flex-col gap-4">
                 <div className="flex justify-between text-lg font-semibold">
                  <span>{t('subtotal')}</span>
                  <span>₪{subtotal.toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground">{t('shippingNote')}</p>
                <SheetClose asChild>
                  <Button className="w-full">{t('checkout')}</Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full border-4 border-dashed p-8">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-headline">{t('emptyTitle')}</h2>
            <p className="text-muted-foreground">{t('emptyDescription')}</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
