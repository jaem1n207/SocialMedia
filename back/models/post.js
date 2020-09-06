module.exports = (sequelize, DataTypes) => {
  // create posts table
  const Post = sequelize.define(
    'Post',
    {
      content: {},
    },
    {
      // 한글 + 이모티콘 셋팅
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  Post.associate = (db) => {};

  return Post;
};
