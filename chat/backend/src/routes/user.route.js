const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const auth = require("../middlewares/auth");

router.get('/get/users',auth(),userController.getUsers)

module.exports = router