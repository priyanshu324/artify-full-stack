import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "@/src/types/order";

interface ZOrdersState {
  orders: Order[];
}

const initialState: ZOrdersState = {
  orders: [],
};

const zOrdersSlice = createSlice({
  name: "zOrders",
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.unshift(action.payload);
    },
    clearOrders(state) {
      state.orders = [];
    },
  },
});

export const { addOrder, clearOrders } = zOrdersSlice.actions;
export default zOrdersSlice.reducer;
