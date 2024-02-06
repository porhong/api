const express = require("express");
const app = express();
const port = 3001;
const db = require("./models");
const userRouter = require("./routes/User.router");
const loginRouter = require("./routes/Login.router");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

try {
  app.use(express.json());
  app.use("/api/users", userRouter);
  app.use("/api/login", loginRouter);
} catch (e) {
  console.error("Error ⛔ : " + e);
}

try {
  //DB
  db.sequelize.sync().then(() => {
    app.listen(port, () => {
      console.log(`Server is running 🟢 : http://localhost:${port}`);
    });
  });
} catch (e) {
  console.error("Server is downing ⛔ :", e.message);
}
