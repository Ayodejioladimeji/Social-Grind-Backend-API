const express = require("express")
const app = express()
const mongoose = require('mongoose')
const dotenv = require("dotenv").config()
const helmet = require("helmet")
const morgan = require("morgan")
const userRoute = require('./routes/users')


// CONFIGURING MONGO DB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}, ()=> {
    console.log("connected to MongoDB")
})


// DECLARING THE MIDDLEWARES
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

// CONNECTING THE ROUTES
app.use("api/user", userRoute)



// SETTING THE PORT
app.listen(8800, ()=> {
    console.log("Backend server is running")
})