const { Users } = require("../models");
require("dotenv").config();
const { genAccessToken, genRefreshToken } = require("./Token.controller");
const login = async (req, res) => {
  const userData = req.body;
  console.log(userData);
  if (userData != {}) {
    //Find User Object
    const userQurey = await Users.findOne({
      where: {
        user_name: userData.user_name,
        password: userData.password,
      },
      attributes: ["user_name", "password"],
    });
    //Verify User Object
    if (userQurey != null) {
      //Sign Token
      const accessToken = genAccessToken(userData);
      const refreshToken = genRefreshToken(userData);
      return res.json({
        success: 1,
        message: "User Valid",
        access_token: accessToken,
        refresh_token: refreshToken,
      });
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
