module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define("Categories", {
    country_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  //============================Relationship================================
  Categories.associate = (models) => {
    Categories.hasMany(models.Movies, { onDelete: "cascade" });
  };
  //============================Relationship================================
  return Categories;
};
