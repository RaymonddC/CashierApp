import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { subTotal } from "../../helper/orderHelper";

const token = localStorage.getItem("token")
  ? localStorage?.getItem("token")
  : "";

const initialState = {
  graphData: [],
};

const transactionSlice = createSlice({
  name: "Transaction",
  initialState,
  reducers: {
    setGraphData: (initialState, action) => {
      initialState.graphData = action.payload;
    },
  },
});

export const getDataGraph = (date) => async (dispatch) => {
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_URL}/transactions/?start=${date.start}&end=${date.end}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    console.log(response);
    dispatch(setGraphData(response.data.data));
  } catch (error) {
    console.log(error);
  }
};

export const createTransaction =
  (transaction_date, total_transaction) => async (dispatch) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}/transactions/`,
        {
          transaction_date,
          total_transaction,
        }
      );
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  };

export const { setGraphData } = transactionSlice.actions;

export default transactionSlice.reducer;
