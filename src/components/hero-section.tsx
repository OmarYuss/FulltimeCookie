"use client";

import { useI18n } from '@/context/i18n-context';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export function HeroSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { t } = useI18n();
  return (
    <section 
      id="hero-section" 
      className={cn("relative w-full min-h-[60vh] md:min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden", className)} 
      {...props}
    >
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 h-[calc(100vh-5rem)]">
                <div className="relative col-span-2 row-span-2 bg-gray-200">
                     <Image src="https://placehold.co/800x800.png" alt="Featured bake 1" fill className="object-cover" data-ai-hint="artisan bread" />
                </div>
                <div className="relative bg-gray-300">
                     <Image src="https://placehold.co/400x400.png" alt="Featured bake 2" fill className="object-cover" data-ai-hint="decorated cake" />
                </div>
                 <div className="relative bg-gray-400">
                     <Image src="https://placehold.co/400x400.png" alt="Featured bake 3" fill className="object-cover" data-ai-hint="chocolate cookies" />
                </div>
                <div className="relative col-span-1 row-span-1 hidden md:block bg-gray-500">
                     <Image src="https://placehold.co/400x400.png" alt="Featured bake 4" fill className="object-cover" data-ai-hint="cupcakes frosting" />
                </div>
                 <div className="relative col-span-1 row-span-1 hidden md:block bg-gray-600">
                     <Image src="https://placehold.co/400x400.png" alt="Featured bake 5" fill className="object-cover" data-ai-hint="fresh croissants" />
                </div>
            </div>
             <div className="absolute inset-0 bg-black/40"></div>
        </div>
      </div>

      <div className="relative z-10 container h-full flex flex-col items-center justify-center text-center text-white py-20">
        <h1 className="text-5xl md:text-7xl font-headline font-black text-white drop-shadow-lg">
          {t('home.heroTitle')}
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90 drop-shadow-md">
          {t('home.heroSubtitle')}
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="font-bold">
            <Link href="/products">{t('home.shopAll')}</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/recipes">{t('home.findRecipe')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
