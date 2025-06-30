"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/i18n-formatters';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/stores/cart-store';

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale();
  const t = useTranslations('product');
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl h-full">
      <Link href={`/shop/${product.id}`} className="flex flex-col h-full">
        <CardHeader className="p-0 relative">
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-56 w-full">
                    <Image
                      src={img}
                      alt={`${product.name} image ${index + 1}`}
                      fill
                      className="object-cover"
                      data-ai-hint={product.dataAiHint}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {product.images.length > 1 && (
              <>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
              </>
            )}
          </Carousel>
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <CardTitle className="font-headline text-2xl">{product.name}</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {product.tags.slice(0, 3).map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
          </div>
          <CardDescription className="mt-2 line-clamp-3">{product.description}</CardDescription>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex justify-between items-center mt-auto">
          <p className="text-xl font-bold text-primary">
            {formatPrice(product.price, locale)}
          </p>
          <Button onClick={handleAddToCart}>{t('addToCart')}</Button>
        </CardFooter>
      </Link>
    </Card>
  )
}
