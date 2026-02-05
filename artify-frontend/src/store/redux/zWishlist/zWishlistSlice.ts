import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ZWishlistItem {
  id: number;
  name: string;
  price: number;
  img: string;
  slug: string;
}

interface ZWishlistState {
  items: ZWishlistItem[];
}

const initialState: ZWishlistState = {
  items: [],
};

const zWishlistSlice = createSlice({
  name: "zWishlist",
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<ZWishlistItem>) {
      if (!state.items.find(i => i.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    clearWishlist(state) {
      state.items = [];
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = zWishlistSlice.actions;

export default zWishlistSlice.reducer;
