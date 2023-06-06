const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { usersController } = require('./../controllers');

router.post('/register', usersController.userCreate);
router.post('/login', usersController.userLogin);

//keepLogin (byToken)
router.get('/getUser', auth.verifyToken, usersController.getUserById);

module.exports = router;
