import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { subTotal } from "../../helper/orderHelper";

const initialState = {
  orderMenu: [],
  subTotal: 0,
};

const orderMenuSlice = createSlice({
  name: "orderMenu",
  initialState,
  reducers: {
    setOrderMenu: (initialState, action) => {
      initialState.orderMenu = action.payload;
    },
    setSubTotal: (initialState, action) => {
      initialState.subTotal = action.payload;
    },
  },
});

export const getOrderMenuByIdUser = (id) => async (dispatch) => {
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_URL}/ordermenu/${id}`
    );
    dispatch(setOrderMenu(response.data.data));
    dispatch(setSubTotal(subTotal(response.data.data)));
    console.log(response.data.data);
  } catch (error) {
    toast.error(error.message);
  }
};

export const postOrderMenu = (input) => async (dispatch) => {
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_API_URL}/ordermenu/`,
      {
        user_id: input.user_id,
        product_id: input.product_id,
        quantity: input.quantity,
      }
    );
    console.log(response.data.data);
    if (response.status === 201) {
      toast.success("Data Created!");
      dispatch(getOrderMenuByIdUser(2));
    }
    // console.log(input);
  } catch (error) {
    console.log(error);
  }
};

export const incrementQty = (input) => async (dispatch) => {
  try {
    let newQuantity = input.quantity + 1;
    let response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/ordermenu/${input.id}`,
      {
        quantity: newQuantity,
      }
    );
    console.log(response.data.data);
    if (response.status === 200) {
      toast.success("Data Updated!");
      dispatch(getOrderMenuByIdUser(2));
    }
    console.log(input.id);
    console.log(newQuantity);
  } catch (error) {
    console.log(error);
  }
};

export const decrementQty = (input) => async (dispatch) => {
  try {
    let newQuantity = input.quantity - 1;
    let response;
    if (newQuantity !== 0) {
      response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/ordermenu/${input.id}`,
        {
          quantity: newQuantity,
        }
      );
    } else {
      response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/ordermenu/${input.id}`
      );
    }
    if (response.status === 200) {
      console.log(response.data.data);
      toast.success(response.data.message);
      dispatch(getOrderMenuByIdUser(2));
    }
    console.log(input.id);
    console.log(newQuantity);
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrderMenu = (user_id) => async (dispatch) => {
  try {
    let response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/ordermenu/all/${user_id}`
    );
    if (response.status === 200) {
      toast.success("Order Transaction created!");
      dispatch(getOrderMenuByIdUser(2));
    }
  } catch (error) {
    toast.error(error);
  }
};

// export const deleteDataProduct = (id, currentPage) => async (dispatch) => {
//   try {
//     let result = await axios.delete(
//       `${process.env.REACT_APP_API_URL}/products/${id}`
//     );
//     if (result.status === 200) {
//       toast.success("Data Deleted!");
//       dispatch(getDataProduct(currentPage));
//     }
//   } catch (error) {
//     toast.error(error.message);
//   }
// };

export const { setOrderMenu, setSubTotal } = orderMenuSlice.actions;

export default orderMenuSlice.reducer;
