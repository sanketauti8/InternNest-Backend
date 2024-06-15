const router=require('express').Router();
const Post=require('../models/post');
const User = require('../models/user');  

router.post('/:id',async(req,res)=>{

    try {
    const {profileImage,description}=req.body;
    const userId = req.params.id;
        
    // Find the user by ID
    const user = await User.findById(userId);
    
    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }
    const post=await Post.create({
        profileImage,
        description,
        createdBy: user._id});
    res.status(201).json(post);

    } catch (error) {
         return res.json({error:"Something went wrong."}); 
    }

});



module.exports=router;