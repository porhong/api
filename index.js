const express = require("express");
const app = express();
const port = 3001;
const db = require("./models");
const userRouter = require("./routes/User.router");
const loginRouter = require("./routes/Login.router");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
  genAccessToken,
  genRefreshToken,
} = require("./controller/Token.controller");

//====================================JWT token verify========================================

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

//====================================JWT token verify========================================

//========================================Router==============================================
try {
  app.get("/", (req, res) => {
    res.send("Hello welcome!");
  });
  app.use(express.json());
  app.use("/api/users", jwtVerify, userRouter);
  app.use("/api/login", loginRouter);
} catch (e) {
  console.error("Error ⛔ : " + e);
}
//========================================Router==============================================

//========================================Starrt Service======================================
try {
  //DB
  db.sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => {
      console.log(`Server is running 🟢 : http://localhost:${port}`);
    });
  });
} catch (e) {
  console.error("Server is downing ⛔ :", e.message);
}
//========================================Starrt Service======================================
