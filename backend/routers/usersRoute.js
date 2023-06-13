const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { usersController } = require('./../controllers');

const { multerUpload } = require('../middleware/multerCategory');

router.post('/register', usersController.userCreate);
router.post('/login', usersController.userLogin);

// //keepLogin (byToken)

router.get('/getUser', auth.verifyToken, usersController.getUserById);
router.get('/getCashiers', auth.verifyToken, usersController.getAllCashier);
router.put('/:id', auth.verifyToken, multerUpload.single('user_image'), usersController.updateUser);
router.delete('/:id', auth.verifyToken, usersController.deleteUser);

module.exports = router;
