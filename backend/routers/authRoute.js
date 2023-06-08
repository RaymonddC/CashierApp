const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { authController } = require('./../controllers');

router.post('/register', authController.userCreate);
router.post('/login', authController.userLogin);

//keepLogin (byToken)
router.get('/getUser', auth.verifyToken, authController.getUserById);

module.exports = router;
