const express = require("express");
const router = express.Router();
const {
  createCountry,
  getCountry,
  getAllCountries,
  editCountry,
  deleteCountry,
} = require("../controller/Countries.controller");

router.post("/", createCountry);
router.get("/", getAllCountries);
router.get("/:id", getCountry);
router.put("/:id", editCountry);
router.delete("/:id", deleteCountry);

module.exports = router;
