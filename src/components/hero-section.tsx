"use client";

import { useState, useEffect, type SVGProps } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useI18n } from '@/context/i18n-context';

const Cupcake = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g>
            <path d="M10,50 Q12,35 20,35 T35,40 T50,35 T65,40 T80,35 T90,50 Z" fill="hsl(var(--primary))" />
            <path d="M10,52 H90 V85 A10,10 0 0 1 80,95 H20 A10,10 0 0 1 10,85 V52 Z" fill="hsl(var(--card-foreground))" opacity="0.8"/>
            <path d="M12,52 L12,93 M25,52 L25,95 M38,52 L38,95 M51,52 L51,95 M64,52 L64,95 M77,52 L77,95 M90,52 L90,93" stroke="hsl(var(--card-foreground))" strokeWidth="1" opacity="0.5"/>
            <circle cx="50" cy="25" r="7" fill="hsl(var(--destructive))"/>
            <path d="M50,18 A5,5 0 0 1 55,23" stroke="hsl(var(--destructive-foreground))" strokeWidth="1.5" fill="none" />
        </g>
    </svg>
);


const ChocolateChip = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M50 0 C 20 20, 20 80, 50 100 C 80 80, 80 20, 50 0 Z" fill="hsl(var(--foreground))" />
    </svg>
);


const CHIPS_COUNT = 25;

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [chips, setChips] = useState<any[]>([]);
  const [heroHeight, setHeroHeight] = useState(0);
  const { t } = useI18n();

  useEffect(() => {
    // Generate chips on client-side to avoid hydration mismatch
    const generatedChips = Array.from({ length: CHIPS_COUNT }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      wobbleDuration: `${Math.random() * 2 + 3}s`,
      wobbleDelay: `${Math.random() * 2}s`,
      initialY: Math.random() * -100 - 50,
      speed: Math.random() * 0.2 + 0.3
    }));
    setChips(generatedChips);

    const heroElement = document.getElementById('hero-section');
    if (heroElement) {
        setHeroHeight(heroElement.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero-section" className="relative w-full h-[80vh] bg-background overflow-hidden">
      <div className="absolute inset-0 z-10 container h-full flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl md:text-7xl font-headline font-black text-foreground drop-shadow-lg">
          {t('home.heroTitle')}
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground">
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

      <div className="absolute inset-0 z-0" aria-hidden="true">
        {chips.map(chip => {
            const fallDistance = heroHeight * 0.5;
            const translateY = Math.min(scrollY * chip.speed, fallDistance);
            return (
                 <div
                    key={chip.id}
                    className="absolute"
                    style={{
                        left: chip.left,
                        top: `${chip.initialY}px`,
                        transform: `translateY(${translateY}px)`,
                        transition: 'transform 0.5s ease-out',
                        animation: `wobble ${chip.wobbleDuration} ${chip.wobbleDelay} infinite ease-in-out`,
                    }}
                >
                    <ChocolateChip className="w-5 h-5 md:w-6 md:h-6 opacity-60" />
                </div>
            )
        })}

        <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-48 h-48 md:w-56 md:h-56">
             <Cupcake className="w-full h-full drop-shadow-2xl" />
        </div>
      </div>
    </section>
  );
}
