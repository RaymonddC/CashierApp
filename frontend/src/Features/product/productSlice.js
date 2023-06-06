import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  dataProduct: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (initialState, action) => {
      initialState.dataProduct = action.payload;
    },
  },
});

export const getDataProduct = () => async (dispatch) => {
  try {
    let response = await axios.get("http://localhost:5000/products");
    dispatch(setDataProduct(response.data.data));
    // console.log(response);
  } catch (error) {}
};

export const { setDataProduct } = productSlice.actions;

export default productSlice.reducer;
