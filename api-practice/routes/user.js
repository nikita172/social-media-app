const router = require('express').Router();
const User = require('../models/User')
const Post = require('../models/Post')

//update a user
router.put("/:id", async (req, res) => {
    if (req.params.id == req.body.userId || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (err) {
                res.status(500).json(err)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            res.status(200).json("user has been updated")
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        return res.status(403).json("You can update only your account!");
    }
})


//delete a user
router.delete("/:id", async (req, res) => {
    if (req.params.id == req.body.userId || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("account has been deleted successfully")
        }
        catch (err) {
            return res.status(500).json(err)
        }
    }
    else {
        return res.status(403).json("you can only delete your account")
    }
})
//get all users

router.get("/allUsers", (req, res) => {
    User.find().then(users => {
        res.json(users)
    }).catch(err => {
        res.status(500).json(err)
    })
})

//get a user

router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username })
        const { password, updatedAt, ...other } = user._doc
        res.json(other)
    }
    catch (err) {
        res.status(500).json(err)
    }
})


//follow a user

router.put("/:id/follow", async (req, res) => {
    if (req.params.id !== req.body.userId) {
        try {
            const user = await User.findById(req.params.id) //isko follow ho raha h
            const currentUser = await User.findById(req.body.userId) // ye follow kar raha hai

            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await currentUser.updateOne({ $push: { followings: req.params.id } })

                res.status(200).json("user has been followed")
            }
            else {
                res.status(403).json("already followed")
            }

        } catch (err) {
            res.status(500).json(err)
        }

    }
    else {
        res.status(403).json("you cannot follow yourself")
    }
})

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
    if (req.params.id !== req.body.userId) {
        try {
            const user = await User.findById(req.params.id) //isko unfollow ho raha h
            const currentUser = await User.findById(req.body.userId) // ye unfollow kar raha hai

            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } })
                await currentUser.updateOne({ $pull: { followings: req.params.id } })
                res.status(200).json("user has been unfollowed")
            }
            else {
                res.status(403).json("already unfollowed")
            }

        } catch (err) {
            res.status(500).json(err)
        }

    }
    else {
        res.status(403).json("you cannot unfollow yourself")
    }
})

module.exports = router;

