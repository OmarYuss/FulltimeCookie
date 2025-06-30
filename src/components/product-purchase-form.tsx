"use client"

import { useState } from "react"
import Link from "next/link"
import type { Product, ProductVariation, ProductPackageType } from "@/lib/types"
import { useCartStore } from "@/stores/cart-store"
import { useToast } from "@/hooks/use-toast"
import { useLocale, useTranslations } from "next-intl"
import { formatPrice } from "@/lib/i18n-formatters"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface ProductPurchaseFormProps {
  product: Product
}

export function ProductPurchaseForm({ product }: ProductPurchaseFormProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(product.variations?.[0] ?? null)
  const [selectedPackageType, setSelectedPackageType] = useState<ProductPackageType | null>(product.packageTypes?.[0] ?? null)
  const { toast } = useToast()
  const addItemToCart = useCartStore((state) => state.addItem)
  const locale = useLocale()
  const t = useTranslations('product');

  const finalPrice = (product.price + (selectedVariation?.priceModifier || 0) + (selectedPackageType?.price || 0)) * quantity;

  const handleAddToCart = () => {
    let itemToAdd = { ...product, quantity };

    if (selectedVariation) {
        itemToAdd.name = `${product.name} - ${selectedVariation.name}`;
    }

    if (selectedPackageType) {
        itemToAdd.name = `${itemToAdd.name} (${selectedPackageType.name})`;
    }

    addItemToCart(itemToAdd);
    toast({
      title: `${itemToAdd.name} added to cart`,
      description: `Price: ${formatPrice(finalPrice, locale)}`,
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-4xl md:text-5xl font-headline font-bold">{product.name}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{product.description}</p>
      </div>
      
      <div className="text-4xl font-bold text-primary">₪{finalPrice.toFixed(2)}</div>

      <Separator />

      {product.variations && (
        <div className="grid gap-2">
          <Label className="text-lg font-semibold">{t('variations')}</Label>
          <RadioGroup
            value={selectedVariation?.id}
            onValueChange={(id) => setSelectedVariation(product.variations?.find(v => v.id === id) || null)}
          >
            {product.variations.map((variation) => (
              <div key={variation.id} className="flex items-center space-x-2">
                <RadioGroupItem value={variation.id} id={variation.id} />
                <Label htmlFor={variation.id} className="flex-grow">{variation.name}</Label>
                <span className="text-sm text-muted-foreground">
                  +{formatPrice(variation.priceModifier, locale)}
                </span>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {product.packageTypes && (
        <div className="grid gap-2">
           <Label htmlFor="package-type" className="text-lg font-semibold">{t('packageType')}</Label>
            <Select 
                value={selectedPackageType?.id}
                onValueChange={(id) => setSelectedPackageType(product.packageTypes?.find(p => p.id === id) || null)}
            >
                <SelectTrigger id="package-type">
                    <SelectValue placeholder="Select a package type" />
                </SelectTrigger>
                <SelectContent>
                    {product.packageTypes.map((pack) => (
                        <SelectItem key={pack.id} value={pack.id}>
                            {pack.name} (+{formatPrice(pack.price, locale)})
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
      )}

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="quantity" className="text-lg font-semibold">{t('quantity')}</Label>
        <Input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-24"
        />
      </div>
      
      <Separator />

      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold text-right">
          {formatPrice(finalPrice, locale)}
        </p>
        <Button onClick={handleAddToCart} size="lg">
          {t('addToCart')}
        </Button>
      </div>
      
      <Separator />

      <div className="space-y-4 text-sm">
        <h4 className="font-headline text-lg">{t('details')}</h4>
        {product.details.pricePer && <p><strong>{t('pricePer')}:</strong> {product.details.pricePer}</p>}
        {product.details.prepTime && <p><strong>{t('prepTime')}:</strong> {product.details.prepTime}</p>}
        {product.details.contains && <p><strong>{t('contains')}:</strong> {product.details.contains}</p>}
      </div>

      {product.hasRecipe && product.recipeId && (
        <Button variant="outline" asChild>
          <Link href={`/recipes/${product.recipeId}`}>{t('viewRecipe')}</Link>
        </Button>
      )}
    </div>
  )
}
