const { Movies } = require("../models");

//Create a new User
const createMovie = (req, res) => {
  const movieData = req.body;
  Movies.create(movieData)
    .then((result) => {
      return res.json({
        success: 1,
        message: "Record created successfully!",
      });
    })
    .catch((error) => {
      console.log("Error Code : " + error);
      return res.json({
        success: 0,
        message: "Can not create movie",
      });
    });
};

module.exports = { createMovie };
