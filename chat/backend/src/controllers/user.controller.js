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


module.exports = {getUsers}