"use client"

import React, { useState } from 'react';
import type { Recipe } from '@/lib/types';
import { Button } from './ui/button';
import { Lock } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { useToast } from '@/hooks/use-toast';

interface RecipePaywallProps {
  recipe: Recipe;
}

export function RecipePaywall({ recipe }: RecipePaywallProps) {
  const [isUnlocked, setIsUnlocked] = useState(!recipe.isPaid);
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const handleUnlock = () => {
    // In a real app, this would involve a checkout process.
    // Here, we'll simulate unlocking it and adding a "product" to the cart.
    const recipeProduct = {
        id: recipe.id,
        name: `${recipe.name}`,
        description: `Access to the recipe for ${recipe.name}`,
        price: recipe.price,
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'recipe book',
        category: 'Goods',
        tags: ['Recipe'],
        hasRecipe: false,
        details: {},
        images: ['https://placehold.co/600x400.png'],
    }
    addItem(recipeProduct);
    setIsUnlocked(true);
    toast({
      title: "Recipe Added to Cart!",
      description: `Proceed to checkout to unlock "${recipe.name}". For now, we've unlocked it for you to preview.`,
    });
  };

  const stepsToShow = isUnlocked ? recipe.instructions.length : 2;

  return (
    <div>
      <h3 className="text-2xl font-headline mt-8 mb-4">Instructions</h3>
      <div className="relative">
        <ol className="list-decimal list-inside space-y-4 text-lg">
          {recipe.instructions.slice(0, stepsToShow).map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        {!isUnlocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-background via-background/80 to-background/50 pt-32">
            <div className="text-center p-8 bg-card/80 backdrop-blur-sm rounded-lg shadow-xl border">
              <Lock className="mx-auto h-12 w-12 text-primary mb-4" />
              <h4 className="text-2xl font-headline font-bold">Unlock the Full Recipe</h4>
              <p className="text-muted-foreground mt-2 mb-6">
                Get instant access to all steps, tips, and tricks from our expert bakers.
              </p>
              <Button size="lg" onClick={handleUnlock}>
                Unlock for ₪{recipe.price.toFixed(2)}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
