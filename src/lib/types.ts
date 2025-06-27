export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Cookies' | 'Cupcakes' | 'Cakes' | 'Goods';
  hasRecipe: boolean;
  recipeId?: string;
  dataAiHint: string;
};

export type Ingredient = {
  name: string;
  quantity: string;
};

export type Recipe = {
  id: string;
  productId: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  isPaid: boolean;
  price: number;
  rating: number;
  reviews: number;
};

export type CartItem = Product & {
  quantity: number;
};
