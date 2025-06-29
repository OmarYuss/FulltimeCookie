import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/lib/types';

type CartState = {
  items: CartItem[];
  addItem: (product: Product & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  // persist( // Temporarily removed to fix build error
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex((item) => item.id === product.id);
          const quantityToAdd = product.quantity || 1;
          
          if (existingItemIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantityToAdd;
            return { items: updatedItems };
          } else {
            return {
              ...state,
              items: [...state.items, { ...product, quantity: quantityToAdd }],
            };
          }
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => item.id !== productId),
            };
          }
          return {
            items: state.items.map((item) =>
              item.id === productId ? { ...item, quantity: quantity } : item
            ),
          };
        }),
      clearCart: () => set({ items: [] }),
    })
  //   {
  //     name: 'cart-storage', // name of the item in the storage (must be unique)
  //   }
  // )
);