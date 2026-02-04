// src/store/uiStore.ts
import {create} from "zustand";

type UIState = {
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  openWishlist: () => void;
  closeWishlist: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isWishlistOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  openWishlist: () => set({ isWishlistOpen: true }),
  closeWishlist: () => set({ isWishlistOpen: false }),
}));
