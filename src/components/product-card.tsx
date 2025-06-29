"use client"

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/stores/cart-store';

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="h-full"
    >
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
            <p className="text-xl font-bold text-primary">₪{product.price.toFixed(2)}</p>
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </CardFooter>
        </Link>
      </Card>
    </motion.div>
  )
}
