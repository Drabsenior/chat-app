const bcrypt = require('bcrypt')
const User = require('../model/userModel')
module.exports.register = async (req,res,next)=>{
   try {
     const {userName,email,password} = req.body;
    
     const userNameCheck = await User.findOne({userName})
     if(userNameCheck){
        return res.json({msg:'UserName is already found',status:false})
     }
     const emailCheck = await User.findOne({email})
     if(emailCheck){
        return res.json({msg:'Email is already found',status:false})
     }

     const hashedPassword = await bcrypt.hash(password,10)
     const useritem = {
        userName,
        email,
        password:hashedPassword
     }
       console.log(useritem)
     const user = await User.create(useritem)

     delete user.password

     return res.json({user,status:true})
   } catch (err) {
    console.error(err.message)
    next(err)
   }
}

module.exports.login = async (req,res,next)=>{
  const {userName,password}  = req.body;
   const user = await User.findOne({userName})
   if(!user){
    return res.json({msg:"Invalid credntials",status:false})
   }
   const isValidPassword = await bcrypt.compare(password,user.password)
   if(!isValidPassword){
    return res.json({msg:"Invalid credntials",status:false})
   }
   delete user.password
 
   return res.json({user,status:true})
}