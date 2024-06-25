const express=require('express');
const app=express();
const cors = require('cors');
const mongo=require('mongoose');
const User=require('./models/user');
require("dotenv").config();
app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 9000;

mongo.connect(process.env.MONGO_URL).then((e)=>console.log("MongoDB Connected!"));

app.use('/signup',require('./routes/signup'));
app.use('/post',require('./routes/post'));
app.use('/login',require('./routes/login'));
app.use('/profile',require('./routes/profile'));
app.use('/getallpost',require('./routes/getAllPost'));
app.use('/getuserpost',require('./routes/getuserPost'));
app.use('/search',require('./routes/search'));
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));