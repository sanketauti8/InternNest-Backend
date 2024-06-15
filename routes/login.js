const router=require('express').Router();
const User=require('../models/user');

router.post("/",async(req,res)=>{


    const {email,password}=req.body;
    const resdata=await chatAppLogin(email,password);
    console.log("res",resdata);
    try {
       // console.log(email);
        //console.log(password);
       const data=await User.findOne({email});
       //console.log(data);
   
       if(password===data.password){
        //omkars chat app login response to set localstorage variable
        const combinedData = {
            ...resdata,
            userId: data._id, // Example of additional data
            userEmail: data.email,
            userFirstName: data.firstName,
            userLastName: data.lastName,
            // Add any other additional data you need
          };
          res.json({ msg: combinedData });
       }else{
           res.json({msg:"Login Failed! Wrong password.."});
       }
    } catch (error) {
        res.json({msg:"Wrong email!"});
    }
    

});


async function chatAppLogin(email,password){
    console.log("Inside chat app login");
    try {

        const response=await fetch('https://chat-backend-testing.onrender.com/api/user/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                'email':email,
                'password':password
            })
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error in chat app chat app response:', errorData);
            //throw new Error(`Error: ${response.statusText}`);
        }
         const responseData = await response.json();
         return responseData;
         console.log('Response from login chat app:', responseData);
        
    } catch (error) {
        console.error('Error in chat app function:', error.message);
        throw error;
    }


}



module.exports=router;