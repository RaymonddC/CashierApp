import { configureStore } from "@reduxjs/toolkit";
import productSlice from ".././features/product/productSlice";

export const Store = configureStore({
  reducer: {
    product: productSlice,
  },
});
