const { json } = require("sequelize");
const { Users } = require("../models");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const userData = req.body;
  console.log(userData);
  if (userData != {}) {
    const userQurey = await Users.findOne({
      where: { user_name: userData.user_name, password: userData.password },
    });
    console.log(userQurey.dataValues);
    if (userQurey.dataValues != {}) {
      const access_token = jwt.sign(userQurey, process.env.JWT_SECRET_KEY);
      return res.json({ access_token: access_token });
    } else {
      return res.json({
        success: 0,
        message: "User or password invalid",
      });
    }
  } else {
    return res.json({
      success: 0,
      message: "Username and password are required",
    });
  }
};
module.exports = { login };
