module.exports = (sequelize, DataTypes) => {
  const Countries = sequelize.define("Countries", {
    country_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  //============================Relationship================================
  Countries.associate = (models) => {
    Countries.hasMany(models.Movies, { onDelete: "cascade" });
  };
  //============================Relationship================================
  return Countries;
};
