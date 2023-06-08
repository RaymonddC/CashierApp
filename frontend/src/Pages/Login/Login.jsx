import React, { useState } from 'react';
// import { Button, ButtonGroup, Center, Square, Circle, Flex, Spacer, Text, Box, Image, Input, Heading } from '@chakra-ui/react';
import { Formik } from 'formik';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onLoginAsync } from '../../Features/User/UserSlice';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';

// const notify = () => toast('Here is your toast.');

export const Login = () => {
  const user = useSelector((state) => state?.user?.user);
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();

  console.log(user);

  if (user) return <Navigate to={'/admin'} />;
  return (
    <div className="flex h-[100vh]">
      <div className="image flex-1 bg-cover bg-[url('https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')]">
        <Card sx={{ minHeight: '100vh', width: '100%' }}>
          <CardCover>
            <img
              src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
              srcSet="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
              loading="lazy"
              alt=""
            />
          </CardCover>
          <CardCover
            sx={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 150vh)',
            }}
          />
          <CardContent sx={{ justifyContent: 'flex-end' }}>
            <p className="text-white">Restaurant anjing</p>
            <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
              Yosemite National Park
            </Typography>
            <Typography startDecorator={<LocationOnRoundedIcon />} textColor="neutral.300">
              California, USA
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className="formSide flex-1 flex flex-col h-[100vh] justify-center ">
        <div className="form px-[20%] ">
          <p className="text-[50px] ">Welcome Back!</p>
          <p className="text-[15px] pb-[20px] text-[#808080]">Please sign in to continue</p>
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                dispatch(onLoginAsync(values));
                // alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit} className="">
                {/* <p className="font-semibold">E-mail</p> */}
                <div className="inputEmail my-[20px]">
                  <input type="email" name="email" onChange={handleChange} placeholder="Enter Your e-mail" className="pl-[20px] pr-[15px] py-[20px] bg-[#EEEEEE] rounded-xl w-full " onBlur={handleBlur} value={values.email} />
                  {errors.email && touched.email && errors.email}
                </div>
                {/* <p className="font-semibold">Password</p> */}
                <div className="inputPass relative my-[20px]">
                  <div className="icon" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <VisibilityOffOutlinedIcon className="absolute right-[20px] top-[20px]" /> : <VisibilityOutlinedIcon className="absolute right-[20px] top-[20px]" />}
                  </div>
                  <input
                    type={showPass ? 'text' : 'password'}
                    name="password"
                    placeholder="Your Password"
                    className="pl-[20px] pr-[15px] py-[20px] w-[100%] bg-[#EEEEEE] rounded-xl"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password && errors.password}
                </div>
                {/* <Button variant="contained">Contained</Button> */}
                <button type="submit" className="bg-[#FF2351] text-[white] rounded-xl py-[20px] w-full my-[20px]" disabled={isSubmitting}>
                  Submit
                </button>
              </form>
            )}
          </Formik>

          <Link to={'/'}>
            <p className="underline">Forgot Password?</p>
          </Link>

          <Link to={'/'}>
            <p className="text-[#808080]">Don't have an account? Contact your Administrator</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
