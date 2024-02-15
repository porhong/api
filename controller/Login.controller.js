const { Users } = require("../models");
require("dotenv").config();
const { genAccessToken, genRefreshToken } = require("./Token.controller");
var bcrypt = require("bcryptjs");
const cookieConfig = {
  httpOnly: true, // to disable accessing cookie via client side js
  //secure: true, // to force https (if you use it)
  maxAge: 86400, // ttl in seconds (remove this option and cookie will die when browser is closed)
  signed: true, // if you use the secret with cookieParser
};

const login = async (req, res) => {
  const userData = req.body;

  if (userData != {}) {
    //Find User Object
    const userQurey = await Users.findOne({
      where: {
        user_name: userData.user_name,
        //password: userData.password,
      },
      attributes: ["user_name", "password"],
    });

    if (userQurey != null) {
      let input_password = userData.password;
      let hash_password = userQurey.password;
      let check_pass = await bcrypt
        .compare(input_password, hash_password)
        .then(function (result) {
          return result;
        });

      if (check_pass) {
        //Sign Token
        const accessToken = genAccessToken(userData);
        const refreshToken = genRefreshToken(userData);
        //Create Cookie
        res.clearCookie("refreshToken", { path: "/" });
        res.cookie("refreshToken", refreshToken, cookieConfig);
        //=====================================================
        //Update Token on DB
        Users.update(
          { token: refreshToken },
          {
            where: { user_name: userData.user_name },
          }
        );
        //=====================================================
        return res.json({
          success: 1,
          message: "Login Success",
          accessToken,
          refreshToken,
        });
      } else {
        return res.json({ success: 0, message: "Incorrect password" });
      }
    } else {
      return res.json({ success: 0, message: "User or password invalid" });
    }
  } else {
    return res.json({
      success: 0,
      message: "Username and password are required",
    });
  }
};
module.exports = { login };
