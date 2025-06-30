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

// Defined as a const array to be usable in Zod schemas
export const ORDER_STATUSES = [
  'Pending',
  'Accepted',
  'inCreation',
  'inWait',
  'inDelivery',
  'isDone',
  'inOffer',
  'aOffer',
  'rOffer',
  'Cancelled',
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const DISPLAY_ORDER_STATUSES: {
 statusCode: OrderStatus;
 displayValue: string;
}[] = [
  { statusCode: 'Pending', displayValue: 'Pending' },
  { statusCode: 'Accepted', displayValue: 'Accepted' },
  { statusCode: 'inCreation', displayValue: 'Being Prepared' },
  { statusCode: 'inWait', displayValue: 'Waiting Delivery' },
  { statusCode: 'inDelivery', displayValue: 'Being Delivered' },
  { statusCode: 'isDone', displayValue: 'Done' },
  { statusCode: 'inOffer', displayValue: 'Baker\'s offer waiting' },
  { statusCode: 'aOffer', displayValue: 'Accepted' },
  { statusCode: 'rOffer', displayValue: 'Offer Rejected' },
  { statusCode: 'Cancelled', displayValue: 'Cancelled' },
];

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  itemsSummary: string;
  total: number;
};

export type SpecialOrderRequest = import('./schemas/special-order').SpecialOrderInput & {
  id: string;
  status: OrderStatus;
};
