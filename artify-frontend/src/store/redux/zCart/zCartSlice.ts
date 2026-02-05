import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ZCartItem {
  description: any;
  id: number;
  name: string;
  price: number;
  img: string;
  slug: string;
  quantity: number;
}

interface ZCartState {
  [x: string]: any;
  items: ZCartItem[];
}

const initialState: ZCartState = {
  items: [],
};

const zCartSlice = createSlice({
  name: "zCart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ZCartItem>) {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    increaseQty(state, action: PayloadAction<number>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity++;
    },
    decreaseQty(state, action: PayloadAction<number>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = zCartSlice.actions;

export default zCartSlice.reducer;
