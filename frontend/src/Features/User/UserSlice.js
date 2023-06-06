import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

// import { auth } from './../../firebase';
// import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
// const provider = new GoogleAuthProvider();

const token = localStorage.getItem('token') ? localStorage?.getItem('token') : '';

const initialState = {
  list: [],
  user: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onGetData: (initialState, action) => {
      initialState.list = action.payload;
    },
    onSaveData: (initialState, action) => {
      initialState.list = action.payload;
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
    let response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
      usernameOrEmail: email,
      password: password,
    });

    return response.data;
  } catch (error) {
    throw { message: error.response.data.message };
  }
};

export const onLoginAsync = (values) => async (dispatch) => {
  try {
    const { email, password } = values;
    if (!email || !password) return toast.error(`Fill All Data!`);

    dispatch(toggleBtn());

    let result = await dispatch(checkCredentialAsync(email, password));

    if (result.length === 0) throw { message: 'Account Not Found' };

    localStorage.removeItem('token');

    localStorage.setItem('token', result.token);

    localStorage.setItem('userId', result.data.id);

    dispatch(onSaveUser(result.data));

    toast.success('Login Success!');
  } catch (error) {
    console.log('error');
    alert(error.message);
    toast.error(error.message);
  } finally {
    dispatch(toggleBtn());
  }
};

// export const onRegister = (email, password, confirmPassword) => async (dispatch) => {
//   try {
//     if (!email || !password || !confirmPassword) return toast.error(`Fill All Data!`);
//     if (!email.includes('@')) return toast.error(`Email Not Valid!`);
//     if (password != confirmPassword) return toast.error(`Password Doesnt Match!`);

//     dispatch(toggleBtn());

//     // let { data } = await axios.get(`${UrlApi}/users?email=${email}`);

//     // if (data.length > 0) throw `Email Already Taken!`;

//     // let active = false;

//     // await axios.post(`${UrlApi}/users`, { email, password, active });
//     console.log('registering');
//     // process.exit();
//     const response = await axios.post(`${UrlApi}/users/register`, {
//       username: email,
//       email: email,
//       password: password,
//       confirmPassword: confirmPassword,
//     });
//     // console.log(response.success, response.data.message, response);
//     // if (!response.success) throw { message: response.data.message };
//     console.log('registering2');

//     // dispatch(onLoginAsync(email, password));

//     toast.success('Register Success!');
//   } catch (error) {
//     console.log(error);
//     toast.error(JSON.stringify(error.response.data.message));
//   } finally {
//     dispatch(toggleBtn());
//   }
// };

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
    let response = await axios.get(`${process.env.REACT_APP_API_URL}/users/getUser`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    dispatch(onSaveUser(response.data.data));
  } catch (error) {}
};

export const logoutAsync = () => async (dispatch) => {
  try {
    let id = localStorage.getItem('userId');

    if (id) {
      localStorage.clear('userId');
      dispatch(onSaveUser(null));
    }
    toast.success('Logout Success!');
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

// export const onChangePass = (data) => async (dispatch) => {
//   try {
//     const { email, password, confirmPassword } = data;
//     if (password != confirmPassword) return toast.error(`Password Doesnt Match!`);

//     dispatch(toggleBtn());

//     const response = await axios.post(`${UrlApi}/users/changePassword`, {
//       email: email,
//       password: password,
//       confirmPassword: confirmPassword,
//     });

//     if (response.data.success) return toast.success('Password Change');
//   } catch (error) {
//     console.log(error);
//     toast.error(JSON.stringify(error.response.data.message));
//   } finally {
//     dispatch(toggleBtn());
//   }
// };

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
