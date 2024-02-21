module.exports = (sequelize, DataTypes) => {
  const Genres = sequelize.define("Genres", {
    genre_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  //============================Relationship================================
  Genres.associate = (models) => {
    Genres.hasMany(models.Movies, { onDelete: "cascade" });
  };
  //============================Relationship================================
  return Genres;
};
