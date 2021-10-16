const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require('bcrypt')


// UPDATE A USER
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.user.isAdmin){

        // IF THE USER CHANGES THE USER PASSWORD
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            }
            catch(err){
                res.status(500).json(err)
            }
        }

        try{
            // UPDATE THE USER INFORMATION
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body   //automatically sets the input
        })

        res.status(200).json({msg: "Account updated", user:user})
        }
        catch(err){
            return res.status(500).json(err)
        }
    }
    else{
        return res.status(403).json({msg: "You can update only your account!"})
    }
})



// DELETE A USER


// GET A USER


// FOLLOW A USER


// UNFOLLOW A USER

// GET ALL USERS

module.exports = router