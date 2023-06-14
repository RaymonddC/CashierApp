import { Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { onChangePass } from '../../Features/User/UserSlice';

export const ChangePassword = () => {
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    // name: Yup.string().email('Invalid name').required('Required'),
    // image: Yup.mixed()
    //   .required('Required')
    //   .test('is-valid-type', 'Not a valid image type', (value) => isValidFileType(value && value.image.toLowerCase(), 'image')),
  });

  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="formSide flex-1 flex flex-col h-[100vh] justify-center ">
        <div className="form px-[20%] ">
          <p className="text-[50px] ">Change Your Password</p>
          <p className="text-[15px] pb-[20px] text-[#808080]">Change your password regularly</p>
          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                dispatch(onChangePass(values));
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
                {/* <p className="font-semibold">Password</p> */}
                <div className="inputPass relative my-[20px]">
                  <div className="icon" onClick={() => setShowCPass(!showCPass)}>
                    {showCPass ? <VisibilityOffOutlinedIcon className="absolute right-[20px] top-[20px]" /> : <VisibilityOutlinedIcon className="absolute right-[20px] top-[20px]" />}
                  </div>
                  <input
                    type={showCPass ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="pl-[20px] pr-[15px] py-[20px] w-[100%] bg-[#EEEEEE] rounded-xl"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                  {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                </div>
                {/* <Button variant="contained">Contained</Button> */}
                <button type="submit" className="bg-[#FF2351] text-[white] rounded-xl py-[20px] w-full my-[20px]" disabled={isSubmitting}>
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
