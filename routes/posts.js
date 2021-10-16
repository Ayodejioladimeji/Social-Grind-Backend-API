const router = require("express").Router()
const Post = require('../models/Post')

// CREATE A POST
router.post('/', async (req, res) => {
    const newPost = new Post(req.body) 
    try{
        const savedPost = await newPost.save()
        res.status(200).json({msg: "Posts successfully posted", savedPost})
    }
    catch(err){
        res.status(500).json(err)
    }
})


// UPDATE A POST


// DELETE A POST


// LIKE A POST


// GET A POST


// GET TIMELINE POST

module.exports = router