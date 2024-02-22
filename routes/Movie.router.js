const express = require("express");
const router = express.Router();
const {
  createMovie,
  getMovie,
  getAllMovies,
  editMovie,
  deleteMovie,
} = require("../controller/Movies.controller");

router.post("/", createMovie);
router.get("/", getAllMovies);
router.get("/:id", getMovie);
router.put("/:id", editMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
