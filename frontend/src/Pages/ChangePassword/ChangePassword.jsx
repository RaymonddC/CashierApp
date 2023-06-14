import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

export const ChangePassword = () => {
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    // name: Yup.string().email('Invalid name').required('Required'),
    // image: Yup.mixed()
    //   .required('Required')
    //   .test('is-valid-type', 'Not a valid image type', (value) => isValidFileType(value && value.image.toLowerCase(), 'image')),
  });

  return (
    // <div>
    //   <div className="formSide flex-1 flex flex-col h-[100vh] justify-center ">
    //     <div className="form px-[20%] ">
    //       <p className="text-[50px] ">Change Your Password</p>
    //       <p className="text-[15px] pb-[20px] text-[#808080]">Change your password regularly</p>
    //       <Formik
    //         initialValues={{ password: '', confirmPassword: '' }}
    //         validationSchema={DisplayingErrorMessagesSchema}
    //         onSubmit={(values, { setSubmitting }) => {
    //           setTimeout(() => {
    //             dispatch(onLoginAsync(values));
    //             // alert(JSON.stringify(values, null, 2));
    //             setSubmitting(false);
    //           }, 400);
    //         }}
    //       >
    //         {({
    //           values,
    //           errors,
    //           touched,
    //           handleChange,
    //           handleBlur,
    //           handleSubmit,
    //           isSubmitting,
    //           /* and other goodies */
    //         }) => (
    //           <form onSubmit={handleSubmit} className="">
    //             {/* <p className="font-semibold">E-mail</p> */}
    //             <div className="inputEmail my-[20px]">
    //               <input type="text" name="email" onChange={handleChange} placeholder="Enter Your e-mail" className="pl-[20px] pr-[15px] py-[20px] bg-[#EEEEEE] rounded-xl w-full " onBlur={handleBlur} value={values.email} />
    //               {errors.email && touched.email && errors.email}
    //             </div>
    //             {/* <p className="font-semibold">Password</p> */}
    //             <div className="inputPass relative my-[20px]">
    //               <div className="icon" onClick={() => setShowPass(!showPass)}>
    //                 {showPass ? <VisibilityOffOutlinedIcon className="absolute right-[20px] top-[20px]" /> : <VisibilityOutlinedIcon className="absolute right-[20px] top-[20px]" />}
    //               </div>
    //               <input
    //                 type={showPass ? 'text' : 'password'}
    //                 name="password"
    //                 placeholder="Your Password"
    //                 className="pl-[20px] pr-[15px] py-[20px] w-[100%] bg-[#EEEEEE] rounded-xl"
    //                 onChange={handleChange}
    //                 onBlur={handleBlur}
    //                 value={values.password}
    //               />
    //               {errors.password && touched.password && errors.password}
    //             </div>
    //             {/* <Button variant="contained">Contained</Button> */}
    //             <button type="submit" className="bg-[#FF2351] text-[white] rounded-xl py-[20px] w-full my-[20px]" disabled={isSubmitting}>
    //               Submit
    //             </button>
    //           </form>
    //         )}
    //       </Formik>

    //       <Link to={'/'}>
    //         <p className="underline">Forgot Password?</p>
    //       </Link>

    //       <Link to={'/'}>
    //         <p className="text-[#808080]">Don't have an account? Contact your Administrator</p>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
};
