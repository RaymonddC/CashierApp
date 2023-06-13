const express = require("express");

const Router = express.Router();

const { transactionController } = require("../controllers");

Router.get("/", transactionController.getTransaction);

module.exports = Router;
