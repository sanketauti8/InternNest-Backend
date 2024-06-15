const router=require('express').Router();
const Post = require('../models/post');

router.get('/:createdBy',async(req,res)=>{
    
    try {
        const createdBy=req.params.createdBy; //here we are using userid(createdBy) to fetch the user posts 
        const data=await Post.find({createdBy});
        console.log(data);
        res.json(data);
    } catch (error) {
        return res.json({error:"Something went wrong."}); 
    }
  

});



module.exports=router;