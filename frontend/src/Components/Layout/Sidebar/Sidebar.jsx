import React, { useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync } from '../../../Features/User/UserSlice';
import './Sidebar.css';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import { Link, Navigate } from 'react-router-dom';

export const Sidebar = () => {
  let dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useSelector((state) => state.user);

  return (
    <div
      className={` shrink-0 bg-white/95 lg:bg-white/100 sidebar   overflow-hidden ease-in-out duration-150 flex flex-col justify-between md:min-h-[100vh] rounded-r-[8px] ${
        openMenu ? 'w-[75%] lg:w-[240px] min-h-[100%]' : 'w-[50px] h-[50px] pt-[8px] flex-row  md:w-[80px] '
      } `}
    >
      <div className="button  h-[10vh] w-[100%] z-50 flex justify-center">
        <button
          className="w-[100%] "
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
        >
          {openMenu ? <MenuOpenRoundedIcon /> : <MenuRoundedIcon />}
        </button>
      </div>
      <div className="menus text-[#8491A5] min-h-[70vh]">
        {/* <p>search</p> */}
        <div className={`adminHome ${user?.role_id !== 1 ? 'hidden' : ''}`}>
          <Link to={'/admin'} className="cardIconSidebar">
            <HomeOutlinedIcon />
            <p className={`${openMenu ? '' : 'invisible'}`}>Dashboard</p>
          </Link>
        </div>
        <div className={`graph ${user?.role_id !== 1 ? 'hidden' : ''}`}>
          <Link to={'/graph'} className="cardIconSidebar">
            <ShowChartRoundedIcon />
            <p className={`${openMenu ? '' : 'invisible'}`}>Sales</p>
          </Link>
        </div>
        <div className={`cashierHome`}>
          <Link to={'/'} className="cardIconSidebar">
            <ShoppingCartOutlinedIcon />
            <p className={`${openMenu ? '' : 'invisible'}`}>Order</p>
          </Link>
        </div>
        <div className={`categories ${user?.role_id !== 1 ? 'hidden' : ''}`}>
          <Link to={'/categories'} className="cardIconSidebar">
            <CategoryOutlinedIcon />
            <p className={`${openMenu ? '' : 'invisible'}`}>Category</p>
          </Link>
        </div>
        <div className={`manageCashier ${user?.role_id !== 1 ? 'hidden' : ''}`}>
          <Link to={'/cashiers'} className="cardIconSidebar">
            <GroupAddOutlinedIcon />
            <p className={`${openMenu ? '' : 'invisible'}`}>Cashier</p>
          </Link>
        </div>
        <div className="profileSidebar hidden">
          <Link className="cardIconSidebar">
            <PersonOutlineOutlinedIcon />
            <p className={`${openMenu ? '' : 'invisible'}`}>Profile</p>
          </Link>
        </div>
      </div>
      <div className="profile min-w-[100%]">
        <div className="avatar w-[40px] h-[40px] bg-[#FFCA40] rounded-full">
          <img src={`http://localhost:5000/product_image/IMG1685974633294.png`} alt="" />
        </div>
        <div className={`detail ${openMenu ? '' : 'invisible'}`}>
          {/* {console.log(user)} */}
          <p className="username">{user?.username || 'Please Login'}</p>
          <p className="email">{user?.username ? `${user?.username}@gmail.com` : ''}</p>
        </div>
        {user ? (
          <div
            className="logout"
            onClick={() => {
              dispatch(logoutAsync());
            }}
          >
            <LogoutRoundedIcon />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
    // <div className="min-w-[100px] min-h-screen bg-white flex flex-col justify-between py-5">
    //   <div className=" min-h-[80px] flex justify-center items-center">
    //     <div className="w-[50px] h-[50px] bg-[#FF2351]"></div>
    //   </div>
    //   <div className=" h-[100%] flex flex-col px-2 mt-5 gap-2">
    //     <div className="flex min-h-[80px] flex-col justify-center items-center gap-1 relative rounded-lg">
    //       <HomeIcon />
    //       <div className="absolute bottom-[5px]">Home</div>
    //     </div>
    //     <div className="flex min-h-[80px] flex-col justify-center items-center gap-1 relative rounded-lg">
    //       <DashboardIcon />
    //       <div className="absolute bottom-[5px]">Dashboard</div>
    //     </div>
    //     <div className="flex min-h-[80px] flex-col justify-center items-center gap-1 relative rounded-lg">
    //       <AdminPanelSettingsIcon />
    //       <div className="absolute bottom-[5px]">Admin</div>
    //     </div>
    //   </div>
    //   <div className=" flex flex-col justify-center ">
    //     <div
    //       className="flex flex-col justify-center min-h-[80px] items-center gap-1 relative"
    //       onClick={() => {
    //         dispatch(logoutAsync());
    //       }}
    //     >
    //       <LogoutIcon />
    //       <div className="absolute bottom-0">Log out</div>
    //     </div>
    //   </div>
    // </div>
  );
};
