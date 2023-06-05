const express = require('express');
const router = express.Router();

const { usersController } = require('./../controllers');

router.post('/register', usersController.userCreate);
router.post('/login', usersController.userLogin);

module.exports = router;
