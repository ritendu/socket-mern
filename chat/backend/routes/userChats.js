const express = require('express');
const userChats = require('../controllers/userChats');
const protectRoute = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/',protectRoute.protect,userChats.accessChats);
router.get('/',protectRoute.protect,userChats.fetchChats);
router.post('/group',protectRoute.protect,userChats.createGroupChat);
router.put('/rename',protectRoute.protect,userChats.renameGroup);
router.put('/add-to-group',protectRoute.protect,userChats.addToGroup);
router.put('/group-remove',protectRoute.protect,userChats.removeGroup)

module.exports = router