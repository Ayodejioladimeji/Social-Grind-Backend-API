const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require('bcrypt')



// REGISTER THE USER
router.post("/register", async (req, res) => {
    const {username, email, password} = req.body

    try{
        // GENERATE A PASSWORD
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // CREATE A NEW USER
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        // SAVE USER TO DATABASE
        const user = await newUser.save()
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
})


// LOGIN THE USER
router.post("/login", async (req, res) => {
    const {email, password} = req.body
    try{
        // CHECKING IF THE USER EMAIL EXISTS
        const user = await User.findOne({email})
        if(!user) return res.status(404).json({msg: "User not found"}) 

        // CHECKING THE USER PASSWORD -- COMPARING
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword) return res.status(400).json({msg: "Incorrect Password"})

        // LOGIN THE USER IF CORRECT INFORMATIONS ARE PROVIDED
        res.status(200).json({
            msg: "Login successful",
            user:user
        })
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router