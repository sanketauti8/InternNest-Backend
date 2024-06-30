const Post = require('../models/post');
const User = require('../models/user');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    //console.log("inside getallpost");
    
    // Fetch all posts
    const posts = await Post.find({});

    // Array to store combined data
    let combinedData = [];

    // Fetch user details for each post
    for (let post of posts) {
      // Find user based on createdBy field in Post
      const user = await User.findById(post.createdBy);

      // Check if user exists
      if (user) {
        const postData = {
          _id: post._id,
          profileImage: post.profileImage,
          description: post.description,
          createdBy: post.createdBy,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          // Add user details to the post data
          user_id:user._id,
          userEmail: user.email,
          userFirstName: user.firstName,
          userLastName: user.lastName,
          country: user.country,
          state: user.state,
          city: user.city,
          zip: user.zip,
        };
        combinedData.push(postData);
      }
    }

    // Respond with combined data
    res.json({ msg: combinedData });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
});




module.exports = router;

