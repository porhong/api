const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  getAllUsers,
  editUser,
  deleteUser,
} = require("../controller/Users.controler");
const { VerifyAccessToken } = require("../controller/Verifytoken.controller");

router.post("/", VerifyAccessToken(), createUser);
router.get("/", VerifyAccessToken(), getAllUsers);
router.get("/:id", VerifyAccessToken(), getUser);
router.put("/:id", VerifyAccessToken(), editUser);
router.delete("/:id", VerifyAccessToken(), deleteUser);

module.exports = router;
