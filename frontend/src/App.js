import logo from './logo.svg';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

import { Login } from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Admin from './Pages/Admin/Admin';
import { Category } from './Pages/Admin/Category/Category';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { keepLoginAsync } from './Features/User/UserSlice';
import { CashierManagement } from './Pages/Admin/CashierManagement/CashierManagement';
import { Sidebar } from './Components/Layout/Sidebar/Sidebar';
import Dashboard from './Pages/Dashboard/Dashboard';
import { ChangePassword } from './Pages/ChangePassword/ChangePassword';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import { Layout } from './Components/Layout/Layout';

const PrivateRoute = (props) => {
  const { authStorage, redirectPath = '/login' } = props;
  // let
  console.log('tes', authStorage);
  if (!authStorage?.token) {
    return <Navigate to={redirectPath} replace />;
  }
  return props.children ? props.children : <Outlet />;
  //return <Test />;
};

const ProtectedAuthRoute = (props) => {
  const { authStorage, redirectPath = '/' } = props;

  console.log(Boolean(authStorage?.token), authStorage, 'proteauth');
  if (authStorage?.token) {
    return <Navigate to={redirectPath} replace />;
  }
  return props.children ? props.children : <Outlet />;
  //return <Test />;
};

const ProtectedRoute = (props) => {
  const { authStorage, redirectPath = '/' } = props;

  console.log(authStorage, 'protected');
  // if (authStorage?.authorization === 'Admin') {
  return props.children ? props.children : <Outlet />;
  // }
  return <Navigate to={redirectPath} replace />;
};

function App() {
  const [authStorage, setAuthStorage] = useState(JSON.parse(localStorage.getItem('auth')));

  useEffect(() => {
    console.log(authStorage, 'useeffect auth');
  }, [authStorage]);

  const router = createBrowserRouter([
    {
      path: '/',
      forceRefresh: true,
      element: (
        <Layout setAuthStorage={setAuthStorage}>
          {console.log(authStorage)}
          <Home />
        </Layout>
      ),
    },
    {
      path: '/admin',
      forceRefresh: true,
      element: (
        <Layout setAuthStorage={setAuthStorage}>
          <ProtectedRoute authStorage={authStorage}>
            <Admin />
          </ProtectedRoute>
        </Layout>
      ),
    },
    {
      path: '/categories',
      forceRefresh: true,
      element: (
        <Layout setAuthStorage={setAuthStorage}>
          <ProtectedRoute authStorage={authStorage}>
            <Category />
          </ProtectedRoute>
        </Layout>
      ),
    },
    {
      path: '/dashboard',
      forceRefresh: true,
      element: (
        <Layout setAuthStorage={setAuthStorage}>
          <ProtectedRoute authStorage={authStorage}>
            <Dashboard />
          </ProtectedRoute>
        </Layout>
      ),
    },
    {
      path: '/cashiers',
      forceRefresh: true,
      element: (
        <Layout setAuthStorage={setAuthStorage}>
          <ProtectedRoute authStorage={authStorage}>
            <CashierManagement />
          </ProtectedRoute>
        </Layout>
      ),
    },
    {
      path: '/changePassword',
      forceRefresh: true,
      element: (
        <Layout setAuthStorage={setAuthStorage}>
          <ChangePassword />
        </Layout>
      ),
    },
    {
      path: '/login',
      forceRefresh: true,
      element: (
        <ProtectedAuthRoute authStorage={authStorage}>
          {/* <Layout setAuthStorage={setAuthStorage}> */}
          <Login authStorage={authStorage}></Login>
          {/* </Layout> */}
        </ProtectedAuthRoute>
      ),
    },
    {
      path: '*',
      element: <Navigate to="/" replace></Navigate>,
    },
  ]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(keepLoginAsync());
  }, []);

  // const {user} = useSelector((state) => state.)

  // console.log(user);

  return (
    <>
      <Toaster />
      <RouterProvider router={router}> </RouterProvider>;
    </>
  );
}

export default App;
