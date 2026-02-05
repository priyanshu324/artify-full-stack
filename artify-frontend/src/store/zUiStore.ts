import { create } from "zustand";

interface ZUiState {
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  openWishlist: () => void;
  closeWishlist: () => void;
}

export const useZUiStore = create<ZUiState>((set) => ({
  isCartOpen: false,
  isWishlistOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  openWishlist: () => set({ isWishlistOpen: true }),
  closeWishlist: () => set({ isWishlistOpen: false }),
}));
