const UserModel = require('../models/user.model')
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


module.exports = {getUsers}