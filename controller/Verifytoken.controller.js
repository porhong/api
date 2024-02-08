const jwt = require("jsonwebtoken");

function VerifyAccessToken() {
  const jwtVerify = (req, res, next) => {
    const access_token = req.header(process.env.TOKEN_HEADER_KEY);
    jwt.verify(access_token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        if (err.message == "invalid token") {
          return res.json({
            success: 0,
            message: "Authentication failed by token invalid",
          });
        } else if (err.message == "jwt expired") {
          return res.json({
            success: 0,
            message: "Token Expired",
          });
        } else {
          return res.json({
            success: 0,
            message: "Authentication failed",
          });
        }
      } else {
        req.user = user;
        next();
      }
    });
  };
  return jwtVerify;
}

function VerifyRefreshToken(refreshToken) {
  const jwtVerify = (req, res, next) => {
    jwt.verify(
      refreshToken,
      process.env.JWT_SECRET_KEY_REFRESH_TOKEN,
      (err, user) => {
        if (err) {
          if (err.message == "invalid token") {
            return res.json({
              success: 0,
              message: "Authentication failed by token invalid",
            });
          } else if (err.message == "jwt expired") {
            return res.json({
              success: 0,
              message: "Token Expired",
            });
          } else {
            return res.json({
              success: 0,
              message: "Authentication failed",
            });
          }
        } else {
          req.user = user;
          next();
        }
      }
    );
  };
  return jwtVerify;
}

module.exports = { VerifyAccessToken, VerifyRefreshToken };
