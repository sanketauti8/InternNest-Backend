const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { postzip } = req.query;

    // Create a search condition
    let searchCondition = {};

    if (postzip) {
      searchCondition['postzip'] = { $regex: postzip, $options: 'i' };
    }

    console.log("searchCondition", searchCondition);

    // Fetch posts matching the search condition
    const posts = await Post.find(searchCondition).populate('createdBy', 'email firstName lastName country state city zip');

    // Map the posts to include user details
    const combinedData = posts.map(post => ({
      _id: post._id,
      profileImage: post.profileImage,
      description: post.description,
      createdBy: post.createdBy ? post.createdBy._id : null,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      userEmail: post.createdBy ? post.createdBy.email : null,
      userFirstName: post.createdBy ? post.createdBy.firstName : null,
      userLastName: post.createdBy ? post.createdBy.lastName : null,
      country: post.postcountry,
      state: post.poststate,
      city: post.postcity,
      zip: post.postzip,
    }));

    // Respond with the search results
    res.json({ msg: combinedData });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;
