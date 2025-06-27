"use client"

import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/cart-context';
import { Badge } from '@/components/ui/badge';

function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart();
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
       {product.hasRecipe && (
        <Badge variant="secondary" className="absolute top-4 right-4">Has Recipe</Badge>
      )}
      <CardHeader className="p-0">
        <div className="relative h-64 w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint={product.dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-2xl">{product.name}</CardTitle>
        <CardDescription className="mt-2">{product.description}</CardDescription>
         {product.hasRecipe && product.recipeId && (
            <Button variant="link" asChild className="p-0 h-auto mt-2">
                <Link href={`/recipes/${product.recipeId}`}>View Recipe</Link>
            </Button>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
        <Button onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}

export default function ProductsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-headline font-bold">Our Products</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Browse our delicious selection of freshly baked goods. Each item is crafted with care and the finest ingredients.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
