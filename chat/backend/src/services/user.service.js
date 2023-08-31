const UserModel = require('../models/user.model');
const ChatModel = require('../models/chatRoom.model')
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const getUsers = async(reqUser)=>{
const getUsers = await UserModel.find({_id:{$ne:reqUser._id}});
if(getUsers.length>0){
    return getUsers
}
else{
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exists.')
}
}

const createChatRoom  = async(reqUser,reqBody)=>{
    const findRoom = await ChatModel.findOne({members:{$in:[reqUser._id,reqBody.user._id]}});
    if(findRoom){
        return findRoom
    }
    else{
        const createRoom = await ChatModel.create({
            chatRoomName:reqBody.user.fullName,
            members:[reqUser._id,reqBody.user._id]
        })
        if(createRoom){
            return createRoom
        }
    }

}


module.exports = {getUsers,createChatRoom}