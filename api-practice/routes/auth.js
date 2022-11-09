const router= require('express').Router();
const User = require("../models/User")
const bcrypt= require('bcrypt')

//REGISTER
router.post("/register",async (req,res)=>{
    const salt =  await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        username:req.body.username,
        password:hashedPassword,
        email:req.body.email
    });
    user.save().then(()=>{
        res.json({
            message: "successfully registered",
            user

        })
    }).catch(err=>{
        res.status(500).json(err)
    })
})

//LOGIN 
router.post("/login",async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        !user && res.status(404).json("user not found")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password")

        res.status(200).json(user)
    }
    
    catch(err){}
})



module.exports = router;
