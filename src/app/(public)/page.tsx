"use client"

import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { AnimatedHeroSection } from '@/components/animated-hero-section';
import { useI18n } from '@/context/i18n-context';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';

export default function Home() {
  const featuredProducts = products.slice(0, 3);
  const { t } = useI18n();

  return (
    <>
      <AnimatedHeroSection />

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
              <Link href="/shop">{t('home.viewAllProducts')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
