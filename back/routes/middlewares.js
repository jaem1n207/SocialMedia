/* 로그인 여부 검사 */

exports.isLoggedIn = (req, res, next) => {
  // 로그인이 되어 있다면
  if (req.isAuthenticated()) {
    next(); // 다음 미들웨어로
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  // 로그인이 되어 있지 않다면
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
};
