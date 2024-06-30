const User = require('../models/user');
const router=require('express').Router();


router.get('/:id',async(req,res)=>{
    try {
        const userId = req.params.id;       
        // console.log("Inside try block");
        // console.log(userId);
        const data= await User.findById(userId);
        //console.log(data);
        if (!data) {
            return res.status(404).json({ error: "User not found." });
        }
        res.json(data);

    } catch (error) {
        return res.json({error:"Something went wrong."}); 
    }
    
})

// router.get('/:userId', async (req, res) => {
//     try {
//       const user = await User.findById(req.params.userId);
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
//       res.json(user);
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       res.status(500).json({ error: 'Something went wrong' });
//     }
//   });
module.exports=router;