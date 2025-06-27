import { recipes } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Star, ChefHat } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RecipePaywall } from '@/components/recipe-paywall';
import { Separator } from '@/components/ui/separator';

export default function RecipePage({ params }: { params: { id: string } }) {
  const recipe = recipes.find((r) => r.id === params.id);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        {recipe.isPaid && (
          <Badge className="mb-2">Premium Recipe</Badge>
        )}
        <h1 className="text-5xl md:text-6xl font-headline font-bold">{recipe.name}</h1>
        <p className="mt-4 text-xl text-muted-foreground">{recipe.description}</p>
        
        <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.round(recipe.rating) ? 'text-primary fill-primary' : 'text-muted'}`} />
                ))}
            </div>
            <span>{recipe.rating.toFixed(1)} stars ({recipe.reviews} reviews)</span>
        </div>
        
        <Separator className="my-8" />

        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                            <ChefHat className="h-6 w-6" /> Ingredients
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {recipe.ingredients.map((ingredient) => (
                                <li key={ingredient.name} className="flex justify-between items-baseline">
                                    <span>{ingredient.name}</span>
                                    <span className="text-right font-medium text-muted-foreground">{ingredient.quantity}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-2">
                <RecipePaywall recipe={recipe} />
            </div>
        </div>

        {/* Static Comment Section UI */}
        <div className="mt-16">
            <h3 className="text-3xl font-headline mb-6">Comments & Reviews</h3>
            <div className="space-y-6">
                <Card>
                    <CardHeader className="flex flex-row justify-between">
                        <div>
                            <CardTitle className="text-lg">Jane Doe</CardTitle>
                            <div className="flex items-center gap-1 mt-1">
                                <Star className="h-4 w-4 text-primary fill-primary" />
                                <Star className="h-4 w-4 text-primary fill-primary" />
                                <Star className="h-4 w-4 text-primary fill-primary" />
                                <Star className="h-4 w-4 text-primary fill-primary" />
                                <Star className="h-4 w-4 text-primary fill-primary" />
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">2 weeks ago</p>
                    </CardHeader>
                    <CardContent>
                        <p>This recipe is amazing! My family loved the cookies. The instructions were so clear and easy to follow. A new favorite!</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row justify-between">
                        <div>
                            <CardTitle className="text-lg">John Smith</CardTitle>
                            <div className="flex items-center gap-1 mt-1">
                                <Star className="h-4 w-4 text-primary fill-primary" />
                                <Star className="h-4 w-4 text-primary fill-primary" />
                                <Star className="h-4 w-4 text-primary fill-primary" />
                                <Star className="h-4 w-4 text-primary fill-primary" />
                                <Star className="h-4 w-4 text-muted" />
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">1 month ago</p>
                    </CardHeader>
                    <CardContent>
                        <p>Pretty good recipe. Mine came out a little dry, but that might have been my oven. Will try again!</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
