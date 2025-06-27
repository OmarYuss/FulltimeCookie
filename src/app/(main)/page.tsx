"use client"

import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { HeroSection } from '@/components/hero-section';
import { useI18n } from '@/context/i18n-context';

function ProductCard({ product }: { product: import('@/lib/types').Product }) {
  const { dispatch } = useCart();
  return (
     <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative h-56 w-full">
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
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <p className="text-xl font-bold text-primary">₪{product.price.toFixed(2)}</p>
        <Button onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}>Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}


export default function Home() {
  const featuredProducts = products.slice(0, 3);
  const { t } = useI18n();

  return (
    <>
      <HeroSection />

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline font-bold">{t('home.featuredTitle')}</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              {t('home.featuredSubtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
             <Button asChild variant="outline" size="lg">
              <Link href="/products">{t('home.viewAllProducts')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
