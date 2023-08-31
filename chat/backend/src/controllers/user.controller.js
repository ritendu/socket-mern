const catchAsync = require("../utils/catchAsync");
const UserModel = require('../models/user.model')
const userService = require('../services/user.service')

const getUsers = catchAsync(async (req, res)=>{
const getUsers = await userService.getUsers(req.user);
if(getUsers){
    return res.status(200).send({
        serverResponse: {
          code: 200,
          message: 'Users Found',
        },
        result: {
          data: getUsers,
        
        },
      });
}
})

const createChatRoom = catchAsync(async (req, res)=>{
const createRoom = await userService.createChatRoom(req.user,req.body);
if(createRoom){
  return res.status(200).send({
    serverResponse: {
      code: 200,
      message: 'Chat Room created',
    },
    result: {
      data: createRoom,
    
    },
  });
}

})

module.exports = {getUsers,createChatRoom}