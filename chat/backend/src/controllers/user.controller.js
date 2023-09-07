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

const getRooms = catchAsync(async (req, res)=>{
const getRooms = await userService.getRooms(req.user);
if(getRooms){
  return res.status(200).send({
    serverResponse: {
      code: 200,
      message: 'Get Chat Rooms',
    },
    result: {
      data: getRooms,
    
    },
  });
}

})

const createMessage = catchAsync(async(req,res)=>{
const createMessage = await userService.createMessage(req.user,req.body);
if(createMessage){
  return res.status(200).send({
    serverResponse: {
      code: 200,
      message: 'Get Chat Rooms',
    },
    result: {
      data: createMessage,
    
    },
  });
}

})

const getChatRoomMessage = catchAsync(async(req,res)=>{
  console.log(req.user,"reqUser");
  console.log(req.body,"reqBody")
const getChatRoom = await userService.getMessage(req.user,req.params);
if(getChatRoom){
  return res.status(200).send({
    serverResponse: {
      code: 200,
      message: 'Get Chat Rooms',
    },
    result: {
      data: getChatRoom,
    
    },
  });
}

})

module.exports = {getUsers,createChatRoom,getRooms,createMessage,getChatRoomMessage}