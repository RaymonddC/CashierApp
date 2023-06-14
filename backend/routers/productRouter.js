const express = require("express");

const Router = express.Router();

const { multerUpload } = require("../middleware/multer");

const auth = require("../middleware/auth");

const { productController } = require("../controllers");

Router.get("/", auth.verifyToken, productController.getProduct);
Router.get("/categories", auth.verifyToken,productController.getAllCategory);
Router.get("/:id", auth.verifyToken,productController.getProudctById);
Router.post(
  "/",auth.verifyToken,
  multerUpload.single("product_image"),
  productController.createProduct
);
Router.put(
  "/:id",auth.verifyToken,
  multerUpload.single("product_image"),
  productController.updateProduct
);
Router.delete("/:id",auth.verifyToken, productController.deleteProduct);

module.exports = Router;
