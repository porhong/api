const express = require("express");
const app = express();
const port = 3001;
const db = require("./models");
const userRouter = require("./routes/User.router");
const loginRouter = require("./routes/Login.router");
require("dotenv").config();

//====================================JWT token verify========================================
const {
  VerifyAccessToken,
  VerifyRefreshToken,
} = require("./controller/Verifytoken.controller");
//====================================JWT token verify========================================

//========================================Router==============================================
try {
  app.get("/", (req, res) => {
    res.send("Hello welcome!");
  });
  app.use(express.json());
  app.use("/api/users", VerifyAccessToken(), userRouter);
  app.use("/api/login", loginRouter);
} catch (e) {
  console.error("Error ⛔ : " + e);
}
//========================================Router==============================================

//========================================Start Service======================================
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
//========================================Start Service======================================
