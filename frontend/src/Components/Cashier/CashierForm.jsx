import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onRegister, updateUser } from '../../Features/User/UserSlice';
import { TextField } from '@mui/material';
import * as Yup from 'yup';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  // name: Yup.string().email('Invalid name').required('Required'),
  // image: Yup.mixed()
  //   .required('Required')
  //   .test('is-valid-type', 'Not a valid image type', (value) => isValidFileType(value && value.image.toLowerCase(), 'image')),
});

export const CashierForm = (props) => {
  const dispatch = useDispatch();

  const toBlob = (imageRaw) => {
    let file = imageRaw;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setViewImage(reader.result);
    };
  };
  const [viewImage, setViewImage] = useState(null);

  const [initialData, setInitialData] = useState({
    username: '',
    password: '',
    userImage: '',
  });

  useEffect(() => {
    setInitialData({
      username: props.cashier?.username,
      image: '',
    });
    setViewImage(props.cashier?.user_image);
    console.log('anjing');
  }, [props.cashier?.username]);
  console.log(props.cashier);
  return (
    <>
      <Formik
        initialValues={initialData}
        enableReinitialize={true}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={(values, { setSubmitting }) => {
          try {
            setTimeout(() => {
              if (props.cashier) {
                dispatch(
                  updateUser({
                    id: props.cashier.id,
                    username: values.username,
                    // , category_image: values.image
                  })
                );
              } else {
                dispatch(onRegister(values));
              }
              console.log('yokk');
              //   alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ values, errors, touched, handleSubmit, isSubmitting, handleBlur, handleChange, setValues }) => {
          return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[15px]">
              {/* <input type="text" onChange={handleChange} onBlur={handleBlur} value={values.name} name="name" /> */}
              <TextField id="outlined-basic" label="Username" variant="outlined" name="username" value={values.username} onBlur={handleBlur} onChange={handleChange} className="pl-[20px] pr-[15px] py-[20px]  rounded-xl w-full " />
              {touched.username && errors.username && <div>{errors.username}</div>}

              {/* <input
                id="file"
                name="image"
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => {
                  values.userImage = e.target.files[0];
                  toBlob(e.target.files[0]);
                }}
                className="pl-[20px] pr-[15px] py-[15px]  rounded-xl w-full border "
              />
              {touched.userImage && errors.userImage && <div>{errors.userImage}</div>}
              {viewImage ? <p className="img-preview-wrapper">{<img src={viewImage} alt="preview" />}</p> : null} */}

              <p>Default Password: 'password'</p>
              <button onClick={() => props.handleClose()} type="submit" className="bg-[#FF2351] text-[white] rounded-xl py-[20px] w-full my-[10px]" disabled={isSubmitting}>
                {props.cashier ? 'Update Cashier' : 'Add Cashier'}
              </button>
            </form>
          );
        }}
      </Formik>
    </>
  );
};
