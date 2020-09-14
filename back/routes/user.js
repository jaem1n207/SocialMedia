const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const router = express.Router();

/* Signup */
router.post('/', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      // 똑같은 email을 가진 user가 없다면 null값 할당
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send('ok');
  } catch (err) {
    console.error(err);
    next(err); // status 500
  }
});

module.exports = router;
