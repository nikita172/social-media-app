const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://nikita:blahblah@cluster0.yatnxwf.mongodb.net/socialMediaDB?retryWrites=true&w=majority",(err)=>{
    console.log(err)
})