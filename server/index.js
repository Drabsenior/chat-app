const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth',userRoutes)
dotenv.config()

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log('db connected successfully')).catch((err)=>console.log(err.message))




const server =app.listen(process.env.PORT,()=>console.log(`server listening in port ${process.env.PORT}`))