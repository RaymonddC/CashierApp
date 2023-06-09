import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  dataProduct: [],
  pageCount: 0,
  isLoad: true,

  page: 1,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setDataProduct: (initialState, action) => {
      initialState.dataProduct = action.payload;
      console.log(initialState);
    },
    setPageCount: (initialState, action) => {
      initialState.pageCount = action.payload;
    },
    setIsLoad: (initialState, action) => {
      initialState.isLoad = action.payload;
    },
    // setCategoryId: (initialState, action) => {
    //   console.log(action.payload);
    //   initialState.category_id = action.payload;
    //   console.log(initialState.category_id);
    // },
    // setFilter: (initialState, action) => {
    //   initialState.category_id = action.payload.category_id;
    //   // initialState.ordered = action.payload.ordered;
    //   // initialState.orderedBy = action.payload.orderedBy;
    //   // initialState.search = action.payload.search;
    //   // console.log(initialState, '<=========>', action.payload);
    // },
  },
});

export const getDataProduct = (page, filter) => async (dispatch) => {
  try {
    let param = { page: page };
    if (filter.category_id) param['searchCategory'] = filter.category_id;
    if (filter.search) param['searchQuery'] = filter.search;
    if (filter.ordered) {
      param['ordered'] = filter.ordered;
      param['orderedBy'] = filter.orderedBy;
    }

    let response = await axios.get(`http://localhost:5000/products`, {
      params: param,
    });
    if (response.status === 200) {
      dispatch(setIsLoad(false));
    }
    dispatch(setDataProduct(response.data.data));
    dispatch(setPageCount(response.data.pagination.pageCount));
  } catch (error) {
    console.log(error);
  }
};

// export const changeFilter = (filter) => async (dispatch) => {
//   try {
//     const { category_id, ordered, orderedBy, search } = filter;
//     const filterParams = {};

//     if (category_id) {
//       filterParams.category_id = category_id;
//     } else {
//       filterParams.category_id = initialState.category_id;
//     }

//     console.log(initialState.ordered, 'test disini', initialState.category_id);
//     // const newFilter = {
//     //   category_id: category_id ? category_id : initialState.category_id,
//     //   ordered: ordered || initialState.ordered,
//     //   orderedBy: orderedBy || initialState.orderedBy,
//     //   search: search || initialState.search,
//     // };
//     const newFilter = filterParams;
//     console.log(newFilter);
//     console.log(category_id, 'babi');
//     dispatch(setCategoryId(category_id));
//   } catch (error) {}
// };

export const { setDataProduct, setPageCount, setIsLoad, setFilter, setCategoryId } = productSlice.actions;

export default productSlice.reducer;
