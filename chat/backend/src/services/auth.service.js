
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

const login = async (reqBody) => {
    const user = await UserModel.findOne({
      email: reqBody.email
    });
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email not registered');
    } else {
      const checkedPassword = await bcrypt.compare(
        reqBody.password,
        user.password
      );
      console.log(checkedPassword,"checkedPassword")
      if (checkedPassword) {
        return user;
      } else {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'Invalid email or password'
        );
      }
    }
  };

module.exports = {register,login}