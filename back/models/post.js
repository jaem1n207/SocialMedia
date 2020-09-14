module.exports = (sequelize, DataTypes) => {
  // create posts table
  const Post = sequelize.define(
    'Post',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // ShareId
    },
    {
      // 한글 + 이모티콘 셋팅
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 1:1
    db.Post.belongsToMany(db.Hashtag, {
      through: 'PostHashtag',
    }); // n:m
    db.Post.hasMany(db.Comment); // 1:n
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, {
      through: 'Like',
      as: 'Likers', // Post 좋아요 누른 사람들
    });
    db.Post.belongsTo(db.Post, { as: 'Share' });
  };

  return Post;
};
