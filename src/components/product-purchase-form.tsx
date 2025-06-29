"use client"

import type { Product } from "@/lib/types";
import { useState, useMemo } from "react";
import { useI18n } from "@/context/i18n-context";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useCartStore } from "@/stores/cart-store";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { Input } from "./ui/input";

export function ProductPurchaseForm({ product }: { product: Product }) {
  const { t } = useI18n();
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariationId, setSelectedVariationId] = useState<string | undefined>(product.variations?.[0]?.id);
  const [selectedPackageId, setSelectedPackageId] = useState<string | undefined>(product.packageTypes?.[0]?.id);

  const selectedVariation = useMemo(() => {
    return product.variations?.find(v => v.id === selectedVariationId);
  }, [product.variations, selectedVariationId]);

  const selectedPackage = useMemo(() => {
    return product.packageTypes?.find(p => p.id === selectedPackageId);
  }, [product.packageTypes, selectedPackageId]);

  const totalPrice = useMemo(() => {
    const basePrice = product.price;
    const variationPrice = selectedVariation?.priceModifier || 0;
    const packagePrice = selectedPackage?.price || 0;
    return (basePrice + variationPrice + packagePrice) * quantity;
  }, [product.price, selectedVariation, selectedPackage, quantity]);

  const handleAddToCart = () => {
    // A real implementation would pass variation/package details to the cart
    const itemToAdd = { ...product, price: totalPrice / quantity, quantity };
    addItem(itemToAdd);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-4xl md:text-5xl font-headline font-bold">{product.name}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{product.description}</p>
      </div>
      
      <div className="text-4xl font-bold text-primary">₪{totalPrice.toFixed(2)}</div>

      <Separator />

      {product.variations && product.variations.length > 0 && (
        <div className="grid gap-3">
          <Label className="text-lg font-headline">{t('productPage.variations')}</Label>
          <RadioGroup value={selectedVariationId} onValueChange={setSelectedVariationId}>
            {product.variations.map(variation => (
              <div key={variation.id} className="flex items-center justify-between">
                <Label htmlFor={variation.id} className="flex items-center gap-3 cursor-pointer">
                  <RadioGroupItem value={variation.id} id={variation.id} disabled={!variation.inStock} />
                  {variation.name} {variation.priceModifier > 0 && `(+₪${variation.priceModifier.toFixed(2)})`}
                </Label>
                {!variation.inStock && <Badge variant="destructive">{t('productPage.outOfStock')}</Badge>}
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {product.packageTypes && product.packageTypes.length > 0 && (
        <div className="grid gap-3">
          <Label className="text-lg font-headline">{t('productPage.packageType')}</Label>
          <RadioGroup value={selectedPackageId} onValueChange={setSelectedPackageId}>
            {product.packageTypes.map(pkg => (
              <div key={pkg.id} className="flex items-center">
                <RadioGroupItem value={pkg.id} id={pkg.id} />
                <Label htmlFor={pkg.id} className="ml-3 font-normal cursor-pointer">
                  {pkg.name} {pkg.price > 0 && `(+₪${pkg.price.toFixed(2)})`}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Input 
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-20"
          min="1"
        />
        <Button size="lg" onClick={handleAddToCart} className="w-full">{t('productPage.addToCart')}</Button>
      </div>
      
      <Separator />

      <div className="space-y-4 text-sm">
        <h4 className="font-headline text-lg">{t('productPage.details')}</h4>
        {product.details.pricePer && <p><strong>{t('productPage.pricePer')}:</strong> {product.details.pricePer}</p>}
        {product.details.prepTime && <p><strong>{t('productPage.prepTime')}:</strong> {product.details.prepTime}</p>}
        {product.details.contains && <p><strong>{t('productPage.contains')}:</strong> {product.details.contains}</p>}
      </div>

      {product.hasRecipe && product.recipeId && (
        <Button variant="outline" asChild>
          <Link href={`/recipes/${product.recipeId}`}>{t('productPage.viewRecipe')}</Link>
        </Button>
      )}
    </div>
  )
}
