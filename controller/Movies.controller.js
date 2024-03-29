const { Movies } = require("../models");

//Create a new User
const createMovie = (req, res) => {
  const movieData = req.body;
  Movies.create(movieData)
    .then((result) => {
      return res.json({
        success: 1,
        message: "Movie created successfully",
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

//Get User by User ID
const getMovie = async (req, res) => {
  await Movies.findAll({ where: { id: req.params.id } })
    .then((result) => {
      if (result.length == 0) {
        return res.status(404).json({ status: 0, message: "Movie not found" });
      } else {
        result = result[0];
        return res.json({
          status: 1,
          message: "Movie retrieve successfully",
          result,
        });
      }
    })
    .catch((error) => {
      console.log("Error Code : " + error);
      return () => {
        res.json({
          ststus: 0,
          message: "Error : " + error.original.sqlMessage,
        }),
          res.status(500);
      };
    });
};

//Get All User
const getAllMovies = async (req, res) => {
  await Movies.findAll()
    .then((result) => {
      if (result.length == 0) {
        return res.json({ message: "Movie not found" });
      } else {
        return res.json({
          status: 1,
          message: "Movie retrieve successfully",
          result,
        });
      }
    })
    .catch((error) => {
      console.log("Error Code : " + error.original.code);
      return () => {
        res.json({
          status: 0,
          message: "Error : " + error.original.sqlMessage,
        }),
          res.status(500);
      };
    });
};

//Edit User By User ID
const editMovie = (req, res) => {
  const movieData = req.body;
  Movies.update(movieData, { where: { id: req.params.id } })
    .then((result) => {
      if (result[0] == 1) {
        return res.json({ status: 1, message: "Movie updated successfully" });
      } else {
        return res.json({ status: 0, message: "Movie not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.json({ status: 0, message: error });
    });
};

//Delete User By User ID
const deleteMovie = (req, res) => {
  Movies.destroy({ where: { id: req.params.id } })
    .then((result) => {
      if (result == [1]) {
        return res.json({ status: 1, message: "Movie deleted successfully" });
      } else {
        return res.json({ status: 0, message: "Movie not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.json({ status: 0, message: error });
    });
};

module.exports = {
  createMovie,
  getMovie,
  getAllMovies,
  editMovie,
  deleteMovie,
};
