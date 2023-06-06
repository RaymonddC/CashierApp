const express = require("express");

const Router = express.Router();

const { multerUpload } = require("../middleware/multer");

const { productController } = require("../controllers");

Router.get("/", productController.getProduct);
Router.get("/:id", productController.getProudctById);
Router.post(
  "/",
  multerUpload.single("product_image"),
  productController.createProduct
);
Router.put(
  "/:id",
  multerUpload.single("product_image"),
  productController.updateProduct
);
Router.delete("/:id", productController.deleteProduct);

module.exports = Router;
