const express = require("express");
const app = express();
const port = 3001;
const db = require("./models");
//==========================Router Import======================================
const userRouter = require("./routes/User.router");
const loginRouter = require("./routes/Login.router");
const tokenRouter = require("./routes/Token.router");
const movieRouter = require("./routes/Movie.router");
const countryRouter = require("./routes/Country.router");
const genreRouter = require("./routes/Genre.router");
const categoryRouter = require("./routes/Category.router");
//==========================Router Import======================================
const cookieParser = require("cookie-parser");
require("dotenv").config();
// add cookieParser to express :
app.use(cookieParser(process.env.JWT_SECRET_KEY));

//====================================JWT token verify========================================
const { VerifyAccessToken } = require("./controller/Verifytoken.controller");
//====================================JWT token verify========================================

//========================================Router==============================================
try {
  app.get("/", (req, res) => {
    res.send("Hello welcome!");
  });
  app.use(express.json());
  app.use("/api/users", VerifyAccessToken(), userRouter);
  //====================Log In Route========================
  app.use("/api/login", loginRouter);
  //=============Tocken Route===================
  app.use("/api/token", tokenRouter);
  //=================Movie Route=======================
  app.use("/api/movie", VerifyAccessToken(), movieRouter);
  //=====================Country Route==========================
  app.use("/api/country", VerifyAccessToken(), countryRouter);
  //==========================Genre Route======================================
  app.use("/api/genre", VerifyAccessToken(), genreRouter);
  //==========================Category Route======================================
  app.use("/api/category", VerifyAccessToken(), categoryRouter);
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
