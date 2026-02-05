import { configureStore } from "@reduxjs/toolkit";

import zCartReducer from "./zCart/zCartSlice";
import zWishlistReducer from "./zWishlist/zWishlistSlice";
import zOrdersReducer from "./zOrders/zOrdersSlice";
// import zUserReducer from "./zUser/zUserSlice";

export const store = configureStore({
  reducer: {
    zCart: zCartReducer,
    zWishlist: zWishlistReducer,
    zOrders: zOrdersReducer,
    // zUser: zUserReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
