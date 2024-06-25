
const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { postzip, postcity, poststate, postcountry } = req.query;

    // Create a search condition
    let searchCondition = {};

    if (postzip) {
      searchCondition['postzip'] = { $regex: postzip, $options: 'i' };
    }
    if (postcity) {
      searchCondition['postcity'] = { $regex: postcity, $options: 'i' };
    }
    if (poststate) {
      searchCondition['poststate'] = { $regex: poststate, $options: 'i' };
    }
    if (postcountry) {
      searchCondition['postcountry'] = { $regex: postcountry, $options: 'i' };
    }
    console.log("postzip",postzip);
    // Fetch posts matching the search condition
    const posts = await Post.find(searchCondition).populate('createdBy', 'email firstName lastName country state city zip');

    // Map the posts to include user details
    const combinedData = posts.map(post => ({
      _id: post._id,
      profileImage: post.profileImage,
      description: post.description,
      createdBy: post.createdBy._id,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      userEmail: post.createdBy.email,
      userFirstName: post.createdBy.firstName,
      userLastName: post.createdBy.lastName,
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
