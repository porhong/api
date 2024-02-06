const userModel = require("../models/Users.model");
const express = require("express");
const router = express.Router();
const { login } = require("../controller/Login.controller");

router.post("/", login);

module.exports = router;
