const { Op, where } = require("sequelize");
const db = require("../models");
const { product, category } = db;
const fs = require("fs");

module.exports = {
  getProduct: async (req, res) => {
    const limitPage = 2;
    try {
      let { searchCategory, ordered, orderedBy, searchQuery, page } = req.query;

      let whereQuery = {
        product_name: { [Op.like]: `%${searchQuery || ""}%` },
      };

      if (searchCategory) whereQuery["category_id"] = searchCategory;

      const { count, rows } = await product.findAndCountAll({
        include: {
          model: db.category,
          attributes: ["category_name"],
        },
        where: whereQuery,
        order: [[orderedBy || "product_name", ordered || "ASC"]],
        limit: limitPage,
        offset: (Number(page) - 1) * limitPage,
      });

      return res.status(200).send({
        isError: false,
        message: "Get Product success!",
        data: rows,
        pagination: {
          pageCount: Math.ceil(count / limitPage),
        },
      });
    } catch (error) {
      console.log(error);
      res.status(error.code || 500).send({
        isError: true,
        message: "Error : " + error,
        data: null,
      });
    }
  },

  getAllCategory: async (req, res) => {
    try {
      let result = await category.findAll({
        attributes: { exclude: ["category_image"] },
      });
      res.status(200).send({
        isError: false,
        message: "Get Category success!",
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

  getProudctById: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await product.findOne({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).send({
        isError: false,
        message: "Get Product By Id success!",
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

  createProduct: async (req, res) => {
    try {
      const { product_name, stock, category_id, price } = req.body;

      const product_image = req.file;

      const result = await product.create({
        product_name: product_name,
        stock: Number(stock),
        product_image: product_image.filename,
        category_id: Number(category_id),
        price: Number(price),
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

      const { product_name, stock, price, category_id } = req.body;

      const product_image = req.file;

      const getImage = await product.findOne({
        attributes: ["product_image"],
        where: {
          id: Number(id),
        },
      });

      let result;

      if (product_image) {
        console.log(getImage.product_image);

        fs.unlinkSync(`public/product_image/${getImage.product_image}`);

        result = await product.update(
          {
            product_name: product_name,
            price: Number(price),
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
      } else {
        result = await product.update(
          {
            product_name: product_name,
            price: Number(price),
            stock: Number(stock),
            category_id: Number(category_id),
          },
          {
            where: {
              id: Number(id),
            },
          }
        );
      }

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
