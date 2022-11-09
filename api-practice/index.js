require("./database/connection")
const mongoose = require('mongoose')
const express= require('express')
const router = express.Router();
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const userRoute = require("./routes/user")

const helmet = require("helmet")

const app = express();

app.use(express.json())
app.use(helmet());

app.use("/api/auth", authRoute );
app.use("/api/posts" , postRoute)
app.use("/api/user", userRoute)

app.listen(8080,()=>{
    console.log("app is listening to port 8080")
})

