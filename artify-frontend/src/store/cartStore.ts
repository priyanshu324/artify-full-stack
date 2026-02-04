"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  img: string;
  slug: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];

  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;

  getSubtotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // Add to cart (if exists → increase qty)
      addToCart: (item) => {
        const cart = get().items;
        const existing = cart.find((i) => i.id === item.id);

        if (existing) {
          set({
            items: cart.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          });
        } else {
          set({ items: [...cart, item] });
        }
      },

      // Remove a single product
      removeFromCart: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      // Increase quantity
      increaseQty: (id) => {
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        });
      },

      // Decrease quantity (min = 1)
      decreaseQty: (id) => {
        set({
          items: get().items.map((i) =>
            i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
          ),
        });
      },

      // Remove all products
      clearCart: () => set({ items: [] }),

      // Subtotal (price × qty)
      getSubtotal: () =>
        get().items.reduce((acc, it) => acc + it.price * it.quantity, 0),

      // Count all items
      getItemCount: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),
    }),

    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage), // ✅ FIXED PERSISTENCE
    }
  )
);
