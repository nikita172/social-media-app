const router = require("express").Router();
const mongoose = require('mongoose')
const Post = require("../models/Post")
const User = require("../models/User")


//create a post
router.post("/", (req, res) => {
    const newPost = new Post(req.body);
    newPost.save().then(() => {
        res.json({
            message: "post has been added !"
        })
    }).catch(err => {
        res.status(500).json(err)
    })
})

// update a posts

router.put("/:id", async (req, res) => {

    const userId = req.body.userId


    try {
        const post = await Post.findById(req.params.id);
        if (post.userId == userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json({ message: "post has been updated" })
        }
        else {
            res.status(403).json({ message: "you can only update your post" })
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})


// delete a posts

router.delete("/:id", async (req, res) => {
    const userId = req.body.userId
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId == userId) {
            await post.deleteOne()
            res.status(200).json({ message: "post has been deleted" })
        }
        else {
            res.status(403).json({ message: "you can only delete your post" })
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//like and dislike a post

router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (! post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })
            res.status(200).json("the post has been liked")
        }
        else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            res.status(200).json("the post has been disliked")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})


//get timeline posts
router.get("/timeline/:userId",async(req,res)=>{
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId:currentUser._id});

        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
                return Post.find({userId:friendId})
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts))


    }
    catch (err) {
        res.status(500).json(err);
      }
})
//get all posts
router.get("/", (req, res) => {

    Post.find().populate("userId").then((posts) => {
        res.json(posts)
    }).catch(err => {
        res.status(500).json(err)
    })
})

//get a post
router.get("/:id", (req, res) => {
    const { id } = req.params;
    Post.find({ _id: id }).then((posts) => {
        res.json(posts)
    }).catch(err => {
        res.status(500).json(err)
    })
})


//get users all post
router.get("/profile/:username", async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username: username })
        const post = await Post.find({ userId: user._id })
        if (post.length === 0) {
            res.status(200).json({ message: "no posts!" });
        }
        else {
            res.status(200).json(post)
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;