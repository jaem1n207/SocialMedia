const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          /* 이메일 존재여부 확인 */
          const user = await User.findOne({
            where: { email },
          });
          if (!user) {
            return done(null, false, { reason: '존재하지 않는 이메일입니다.' }); // (서버에러, 성공여부, 클라이언트에러)
          }
          const result = await bcrypt.compare(password, user.password);
          // 비밀번호가 일치한다면
          if (result) {
            return done(null, user);
          }
          return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
        } catch (err) {
          console.err(err);
          return done(err);
        }
      }
    )
  );
};
