const express = require('express');
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const userController = require('../controllers/userControllers');
router.post('/register',userController.registerUser);
router.post('/login',userController.loginUser);
router.get('/all-users',protect,userController.allUsers)
module.exports = router;