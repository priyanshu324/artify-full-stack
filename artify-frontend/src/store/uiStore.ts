// src/store/uiStore.ts
import { create } from "zustand";

interface UIStore {
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;

  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isWishlistOpen: false,
  openWishlist: () => set({ isWishlistOpen: true }),
  closeWishlist: () => set({ isWishlistOpen: false }),

  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
}));
