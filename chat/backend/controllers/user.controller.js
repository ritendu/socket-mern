const UserModel = require('../models/user.model')

const createUser = async(req,res)=>{
    console.log(req.body,">>>>>>>>")
    const createuser = await UserModel.create({
        fullName:req.body.fullName,
        email:req.body.email,
        password:req.body.password
    })
    res.send({data:createuser})
}

module.exports ={createUser}