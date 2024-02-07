module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Users;
};
