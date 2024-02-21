const express = require("express");
const router = express.Router();
const { createMovie } = require("../controller/Movies.controller");

router.post("/", createMovie);

module.exports = router;
