import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../Features/product/productSlice";

export const Store = configureStore({
  reducer: {
    product: productSlice,
  },
});
