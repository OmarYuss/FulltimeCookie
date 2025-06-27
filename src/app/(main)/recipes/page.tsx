import { recipes } from '@/lib/data';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function RecipeCard({ recipe }: { recipe: import('@/lib/types').Recipe }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <CardHeader>
        {recipe.isPaid && (
          <Badge variant="secondary" className="absolute top-4 right-4">Premium</Badge>
        )}
        <CardTitle className="font-headline text-2xl">{recipe.name}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.round(recipe.rating) ? 'text-primary fill-primary' : 'text-muted'}`} />
                ))}
            </div>
            <span>({recipe.reviews} reviews)</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{recipe.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
            <Link href={`/recipes/${recipe.id}`}>
                {recipe.isPaid ? `Unlock for $${recipe.price.toFixed(2)}` : 'View Recipe'}
                <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function RecipesPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-headline font-bold">Our Recipes</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          From our kitchen to yours. Find your next baking adventure with our collection of tried-and-true recipes.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
