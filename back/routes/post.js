const express = require('express');
const router = express.Router();

const { Post } = require('../models');

/* addPostAPI */
router.post('/', async (req, res) => {
  try {
    const post = await Post.create({
      content: req.body.content,
    });
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
  }
});

/* removePostAPI */
router.delete('/', (req, res) => {
  res.json({ id: 1 });
});

module.exports = router;
