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

export type OrderStatus =
  | 'Pending' // For all orders waiting for admin action (approval, pricing, etc.)
  | 'Accepted' // Confirmed by all parties, in the queue to be made
  | 'inCreation' // The order is being prepared
  | 'inWait' // Order is ready for pickup or delivery
  | 'inDelivery' // Order is out for delivery
  | 'isDone' // Order has been received by the customer
  | 'AwaitingUserApproval' // Specific to special orders where a quote has been sent
  | 'Rejected' // Specific to special orders where the quote was rejected
  | 'Cancelled'; // For any order that is cancelled
