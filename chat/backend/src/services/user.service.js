const UserModel = require("../models/user.model");
const ChatModel = require("../models/chatRoom.model");
const MessageModel = require('../models/message.model')
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

// const getUsers = async(reqUser)=>{
// const getUsers = await UserModel.find({_id:{$ne:reqUser._id}});
// if(getUsers.length>0){
//     return getUsers
// }
// else{
//     throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exists.')
// }
// }

const getUsers = async (reqUser) => {
  const getUsers = await ChatModel.find({
    members: { $elemMatch: { $ne: reqUser._id } },
  });

  const arr = [];
  if (getUsers.length !== 0) {
    getUsers.map((item) => {
      arr.push(...new Set(item.members));
    });
    const getUsersList = await UserModel.find({ _id: { $nin: arr } });
    return getUsersList;
  } else {
    const getUsers = await UserModel.find({ _id: { $ne: reqUser._id } });
    return getUsers;
  }
  // if(getUsers.length>0){
  //     return getUsers
  // }
  // else{
  //     throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exists.')
  // }
};

const createChatRoom = async (reqUser, reqBody) => {
  const findRoom = await ChatModel.findOne({
    members: { $elemMatch: { $eq: reqUser._id, $eq: reqBody.user._id } },
  });
  if (findRoom) {
    return findRoom;
  } else {
    const createRoom = await ChatModel.create({
      members: [reqUser._id, reqBody.user._id],
    });
    if (createRoom) {
      return createRoom;
    }
  }
};

const getRooms = async (reqUser) => {
  const getRooms = await ChatModel.find({
    members: { $elemMatch: { $eq: reqUser._id } },
  }).populate("members");
  return getRooms;
};

const createMessage = async (reqUser, reqBody) => {
  const findChatRoom = await ChatModel.findOne({
    _id: reqBody.chatRoomId,
    members: { $elemMatch: { $eq: reqUser._id } },
  });
  if (findChatRoom) {
 let newMessage = new MessageModel({
    chatRoomId:findChatRoom._id,
    senderId:reqUser._id,
    receiverId:reqBody.receiverId,
    messageText:reqBody.message
 })

 newMessage = await newMessage.save();
 return newMessage
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Chat room does not exists");
  }
};

const getMessage = async(reqUser,reqParams)=>{
const getMessage = await MessageModel.find({chatRoomId:reqParams.chatRoomId});
if(getMessage){
  return getMessage
} 
}

module.exports = { getUsers, createChatRoom, getRooms, createMessage,getMessage };
