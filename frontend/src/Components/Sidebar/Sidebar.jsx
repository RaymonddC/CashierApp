import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useDispatch } from 'react-redux';
import { logoutAsync } from '../../Features/User/UserSlice';

export const Sidebar = () => {
  let dispatch = useDispatch();
  return (
    <div className="w-[130px] min-h-screen bg-white flex flex-col justify-between py-5">
      <div className=" min-h-[80px] flex justify-center items-center">
        <div className="w-[50px] h-[50px] bg-[#FF2351]"></div>
      </div>
      <div className=" h-[100%] flex flex-col px-2 mt-5 gap-2">
        <div className="flex min-h-[80px] flex-col justify-center items-center gap-1 relative rounded-lg">
          <HomeIcon />
          <div className="absolute bottom-[5px]">Home</div>
        </div>
        <div className="flex min-h-[80px] flex-col justify-center items-center gap-1 relative rounded-lg">
          <DashboardIcon />
          <div className="absolute bottom-[5px]">Dashboard</div>
        </div>
        <div className="flex min-h-[80px] flex-col justify-center items-center gap-1 relative rounded-lg">
          <AdminPanelSettingsIcon />
          <div className="absolute bottom-[5px]">Admin</div>
        </div>
      </div>
      <div className=" flex flex-col justify-center ">
        <div
          className="flex flex-col justify-center min-h-[80px] items-center gap-1 relative"
          onClick={() => {
            dispatch(logoutAsync());
          }}
        >
          <LogoutIcon />
          <div className="absolute bottom-0">Log out</div>
        </div>
      </div>
    </div>
  );
};
