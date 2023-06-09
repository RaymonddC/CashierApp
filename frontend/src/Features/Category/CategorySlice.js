import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const token = localStorage.getItem('token') ? localStorage?.getItem('token') : '';

const initialState = {
  list: [],
  category: null,
};

export const CategorySlice = createSlice({
  name: 'category',
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
    let response = await axios.get(`${process.env.REACT_APP_API_URL}/categories`);
    console.log('awdaw', response);
    dispatch(onSaveData(response.data.data));
  } catch (error) {}
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

// export function updateTweet(data) {
//   return axios.put(
//     process.env.REACT_APP_API_URL + '/tweet',
//     {
//       tweet: data.tweet,
//       imageUrl: data.imageUrl,
//       userId: 1,
//     },
//     {
//       headers: {},
//     }
//   );
// }

// export const postPostAsync = (caption, image) => async (dispatch) => {
//   try {
//     // if (!imageUrl) throw { message: 'There is no Image' };
//     let userId = localStorage.getItem('userId');
//     let { data } = await axios.post(
//       `${UrlApi}/posts`,
//       {
//         caption,
//         // imageUrl,
//         image,
//       },
//       {
//         headers: {
//           Authorization: `bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );

//     dispatch(getPostAsync());
//     toast.success('Post Created');
//   } catch (error) {
//     toast.error(error.message);
//   }
// };

export const { onSaveData, onSaveUser, toggleBtn } = CategorySlice.actions;
export default CategorySlice.reducer;
