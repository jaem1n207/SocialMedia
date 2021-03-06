const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Post, Image, Comment } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        // 비밀번호를 제외한 모든 값들을 가져온다.
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
            // id만 가져오기
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
        ],
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* user login */
router.post('/login', isNotLoggedIn, (req, res, next) => {
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
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        // 비밀번호를 제외한 모든 값들을 가져온다.
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
        ],
      });
      // 서버, 패스포트 로그인 성공 시
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

/* user logout */
router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

/* user Signup */
router.post('/', isNotLoggedIn, async (req, res, next) => {
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

/* Modify userName */
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* Get Follower List */
router.get('/followers', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send('존재하지 않는 유저입니다.');
    }
    const followers = await user.getFollowers({
      limit: parseInt(req.query.limit, 10),
    });
    console.log('followers: ', followers);
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/* Get Followings List */
router.get('/followings', isLoggedIn, async (req, res, next) => {
  try {
    console.log('followings id: ', req.user.id);
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send('존재하지 않는 유저입니다.');
    }
    const followings = await user.getFollowings({
      limit: parseInt(req.query.limit, 10),
    });
    console.log('followings: ', followings);
    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/* User Follow */
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
    });
    if (!user) {
      res.status(403).send('존재하지 않는 유저는 팔로우할 수 없습니다.');
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* User Follow Cancel */
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
    });
    if (!user) {
      res.status(403).send('존재하지 않는 유저는 언팔로우할 수 없습니다.');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* Remove Follower */
router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send('존재하지 않는 유저를 차단하실 수 없습니다.');
    }
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
