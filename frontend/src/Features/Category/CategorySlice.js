import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const token = localStorage.getItem("token")
  ? localStorage?.getItem("token")
  : "";

const initialState = {
  list: [],
  category: null,
};

export const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    onGetData: (initialState, action) => {
      initialState.list = action.payload;
    },
    onSaveData: (initialState, action) => {
      initialState.list = action.payload;
    },
    onGetDetails: (initialState, action) => {
      initialState.category = action.payload;
    },
  },
});

export const getCategoriesAsync = () => async (dispatch) => {
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_URL}/categories`
    );
    // console.log('awdaw', response);
    dispatch(onSaveData(response.data.data));
  } catch (error) {}
};

export const postCategoryAsync =
  ({ name, image }) =>
  async (dispatch) => {
    try {
      // if (!imageUrl) throw { message: 'There is no Image' };
      let userId = localStorage.getItem('userId');
      let { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/categories`,
        {
          category_name: name,
          // imageUrl,
          category_image: image,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      dispatch(getCategoriesAsync());
      toast.success('Category Created');
    } catch (error) {
      toast.error(error.message);
    }
  };

export const deleteCategory = (value) => async (dispatch) => {
  try {
    const { id } = value;
    console.log('testos');
    let result = await axios.delete(`${process.env.REACT_APP_API_URL}/categories/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    if (result.status === 200) {
      toast.success('Data Deleted!');
      dispatch(getCategoriesAsync());
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

// export const getDetailCategory = (tweetId) => async (dispatch) => {
//   try {
//     const postDetail = await axios.get(process.env.REACT_APP_API_URL + '/tweet/' + tweetId, {
//       headers: {
//         Authorization: `bearer ${token}`,
//       },
//     });
//     dispatch(onGetDetails(postDetail));
//   } catch (error) {
//     console.log(error);
//   }
// };

export const updateCategory = (data) => async (dispatch) => {
  try {
    const { id, category_name, category_image } = data;
    console.log(id);
    axios.put(
      process.env.REACT_APP_API_URL + `/categories/${id}`,
      {
        category_name: category_name,
        category_image: category_image,
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    toast.success('Category Updated');
    dispatch(getCategoriesAsync());
    console.log('done');
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const { onSaveData, onSaveUser, toggleBtn } = CategorySlice.actions;
export default CategorySlice.reducer;
