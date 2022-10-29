const asynchandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');
const registerUser = asynchandler(async(req,res)=>{
    console.log(req.body,"req.body")
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please enter all the fields");
    }
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error("User already exists");
    }
    const user = await User.create({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,
      pic:req.body.pic
    })
if(user){
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        pic:user.pic,
        token:generateToken(user._id)
    })
}
else{
    res.status(400)
    throw new Error("Failed to create the User");
}
})

const loginUser = asynchandler(async(req,res)=>{
    const { email, password } = req.body;

    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  
})

// const allUsers = asynchandler(async(req,res)=>{
//   const searchQuery = req.query.search;
//   const findUser = await User.find({$or:[{email:{$regex:searchQuery,$options:"i"}},{name:{$regex:searchQuery,$options:"i"}}]});
//   if(findUser){
//     res.status(200).json({data:findUser})
//   }
// })
const allUsers = asynchandler(async(req,res)=>{
  const keyword = req.query.search?{
    $or:[{name:{$regex:req.query.search,$options:"i"}},
  {email:{$regex:req.query.search,$options:"i"}}]
  }:{}

  const users = await User.find(keyword).find({
  _id:{$ne:req.user._id}
  });
  res.send(users)
})

module.exports = {registerUser,loginUser,allUsers}