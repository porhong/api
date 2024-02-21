module.exports = (sequelize, DataTypes) => {
  const Movies = sequelize.define("Movies", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnail_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Movies;
};
