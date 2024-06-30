const router = require('express').Router();
const User = require('../models/user');

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  
  try {
   const resdata = await chatAppLogin(email, password);
   console.log("res", resdata);
    
    const data = await User.findOne({ email });
    
    if (!data) {
      return res.json({ msg: "Wrong email!" });
    }

    if (password === data.password) {
       //Combine chat app response data with user data
      const combinedData = {
        ...resdata,
        userId: data._id,
        userEmail: data.email,
        userFirstName: data.firstName,
        userLastName: data.lastName,
      };
      res.json({ msg: combinedData });
      console.log("login",combinedData);
    } else {
      res.json({ msg: "Login Failed! Wrong password.." });
    }
  } catch (error) {
    console.error('Error during login process:', error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

async function chatAppLogin(email, password) {
  console.log("Inside chat app login");
  try {
    const response = await fetch('https://chat-backend-testing.onrender.com/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'password': password
      })
    });

    const responseData = await response.json();
    console.log("responseData", responseData);

    if (!response.ok) {
      console.error('Error in chat app response:', responseData);
      throw new Error('Invalid credentials');
    }

    return responseData;
  } catch (error) {
    console.error('Error in chat app function:', error.message);
    throw error;
  }
}

module.exports = router;


