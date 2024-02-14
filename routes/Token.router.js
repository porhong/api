const express = require("express");
const router = express.Router();
const { refreshToken } = require("../controller/RefreshToken.controler");

router.post("/", refreshToken);

module.exports = router;
