const express = require("express");

const Router = express.Router();

const { orderMenuController } = require("../controllers");

Router.post("/", orderMenuController.createOrderMenu);
Router.get("/:id", orderMenuController.getOrderMenuById);
Router.patch("/:id", orderMenuController.updateQuantity);
Router.delete("/:id", orderMenuController.deleteOrderMenu);
module.exports = Router;
