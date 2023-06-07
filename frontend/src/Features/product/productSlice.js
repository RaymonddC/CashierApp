import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  dataProduct: [],
  pageCount: 0,
  isLoad: true,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (initialState, action) => {
      initialState.dataProduct = action.payload;
    },
    setPageCount: (initialState, action) => {
      initialState.pageCount = action.payload;
    },
    setIsLoad: (initialState, action) => {
      initialState.isLoad = action.payload;
    },
  },
});

export const getDataProduct = (page) => async (dispatch) => {
  try {
    let response = await axios.get(
      `http://localhost:5000/products?page=${page}`
    );
    if (response.status === 200) {
      dispatch(setIsLoad(false));
    }
    dispatch(setDataProduct(response.data.data));
    dispatch(setPageCount(response.data.pagination.pageCount));
    console.log(response.data);
  } catch (error) {}
};

export const { setDataProduct, setPageCount, setIsLoad } = productSlice.actions;

export default productSlice.reducer;
