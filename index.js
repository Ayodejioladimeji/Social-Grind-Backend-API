const express = require("express")
const app = express()
const mongoose = require('mongoose')
require("dotenv").config()
const helmet = require("helmet")
const morgan = require("morgan")
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')


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
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postsRoute)



// SETTING THE PORT
const PORT = process.env.PORT || 8800
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})