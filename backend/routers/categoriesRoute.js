const express = require('express');

const Router = express.Router();

const { multerUpload } = require('../middleware/multerCategory');

const { categoriesController } = require('../controllers');

const auth = require('../middleware/auth');

Router.get('/', categoriesController.getCategories);
Router.get('/:id', categoriesController.getCategoryById);
Router.post('/', multerUpload.single('category_image'), categoriesController.createCategory);
Router.put('/:id', auth.verifyToken, multerUpload.single('category_image'), categoriesController.updateCategory);
// Router.delete("/:id", productController.deleteProduct);

module.exports = Router;
