export type ProductVariation = {
  id: string;
  name: string;
  priceModifier: number;
  inStock: boolean;
};

export type ProductPackageType = {
  id: string;
  name: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  dataAiHint: string;
  category: 'Cookies' | 'Cupcakes' | 'Cakes' | 'Goods';
  tags: string[];
  details: {
    contains?: string;
    prepTime?: string;
    pricePer?: string;
  };
  variations?: ProductVariation[];
  packageTypes?: ProductPackageType[];
  hasRecipe: boolean;
  recipeId?: string;
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
