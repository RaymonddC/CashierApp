import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const initialState = {
  dataProduct: [],
  pageCount: 0,
  dataProductById: {},
  isLoad: true,
  category: [],
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
    setCategory: (initialState, action) => {
      initialState.category = action.payload;
    },
    setDataProductById: (initialState, action) => {
      initialState.dataProductById = action.payload;
    },
  },
});

export const getDataProduct = (page) => async (dispatch) => {
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_URL}/products?page=${page}`
    );
    if (response.status === 200) {
      dispatch(setIsLoad(false));
    }
    dispatch(setDataProduct(response.data.data));
    dispatch(setPageCount(response.data.pagination.pageCount));
    console.log(response.data);
  } catch (error) {
    console.error("error : " + error);
  }
};

export const getAllCategory = () => async (dispatch) => {
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_URL}/products/categories`
    );
    dispatch(setCategory(response.data.data));
    // console.log(response);
  } catch (error) {
    console.error("error : " + error);
  }
};

export const getDataProductById = (id) => async (dispatch) => {
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_URL}/products/${id}`
    );
    dispatch(setDataProductById(response.data.data));
    // console.log(response);
  } catch (error) {
    toast.error(error.message);
  }
};

export const postDataProduct = (input) => async (dispatch) => {
  console.log(input);
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_API_URL}/products/`,
      {
        product_name: input.productName,
        price: input.price,
        stock: input.stock,
        product_image: input.productImage,
        category_id: input.category,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data.data);
    if (response.status === 201) {
      toast.success("Data Created!");
      dispatch(getDataProduct(input.currentPage));
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateDataProduct =
  (currentPage, id, product_name, price, stock, category_id, product_image) =>
  async (dispatch) => {
    // toast.success(currentPage);
    try {
      let result;
      if (!product_image) {
        result = await axios.put(
          `${process.env.REACT_APP_API_URL}/products/${id}`,
          {
            product_name,
            price,
            stock,
            category_id,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        result = await axios.put(
          `${process.env.REACT_APP_API_URL}/products/${id}`,
          {
            product_name,
            price,
            stock,
            category_id,
            product_image,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      console.log(result);
      toast.success("Data updated!");
      dispatch(setDataProductById({}));
      dispatch(getDataProduct(currentPage));
    } catch (error) {
      toast.error(error.message);
    }
  };

export const deleteDataProduct = (id, currentPage) => async (dispatch) => {
  try {
    let result = await axios.delete(
      `${process.env.REACT_APP_API_URL}/products/${id}`
    );
    if (result.status === 200) {
      toast.success("Data Deleted!");
      dispatch(getDataProduct(currentPage));
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const {
  setDataProduct,
  setDataProductById,
  setPageCount,
  setIsLoad,
  setCategory,
} = productSlice.actions;

export default productSlice.reducer;
