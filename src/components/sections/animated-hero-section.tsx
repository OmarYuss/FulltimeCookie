"use client";

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

export function AnimatedHeroSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const t = useTranslations('home');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section 
      id="hero-section" 
      className={cn("relative w-full min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden", className)} 
      {...props}
    >
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 h-full">
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
             <div className="absolute inset-0 bg-black/50"></div>
        </div>
      </div>

      <motion.div 
        className="relative z-10 container h-full flex flex-col items-center justify-center text-center text-white py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-headline font-black text-white drop-shadow-lg"
          variants={itemVariants}
        >
          {t('heroTitle')}
        </motion.h1>
        <motion.p 
          className="mt-4 max-w-2xl text-lg md:text-xl text-white/90 drop-shadow-md"
          variants={itemVariants}
        >
          {t('heroSubtitle')}
        </motion.p>
        <motion.div 
          className="mt-8 flex flex-wrap gap-4 justify-center"
          variants={itemVariants}
        >
          <Button asChild size="lg" className="font-bold">
            <Link href="/shop">{t('shopAll')}</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/recipes">{t('findRecipe')}</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
