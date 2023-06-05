const db = require("../models");
const { product } = db;
const fs = require("fs");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const { product_name, stock, category_id } = req.body;

      const product_image = req.file;

      const result = await product.create({
        product_name: product_name,
        stock: Number(stock),
        product_image: product_image.filename,
        category_id: Number(category_id),
      });

      return res.status(201).send({
        isError: false,
        message: "Product Created!",
        data: result,
      });
    } catch (error) {
      return res.status(500).send({
        isError: true,
        message: "Error : " + error,
        data: null,
      });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const { product_name, stock, category_id } = req.body;

      const product_image = req.file;

      const getImage = await product.findOne({
        attributes: ["product_image"],
        where: {
          id: Number(id),
        },
      });

      console.log(getImage.product_image);

      fs.unlinkSync(`public/product_image/${getImage.product_image}`);

      const result = await product.update(
        {
          product_name: product_name,
          stock: Number(stock),
          product_image: product_image.filename,
          category_id: Number(category_id),
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      return res.status(200).send({
        isError: false,
        message: "Product updated!",
        data: null,
      });
    } catch (error) {
      return res.status(500).send({
        isError: true,
        message: "Error : " + error,
        data: null,
      });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const getImage = await product.findOne({
        attributes: ["product_image"],
        where: {
          id: Number(id),
        },
      });

      fs.unlinkSync(`public/product_image/${getImage.product_image}`);

      const result = await product.destroy({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).send({
        isError: false,
        message: "Product deleted!",
        data: null,
      });
    } catch (error) {
      return res.status(500).send({
        isError: true,
        message: "Error : " + error,
        data: null,
      });
    }
  },
};