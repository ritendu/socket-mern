const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const auth = require("../middlewares/auth");

router.get('/get/users',auth(),userController.getUsers);
router.post('/create/room',auth(),userController.createChatRoom);
router.get('/get/rooms',auth(),userController.getRooms);
router.post('/create/message',auth(),userController.createMessage);
router.get('/get/message/:chatRoomId',auth(),userController.getChatRoomMessage)

module.exports = router