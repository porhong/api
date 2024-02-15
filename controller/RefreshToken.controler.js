require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const { genAccessToken, genRefreshToken } = require("./Token.controller");
//Cookie Configuration
const cookieConfig = {
  httpOnly: true, // to disable accessing cookie via client side js
  //secure: true, // to force https (if you use it)
  maxAge: 86400, // ttl in seconds (remove this option and cookie will die when browser is closed)
  signed: true, // if you use the secret with cookieParser
};
//Check validation Refresh token
function VerifyRefreshToken(refreshToken) {
  let result = jwt.verify(
    refreshToken,
    process.env.JWT_SECRET_KEY_REFRESH_TOKEN,
    (err, user) => {
      if (err) {
        if (err.message == "invalid token") {
          return {
            success: 0,
            message: "Authentication failed by token invalid",
          };
        } else if (err.message == "jwt expired") {
          return {
            success: 0,
            message: "Refresh Token Expired",
          };
        } else {
          return {
            success: 0,
            message: "Authentication failed",
          };
        }
      } else {
        return {
          success: 1,
          message: "Successfully",
        };
      }
    }
  );
  return result;
}

//Regenerat Access Token
const refreshToken = (req, res) => {
  //const Token = req.body;
  const Token = req.signedCookies;
  if (Token.refreshToken !== undefined) {
    Users.findOne({
      where: { token: Token.refreshToken },
      attributes: ["user_name", "password"],
    })
      .then((result) => {
        if (result != null) {
          let resultToken = VerifyRefreshToken(Token.refreshToken);
          if (resultToken.success == 0) {
            return res.json({
              resultToken,
            });
          } else if (resultToken.success == 1) {
            let new_AccessToken = genAccessToken(result.dataValues);
            let new_RefreshToken = genRefreshToken(result.dataValues);
            //Update the refresh token
            res.clearCookie("refreshToken", { path: "/" });
            res.cookie("refreshToken", new_RefreshToken, cookieConfig);
            //===========================================================
            Users.update(
              { token: new_RefreshToken },
              {
                where: { token: Token.refreshToken },
              }
            );
            return res.json({
              success: 1,
              message: "New Token Generated Successfully",
              new_AccessToken,
              new_RefreshToken,
            });
          }
        } else {
          return res.json({
            success: 0,
            message: "Token Invalid",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.json({
          success: error,
          message: "Record Error!",
        });
      });
  } else {
    return res.json({
      success: 0,
      message: "Null Token",
    });
  }
};
module.exports = { refreshToken };
