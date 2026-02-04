"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  img: string;
  slug: string;
}

interface WishlistState {
  items: WishlistItem[];

  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;
  isInWishlist: (id: number) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (item) => {
        const exists = get().items.some((i) => i.id === item.id);
        if (exists) return;
        set({ items: [...get().items, item] });
      },

      removeFromWishlist: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      isInWishlist: (id) => get().items.some((i) => i.id === id),
    }),

    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage), // ✅ FIXED
    }
  )
);
