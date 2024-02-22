module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define("Categories", {
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  //============================Relationship================================
  Categories.associate = (models) => {
    Categories.hasMany(models.Movies, { onDelete: "cascade" });
  };
  //============================Relationship================================
  return Categories;
};
