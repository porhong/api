require("dotenv").config();
const jwt = require("jsonwebtoken");

function genAccessToken(userData) {
  let access_token = jwt.sign(userData, process.env.JWT_SECRET_KEY, {
    expiresIn: "50s",
  });
  return access_token;
}

function genRefreshToken(userData) {
  let refresh_token = jwt.sign(
    userData,
    process.env.JWT_SECRET_KEY_REFRESH_TOKEN
  );
  return refresh_token;
}

module.exports = { genAccessToken, genRefreshToken };
