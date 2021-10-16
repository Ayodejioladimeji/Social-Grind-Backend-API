const router = require("express").Router()
const Post = require('../models/Post')

// CREATE A POST
router.post('/', async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json({ msg: "Posts successfully posted", savedPost })
    }
    catch (err) {
        res.status(500).json(err)
    }
})


// UPDATE A POST
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        console.log(post)
        if(!post) return res.status(404).json({msg: "Post not found"})
        if (post.userId === req.body.userId) {
            await post.updateOne({$set:req.body})
            res.status(200).json({msg:"Post updated"})
        }
        else {
            res.status(403).json({ msg: "You can update only your post" })
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})


// DELETE A POST


// LIKE A POST


// GET A POST


// GET TIMELINE POST

module.exports = router