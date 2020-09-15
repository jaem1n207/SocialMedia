const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const passport = require('passport');

const router = express.Router();

/* user login */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // 서버 에러
    if (err) {
      console.error(err);
      return next(err);
    }
    // 클라이언트 에러가 있을시
    if (info) {
      return res.status(401).send(info.reason);
    }
    // 성공 시
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      // 서버, 패스포트 로그인 성공 시
      return res.json(user);
    });
  })(req, res, next);
});

/* user Signup */
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
