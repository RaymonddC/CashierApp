const { Op, where } = require("sequelize");
const db = require("../models");
const { orderMenu, product, User } = db;
const fs = require("fs");

module.exports = {
  getOrderMenuById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await orderMenu.findAll({
        include: [
          {
            model: product,
          },
          {
            model: User,
            attributes: ["username", "email"],
          },
        ],
        where: {
          user_id: Number(id),
        },
      });

      return res.status(200).send({
        isError: false,
        message: "Get Order Menu By Id Success!",
        data: result,
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

  createOrderMenu: async (req, res) => {
    try {
      const { user_id, product_id, quantity } = req.body;

      const result = await orderMenu.create({
        user_id,
        product_id,
        quantity,
      });
      return res.status(201).send({
        isError: false,
        message: "OrderMenu Created!",
        data: result,
      });
      // console.log(req.body);
    } catch (error) {
      console.log(error);
      res.status(error.code || 500).send({
        isError: true,
        message: "Error : " + error,
        data: null,
      });
    }
  },

  updateQuantity: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      const result = await orderMenu.update(
        {
          quantity: quantity,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );
      return res.status(200).send({
        isError: false,
        message: "OrderMenu Updated!",
        data: result,
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

  deleteOrderMenu: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await orderMenu.destroy({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).send({
        isError: false,
        message: "delete order success!",
        data: null,
      });
    } catch (error) {
      res.status(error.code || 500).send({
        isError: true,
        message: "Error : " + error,
        data: null,
      });
    }
  },

  deleteAllOrderMenu: async (req, res) => {
    try {
      const { user_id } = req.params;
      const result = await orderMenu.destroy({
        where: {
          user_id: Number(user_id),
        },
      });
      return res.status(200).send({
        isError: false,
        message: "delete order success!",
        data: null,
      });
    } catch (error) {
      res.status(error.code || 500).send({
        isError: true,
        message: "Error : " + error,
        data: null,
      });
    }
  },
};
