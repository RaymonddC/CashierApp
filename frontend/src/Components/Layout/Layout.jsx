import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const Layout = (props) => {
  const user = useSelector((state) => state?.user?.user);
  useEffect(() => {
    setTimeout(() => {
      props.setAuthStorage(JSON.parse(localStorage.getItem('auth')));
      //   checkToken();
    }, 5 * 60 * 1000);
  }, []);
  console.log('layout', user);
  if (!user) return <Navigate to={'/login'} />;

  return (
    <>
      <Sidebar />
      <div className="md:ml-[80px]">{props.children}</div>
    </>
  );
};
