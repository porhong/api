const { Users } = require("../models");
require("dotenv").config();
const { genAccessToken, genRefreshToken } = require("./Token.controller");
var bcrypt = require("bcryptjs");
const cookieConfig = {
  httpOnly: true, // to disable accessing cookie via client side js
  //secure: true, // to force https (if you use it)
  maxAge: 1000000, // ttl in seconds (remove this option and cookie will die when browser is closed)
  signed: true, // if you use the secret with cookieParser
};

const login = async (req, res) => {
  const userData = req.body;

  if (userData != {}) {
    //hashing password
    var salt = bcrypt.genSaltSync(5);
    var hash = bcrypt.hashSync(userData.password, salt);
    userData.password = hash;
    //=====================================================
    //Find User Object
    console.log(userData);
    const userQurey = await Users.findOne({
      where: {
        user_name: userData.user_name,
        //password: userData.password,
      },
      attributes: ["user_name", "password"],
    });
    if (userQurey != null) {
      let check_pass = bcrypt.compareSync(
        userQurey.password,
        userData.password
      );
      if (check_pass == true) {
        //Sign Token
        const accessToken = genAccessToken(userData);
        const refreshToken = genRefreshToken(userData);
        //Create Cookie
        res.cookie("refreshToken", refreshToken, cookieConfig);
        //=====================================================
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
