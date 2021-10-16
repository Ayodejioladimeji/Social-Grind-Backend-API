const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require('bcrypt')


// UPDATE A USER
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {

        // IF THE USER CHANGES THE USER PASSWORD
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            }
            catch (err) {
                res.status(500).json(err)
            }
        }

        try {
            // UPDATE THE USER INFORMATION
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body   //automatically sets the input
            })

            res.status(200).json({ msg: "Account updated", user: user })
        }
        catch (err) {
            return res.status(500).json(err)
        }
    }
    else {
        return res.status(403).json({ msg: "You can update only your account!" })
    }
})



// DELETE A USER
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            // UPDATE THE USER INFORMATION
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json({ msg: "Account Deleted successfully" })
        }
        catch (err) {
            return res.status(500).json(err)
        }
    }
    else {
        return res.status(403).json({ msg: "You can delete only your account!" })
    }
})



// GET A USER
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) return res.status(404).json({msg: "User not found"})

        const {password, updatedAt, ...other} = user._doc
        res.status(200).json({user: other})
    } 
    catch (error) {
        res.status(500).json(error)
    }
})



// FOLLOW A USER
router.put('/:id/follow', async(req, res) => {
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)

            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({ $push: {followers: req.body.userId}})
                await currentUser.updateOne({ $push: {following: req.params.id}})
                res.status(200).json({msg:"user has been followed"})
            }
            else{
                res.status(403).json({msg: "You already follow this user"})
            }
        } 
        catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json({msg: "You can't follow yourself"})
    }
})


// UNFOLLOW A USER
router.put('/:id/unfollow', async(req, res) => {
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)

            if(user.followers.includes(req.body.userId)){
                await user.updateOne({ $pull: {followers: req.body.userId}})
                await currentUser.updateOne({ $pull: {following: req.params.id}})
                res.status(200).json({msg:"user has been unfollowed"})
            }
            else{
                res.status(403).json({msg: "You don't this user"})
            }
        } 
        catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json({msg: "You can't unfollow yourself"})
    }
})

// GET ALL USERS

module.exports = router