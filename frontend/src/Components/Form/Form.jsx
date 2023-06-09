import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

// icon
import FileUploadIcon from "@mui/icons-material/FileUpload";

// dropdown
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  postDataProduct,
  updateDataProduct,
} from "../../Features/product/productSlice";

export const Form = (props) => {
  const dispatch = useDispatch();
  const { category, dataProductById } = useSelector((state) => state.product);
  const formik = useFormik({
    initialValues: {
      productName: "",
      price: "",
      stock: "",
      category: "",
      productImage: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.productName) {
        errors.productName = "Required!";
      }
      if (!values.price) {
        errors.price = "Required!";
      }
      if (!values.stock) {
        errors.stock = "Required!";
      }
      if (!values.category) {
        errors.category = "Required!";
      }
      if (!values.productImage) {
        errors.productImage = "Required!";
      }
      return errors;
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2))
      // console.log(values);
      const { productName, price, stock, category, productImage } = values;
      const { currentPage } = props;
      if (
        dataProductById?.product_name &&
        productImage === dataProductById?.product_name
      ) {
        dispatch(
          updateDataProduct(
            currentPage,
            dataProductById.id,
            productName,
            price,
            stock,
            category
          )
        );
        props.handleClose();
      } else if (
        dataProductById?.product_name &&
        productImage !== dataProductById?.product_name
      ) {
        dispatch(
          updateDataProduct(
            currentPage,
            dataProductById.id,
            productName,
            price,
            stock,
            category,
            productImage
          )
        );
        props.handleClose();
      } else {
        dispatch(
          postDataProduct({
            productName,
            price,
            stock,
            category,
            productImage,
            currentPage,
          })
        );
        props.handleClose();
      }
    },
  });
  const [imagePreview, setImagePreview] = useState();

  useEffect(() => {
    if (dataProductById.product_image) {
      setImagePreview(
        `${process.env.REACT_APP_API_URL}/product_image/${dataProductById.product_image}`
      );
      formik.setValues({
        productName: dataProductById.product_name,
        price: dataProductById.price,
        stock: dataProductById.stock,
        category: dataProductById.category_id,
        productImage: dataProductById.product_image,
      });
    }
    dispatch(getAllCategory());
  }, [dataProductById]);

  return (
    <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col justify-center items-center gap-1">
        {imagePreview ? (
          <img className="w-[150px] aspect-square" src={imagePreview}></img>
        ) : (
          <></>
        )}
        <label
          htmlFor="productImage"
          className="!bg-[#FF2351] rounded-lg text-white font-bold p-2 flex justify-center items-center gap-1 text-[14px]"
        >
          <FileUploadIcon fontSize="small" />
          Upload Image
        </label>
      </div>
      <input
        className="hidden"
        type="file"
        id="productImage"
        name="productImage"
        onChange={(e) => {
          formik.setFieldValue("productImage", e.target.files[0]);
          let file = e.target.files[0];
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
        }}
      />
      <TextField
        id="productName"
        label="Product Name"
        defaultValue={
          dataProductById !== {} ? dataProductById.product_name : ""
        }
        variant="outlined"
        type="text"
        name="productName"
        size="small"
        onChange={formik.handleChange}
        value={formik.values.productName}
      />
      {formik.errors.productName ? (
        <div>{formik.errors.productName}</div>
      ) : null}
      <TextField
        id="price"
        label="Price"
        variant="outlined"
        type="number"
        name="price"
        size="small"
        onChange={formik.handleChange}
        value={formik.values.price}
      />
      {formik.errors.price ? <div>{formik.errors.price}</div> : null}
      <TextField
        id="stock"
        label="Stock"
        variant="outlined"
        type="number"
        name="stock"
        size="small"
        onChange={formik.handleChange}
        value={formik.values.stock}
      />
      {formik.errors.stock ? <div>{formik.errors.stock}</div> : null}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" size="small">
          Category
        </InputLabel>
        <Select
          name="category"
          labelId="demo-simple-select-label"
          id="category"
          value={formik.values.category}
          label="category"
          size="small"
          onChange={formik.handleChange}
        >
          {category.map((val, idx) => {
            return (
              <MenuItem key={idx} value={val.id}>
                {val.category_name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {formik.errors.category ? <div>{formik.errors.category}</div> : null}

      {/* <button type="submit">Submit</button> */}
      <Button variant="contained" size="medium" type="submit">
        Submit
      </Button>
    </form>
  );
};
