const router=require('express').Router();
const { json } = require('express');
const User=require('../models/user');


router.post('/',async(req,res)=>{
    try {
       // console.log(req.body);
        const {firstName,lastName,email,password,contact,address,country,state,city,zip}=req.body;
          // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Duplicate email: this email is already registered." });
    }
        chatApp(firstName,email,password);
        const user= await User.create({firstName,lastName,email,password,contact,address,country,state,city,zip});
        //res.status(201).json({msg:"User created successfully!"});
        return res.json(user);
    } catch (error) {
        return res.json({error:"Something went wrong."});  
    }
   

});

async function chatApp(name,email,password){
    console.log("Inside chat app function");
    try {
        const response=await fetch('https://chat-backend-testing.onrender.com/api/user',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                'name':name,
                'email':email,
                'password':password
            })
        });
        //console.log(response);
        // if (!response.ok) {
        //     const errorData = await response.json();
        //     console.error('Error in chat app response:', errorData);
        //     //throw new Error(`Error: ${response.statusText}`);
        // }
       // const responseData = await response.json();
        //console.log('Response from chat app:', responseData);
    } catch (error) {
        console.error('Error in chat app function:', error.message);
        throw error;
    }
}

module.exports=router;