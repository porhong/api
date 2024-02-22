const express = require("express");
const router = express.Router();
const {
  createGenre,
  getGenre,
  getAllGenres,
  editGenre,
  deleteGenre,
} = require("../controller/Genres.controller");

router.post("/", createGenre);
router.get("/", getAllGenres);
router.get("/:id", getGenre);
router.put("/:id", editGenre);
router.delete("/:id", deleteGenre);

module.exports = router;
