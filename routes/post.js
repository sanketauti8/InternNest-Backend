


const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
const Post = require('../models/post');
const User = require('../models/user');

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    fs.mkdir(uploadDir, { recursive: true })
      .then(() => cb(null, uploadDir))
      .catch((err) => cb(err));
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/[-T:\.Z]/g, '') + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// POST route to create a new post
router.post('/:id', upload.single('profileImage'), async (req, res) => {
  try {
    console.log("Inside create post");
    const { description, postzip, postcity, poststate, postcountry } = req.body;
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Get the path to the uploaded file (if provided)
    const profileImage = req.file ? req.file.path : '/myserver.jpg';

    const post = await Post.create({
      profileImage,
      description,
      postzip,
      postcity,
      poststate,
      postcountry,
      createdBy: user._id,
    });

    res.status(201).json(post);
    console.log(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

module.exports = router;
