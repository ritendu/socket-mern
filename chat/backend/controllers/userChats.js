const asynchandler = require('express-async-handler');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const accessChats = asynchandler(async(req,res)=>{
    const {userId} = req.body;
    if(!userId){
        console.log('UserId param not sentwith request');
        return res.sendStatus(400)
    }
  var isChat = await Chat.find({
    isGroupChat:false,
    $and:[{users:{$elemMatch:{$eq:req.user._id}}},
    {users:{$elemMatch:{$eq:userId}}}]
     }).populate("users","-password").populate("latestMessage");

     isChat = await User.populate(isChat,{
      path:'latestMessage.sender',
      select:'name pic email',
     })
     if(isChat.length>0){
      res.send(isChat[0]);
     }
     else{
      var chatData ={
        chatName:"sender",
        isGroupChat:false,
        users:[req.user._id,userId]
      }
      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({_id:createdChat._id}).populate("users","-password");
        res.status(200).send(FullChat);  
      } catch (error) {
       res.status(400);
       throw new Error(error.message);
      }
      
     }
  
})

const fetchChats = asynchandler(async(req,res)=>{
try {
 const fetchChat = await Chat.find({users:{$elemMatch:{$eq:req.user._id}}}).populate('users','-password').populate('groupAdmin','-password').populate('latestMessage').sort({updatedAt:-1});
const fetchChats = await User.populate(fetchChat,{
  path:'latestMessage.sender',
  select:'name pic email'
})
 res.status(200).json({data:fetchChats});
} catch (error) {
  res.status(400).json({message:error.message})

}
})

const createGroupChat = asynchandler(async(req,res)=>{
  if(!req.body.users || !req.body.name){
return res.status(400).json({message:'Please Fill all the fields'});
  }
  const users = JSON.parse(req.body.users);
  
  if(users.length<2){
    return res.status(400).json({message:"More than 2 users are required to form group chat"})
  }
  users.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName:req.body.name,
      users:users,
      isGroupChat:true,
      groupAdmin:req.user
    })
    const fullGroupChat = await Chat.findOne({_id:groupChat._id}).populate('users','-password').populate('groupAdmin','-password');
    res.status(200).json({data:fullGroupChat});
  } catch (error) {
    res.status(400).json({message:error.message});
  }

})

const renameGroup = asynchandler(async(req,res)=>{
const {chatId,chatName}= req.body;
const updatedChat = await Chat.findByIdAndUpdate(chatId,{chatName:chatName},{new:true}).populate("users","-password").populate('groupAdmin','-password');
if(!updatedChat){
  res.status(400).json({message:error.message});
}
else{
  res.status(200).json({data:updatedChat});
}
})

const addToGroup = asynchandler(async(req,res)=>{
const {chatId,userId}= req.body;
const added = await Chat.findByIdAndUpdate(chatId,{$push:{users:userId}},{new:true}).populate('users','-password').populate('groupAdmin','-password');
if(!added){
  return res.status(400).json({message:'Chat Not Found'})
}
else{
  res.status(200).json({data:added});
}

})

const removeGroup = asynchandler(async(req,res)=>{
  const {chatId,userId}= req.body;
  const added = await Chat.findByIdAndUpdate(chatId,{$pull:{users:userId}},{new:true}).populate('users','-password').populate('groupAdmin','-password');
  if(!added){
    return res.status(400).json({message:'Chat Not Found'})
  }
  else{
    res.status(200).json({data:added});
  }
})

module.exports = {accessChats,fetchChats,createGroupChat,renameGroup,addToGroup,removeGroup}

