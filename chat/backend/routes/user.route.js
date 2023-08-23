const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


router.post('/register',userController.createUser)
router.post('/login',userController.loginUser);
router.post('/getUsers',userController.getUsers)
router.post('/create-chat-room',userController.createRoom)
module.exports = router