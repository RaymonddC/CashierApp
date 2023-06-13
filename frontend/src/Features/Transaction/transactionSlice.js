import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { subTotal } from "../../helper/orderHelper";

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

export const getDataGraph = () => async (dispatch) => {
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_URL}/transactions/`
    );
    console.log(response);
    dispatch(setGraphData(response.data.data));
  } catch (error) {
    console.log(error);
  }
};

export const { setGraphData } = transactionSlice.actions;

export default transactionSlice.reducer;
