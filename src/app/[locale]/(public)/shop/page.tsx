"use client"

import { useState, useMemo } from 'react';
import { products } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useI18n } from '@/context/i18n-context';

export default function ShopPage() {
  const { t } = useI18n();
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    products.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, []);

  const handleTagChange = (tag: string, checked: boolean) => {
    setActiveTags(prev => 
      checked ? [...prev, tag] : prev.filter(t => t !== tag)
    );
  };

  const filteredProducts = useMemo(() => {
    if (activeTags.length === 0) {
      return products;
    }
    return products.filter(p => 
      activeTags.every(tag => p.tags.includes(tag))
    );
  }, [activeTags]);

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-headline font-bold">{t('products.title')}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          {t('products.subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <div className="sticky top-24">
            <h3 className="text-2xl font-headline mb-4">{t('products.filterTitle')}</h3>
            <div className="space-y-3">
              {allTags.map(tag => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox 
                    id={tag} 
                    onCheckedChange={(checked) => handleTagChange(tag, !!checked)}
                  />
                  <Label htmlFor={tag} className="font-normal text-base">{tag}</Label>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="md:col-span-3">
           {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
           ) : (
             <div className="flex flex-col items-center justify-center text-center h-full">
                <p className="text-2xl font-headline">{t('products.noResultsTitle')}</p>
                <p className="text-muted-foreground mt-2">{t('products.noResultsSubtitle')}</p>
             </div>
           )}
        </main>
      </div>
    </div>
  );
}
