const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"       
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    },
},
{ timestamps: true }
)
module.exports = mongoose.model("Post",postSchema)