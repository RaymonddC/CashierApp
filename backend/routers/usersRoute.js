const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { usersController } = require('./../controllers');

const { multerUpload } = require('../middleware/multerCategory');

router.get('/getCashiers', auth.verifyToken, usersController.getAllCashier);
router.put('/:id', auth.verifyToken, multerUpload.single('user_image'), usersController.updateUser);
router.delete('/:id', auth.verifyToken, usersController.deleteUser);

module.exports = router;
