const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  // user id만 따로 저장.
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    // 전달된 id를 통해 DB에서 찾고 User 정보 복구
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (err) {
      console.log(err);
      done(err);
    }
  });

  local();
};
