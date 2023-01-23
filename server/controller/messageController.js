const messageModel = require("../model/messageModel");


module.exports.addMessage = async (req,res,next)=>{
    try {
        const {from ,to,message} = req.body;
        const response = await messageModel.create({
          message:{text:message},
          users:[from,to],
          sender:from,
        })
        if(response){
            return res.json('Message added successfully')
        }
        return res.json('Adding message failed')
    } catch (ex) {
        next(ex)
    }
}

module.exports.getAllMessages = async(req,res,next)=>{
    try {
        const {from,to} = req.body;
      
        const messages = await messageModel.find({
            users:{$all:[from,to]}
        })
        
         const projectMessages = messages.map((msg)=>{
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text

            }
        })
        res.json(projectMessages)
    } catch (ex) {
        next(ex)
        
    }
}