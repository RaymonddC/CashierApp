import React from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";

export const Form = () => {
  const formik = useFormik({
    initialValues: {
      productName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form className="flex flex-col" onSubmit={formik.handleSubmit}>
      <input type="file" />
      <label htmlFor="productName">Product Name</label>
      <TextField
        id="outlined-basic productName"
        name=""
        label="Outlined"
        variant="outlined"
      />
      <input
        id="productName"
        name="productName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.productName}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
