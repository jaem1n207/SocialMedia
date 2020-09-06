module.exports = (sequelize, DataTypes) => {
  // create users table
  const User = sequelize.define(
    'User',
    {
      email: {},
      nickname: {},
      password: {},
    },
    {
      // 한글 셋팅
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
  User.associate = (db) => {};
  return User;
};
