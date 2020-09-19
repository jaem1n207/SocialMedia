const express = require('express');

const { Post, User, Image, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      limit: 10, // 10개의 게시물을 가져온다.
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
        },
        {
          model: Image,
        },
        {
          model: Comment,
        },
      ],
    });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
