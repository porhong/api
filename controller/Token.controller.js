require("dotenv").config();
const jwt = require("jsonwebtoken");

function genAccessToken(userData) {
  let access_token = jwt.sign(userData, process.env.JWT_SECRET_KEY, {
    expiresIn: "60m",
  });
  return access_token;
}

function genRefreshToken(userData) {
  let refresh_token = jwt.sign(
    userData,
    process.env.JWT_SECRET_KEY_REFRESH_TOKEN,
    { expiresIn: "24h" }
  );
  return refresh_token;
}

module.exports = { genAccessToken, genRefreshToken };
