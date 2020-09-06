module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      src: {},
    },
    {
      // 한글 셋팅
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
  Image.associate = (db) => {};

  return Image;
};
