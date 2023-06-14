import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

// import { auth } from './../../firebase';
// import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
// const provider = new GoogleAuthProvider();

const token = localStorage.getItem('token') ? localStorage?.getItem('token') : '';

const initialState = {
  cashierList: [],
  user: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onGetData: (initialState, action) => {
      initialState.cashierList = action.payload;
    },
    onSaveData: (initialState, action) => {
      initialState.cashierList = action.payload;
    },
    onSaveUser: (initialState, action) => {
      initialState.user = action.payload;
    },
  },
});

export const checkCredentialAsync = (email, password) => async (dispatch) => {
  try {
    console.log('awd');
    console.log(process.env.REACT_APP_API_URL, 'test');
    let response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
      usernameOrEmail: email,
      password: password,
    });
    console.log(response);

    return response.data;
  } catch (error) {
    throw { message: error.response.data.message };
  }
};

export const onLoginAsync = (values) => async (dispatch) => {
  try {
    const { email, password } = values;
    if (!email || !password) return toast.error(`Fill All Data!`);

    // dispatch(toggleBtn());

    let result = await dispatch(checkCredentialAsync(email, password));
    console.log(values);

    if (result.length === 0) throw { message: 'Account Not Found' };

    localStorage.removeItem('token');

    console.log(result);
    localStorage.setItem('token', result.token);
    localStorage.setItem('auth', JSON.stringify({ token: result.token, authorization: result.data.Role.type }));

    localStorage.setItem('userId', result.data.id);

    // console.log(result)

    dispatch(onSaveUser(result.data));

    toast.success('Login Success!');
  } catch (error) {
    console.log('error');
    toast.error(error.message);
  } finally {
    // dispatch(toggleBtn());
  }
};

export const getCashiersAsync = () => async (dispatch) => {
  try {
    let response = await axios.get(`${process.env.REACT_APP_API_URL}/users/getCashiers`, {
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('awdaw', response);
    dispatch(onSaveData(response.data.data));
  } catch (error) {}
};

export const onRegister = (props) => async (dispatch) => {
  try {
    const { username, password, userImage } = props;
    if (!username) return toast.error(`Fill All Data!`);

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
      username: username,
      email: username,
      password: 'password',
      confirmPassword: 'password',
    });

    toast.success('Register Success!');
    dispatch(getCashiersAsync());
  } catch (error) {
    console.log(error);
    toast.error(JSON.stringify(error.response.data.message));
  } finally {
    // dispatch(toggleBtn());
  }
};

export const updateUser = (data) => async (dispatch) => {
  try {
    const { id, username } = data;
    axios.put(
      process.env.REACT_APP_API_URL + `/users/${id}`,
      {
        username: username,
        // category_image: category_image,
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    toast.success('User Updated');
    dispatch(getCashiersAsync());
    console.log('done');
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const deleteUser = (value) => async (dispatch) => {
  try {
    const { id } = value;
    console.log('testos');
    let result = await axios.delete(`${process.env.REACT_APP_API_URL}/users/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    if (result.status === 200) {
      toast.success('Data Deleted!');
      dispatch(getCashiersAsync());
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

// export const activationAsync = (input, email) => async (dispatch) => {
//   try {
//     console.log(input);
//     let { data } = await axios.post(`http://localhost:5000/users/activate`, { activationCode: input, email: email });
//     dispatch(onSaveUser(data));
//     toast.success('User Activated');
//   } catch (error) {
//     toast.error(error.response.data.message);
//     // toast.error(error.message);
//   }
// };

export const keepLoginAsync = () => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');
    // if (token == null) throw { message: 'No User' };
    if (token) {
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/getUser`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      dispatch(onSaveUser(response.data.data));
      console.log(response.data.data);
    }
  } catch (error) {}
};

export const logoutAsync = () => async (dispatch) => {
  try {
    let id = localStorage.getItem('userId');
    let token = localStorage.getItem('token');
    let auth = localStorage.getItem('auth');
    if (id && token && auth) {
      localStorage.clear('userId');
      localStorage.clear('token');
      localStorage.clear('auth');
      console.log('function', id, token, auth);
      dispatch(onSaveUser(null));
    }
    console.log(localStorage.getItem('auth'), 'logout');
    console.log('testlogout');
    toast.success('Logout Success!');
    console.log('toast');
  } catch (error) {}
};

// export const onForgetPass = (email) => async (dispatch) => {
//   try {
//     let response = await axios.post(`${UrlApi}/users/forgetPassword`, { email });

//     console.log(response.data);
//     if (response.data.success) return toast.success(response.data.message);
//     throw { message: response.message };
//   } catch (error) {
//     console.log(error);
//     toast.error(error.response.data.message);
//   }
// };

export const onChangePass = (data) => async (dispatch) => {
  try {
    return;
    const { email, password, confirmPassword } = data;
    if (password != confirmPassword) return toast.error(`Password Doesnt Match!`);

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/changePassword`, {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });

    if (response.data.success) return toast.success('Password Change');
  } catch (error) {
    console.log(error);
    toast.error(JSON.stringify(error.response.data.message));
  } finally {
    dispatch(toggleBtn());
  }
};

// export const onLoginWithGoogle = () => async (dispatch) => {
//   try {
//     let { user } = await signInWithPopup(auth, provider);

//     let data = await dispatch(checkCredentialAsync('email', user.email, user.uid));

//     console.log(data);

//     if (data.length === 0) {
//       console.log('register');
//       await dispatch(onRegister(' ', ' ', 1, 1, 1990, user.displayName, user.email, user.uid, user.uid));
//     } else await dispatch(onLoginAsync(user.email, user.uid));

//     console.log(await dispatch(checkCredentialAsync('email', user.email, user.uid)));
//     console.log('google');
//     // console.log(response);
//   } catch (error) {}
// };

export const { onSaveData, onSaveUser, toggleBtn } = UserSlice.actions;
export default UserSlice.reducer;
