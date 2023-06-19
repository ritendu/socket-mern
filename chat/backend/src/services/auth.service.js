
const UserModel = require('../models/user.model')
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");


const register = async(reqBody)=>{
    const findUser = await UserModel.findOne({email:reqBody.email});
    if(!findUser){
        const password = await bcrypt.hash(reqBody.password, 10); 
        let createUser = new UserModel({
            fullName:reqBody.fullName,
            email:reqBody.email,
            password:password
        })
        createUser = await createUser.save();
if(createUser) return createUser
    }



else{
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists.')
}

}

module.exports = {register}