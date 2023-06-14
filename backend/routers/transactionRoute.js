const express = require("express");
const auth = require("../middleware/auth");

const Router = express.Router();

const { transactionController } = require("../controllers");

Router.get("/", auth.verifyToken, transactionController.getTransaction);
Router.post("/", transactionController.createTransaction);

module.exports = Router;
