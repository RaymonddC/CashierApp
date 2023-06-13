import { configureStore } from "@reduxjs/toolkit";
import productSlice from ".././Features/product/productSlice";
import CategoryReducer from ".././Features/Category/CategorySlice";
import UserReducer from ".././Features/User/UserSlice";
import orderMenuReducer from ".././Features/OrderMenu/OrderMenuSlice";
import transactionReducer from ".././Features/Transaction/transactionSlice";

export const Store = configureStore({
  reducer: {
    user: UserReducer,
    product: productSlice,
    category: CategoryReducer,
    orderMenu: orderMenuReducer,
    transaction: transactionReducer,
  },
});
