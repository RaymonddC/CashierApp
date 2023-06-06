import React, { useState } from 'react';
// import { Button, ButtonGroup, Center, Square, Circle, Flex, Spacer, Text, Box, Image, Input, Heading } from '@chakra-ui/react';
import { Formik } from 'formik';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

export const Login = () => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="flex h-[100vh]">
      <div className="image flex-1"></div>
      <div className="formSide flex-1 flex flex-col h-[100vh] justify-center ">
        <div className="form px-[20%] min-h-max">
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
                alert(JSON.stringify(values, null, 2));
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
              <form onSubmit={handleSubmit} className="flex flex-col justify-around h-[100%]">
                {/* <p className="font-semibold">E-mail</p> */}
                <input type="email" name="email" onChange={handleChange} placeholder="Enter Your e-mail" className="pl-[20px] pr-[15px] py-[20px] bg-[#EEEEEE] rounded-xl" onBlur={handleBlur} value={values.email} />
                {errors.email && touched.email && errors.email}
                {/* <p className="font-semibold">Password</p> */}
                <div className="inputPass relative">
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
                <button type="submit" className="bg-[#EE8C21] text-[white] rounded-xl py-[20px]" disabled={isSubmitting}>
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
