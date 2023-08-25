const UserModel = require('../models/user.model')
const ChatRoomModel = require('../models/chat.model')
const MessageModel = require('../models/message.model')

const createUser = async(req,res)=>{
    const createuser = await UserModel.create({
        fullName:req.body.fullName,
        email:req.body.email,
        password:req.body.password
    })
    res.send({data:createuser})
}

const loginUser = async(req,res)=>{
    const findUser = await UserModel.findOne({email:req.body.email,password:req.body.password});
    if(findUser){
        res.send({data:findUser})
    }
    else{
        res.send({message:'Invalid Credentials'})
    }

}

const getUsers = async(req,res)=>{
const findUsers = await UserModel.find({_id:{$ne:req.body.userId}});
if(findUsers.length>0){
    res.send({data:findUsers})
}
else{
    res.send({message:'No Users Found'})
}
}

const createRoom = async(req,res)=>{
    const findChatRoom = await ChatRoomModel.findOne({ members: { $elemMatch: { $eq: req.body.userId, $eq:req.body.receiverId  } } });
    const findUser = await UserModel.findOne({_id:req.body.receiverId});
    if(findChatRoom){
        res.send({data:findChatRoom})
    }
    else{
        let createRoom = await ChatRoomModel.create({
            chatRoomName:findUser.fullName,
            members:[req.body.userId,req.body.receiverId]
           })
       
           createRoom = await createRoom.save();
          return res.send({data:createRoom})
    }
 
}

const createMessage = async(req,res)=>{
    const findChatRoom = await ChatRoomModel.findOne({_id:req.body.roomId});
    console.log(findChatRoom,"????????")
    if(findChatRoom){
        console.log('Hello World')
        let createMessage = new MessageModel({
            chatRoomId:findChatRoom._id,
            messageText:req.body.message
        })
        createMessage = await createMessage.save();
        res.send({data:createMessage})
    }
}

module.exports ={createUser,loginUser,getUsers,createRoom,createMessage}