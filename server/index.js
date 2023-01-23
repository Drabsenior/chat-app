const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messagesRoute')
const socket = require('socket.io')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth',userRoutes)
app.use('/api/message',messageRoutes)

dotenv.config()

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log('db connected successfully')).catch((err)=>console.log(err.message))

const server =app.listen(process.env.PORT,()=>console.log(`server listening in port ${process.env.PORT}`))
const io = socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true
    }
})

global.onlineUsers = new Map()

io.on('connection',(socket)=>{
    global.chatSocket = socket;
    socket.on('add-user',(userId)=>{
        onlineUsers.set(userId,socket.id)
    })
    socket.on('send-msg',(data)=>{
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit('msg-recieve',data.message)
        }
    })
})
