import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  img: string;
  slug: string;
}

interface WishlistStore {
  items: WishlistItem[];

  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;

  isInWishlist: (id: number) => boolean;

  totalWishlist: number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (item) => {
        if (get().items.find((i) => i.id === item.id)) return; // avoid duplicates
        set({ items: [...get().items, item] });
      },

      removeFromWishlist: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      isInWishlist: (id) => {
        return get().items.some((i) => i.id === id);
      },

      get totalWishlist() {
        return get().items.length;
      },
    }),
    {
      name: "artify-wishlist",
    }
  )
);
