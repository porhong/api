const userModel = require("../models/Users.model");
const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  getAllUsers,
  editUser,
  deleteUser,
} = require("../controller/Users.controler");

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

module.exports = router;
