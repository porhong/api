const { Genres } = require("../models");

//Create a new User
const createGenre = (req, res) => {
  const GenreData = req.body;
  Genres.create(GenreData)
    .then((result) => {
      return res.json({
        success: 1,
        message: "Genre created successfully",
      });
    })
    .catch((error) => {
      console.log("Error Code : " + error.original.code);
      if (error.original.code == "ER_DUP_ENTRY") {
        return res.json({
          status: 0,
          message: "Genre already existed",
        });
      } else {
        return res.json({
          success: 0,
          message: "Can not create genre",
        });
      }
    });
};

//Get User by User ID
const getGenre = async (req, res) => {
  await Genres.findAll({ where: { id: req.params.id } })
    .then((result) => {
      if (result.length == 0) {
        return res.status(404).json({ status: 0, message: "Genre not found" });
      } else {
        result = result[0];
        return res.json({
          status: 1,
          message: "Genre retrieve successfully",
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
const getAllGenres = async (req, res) => {
  await Genres.findAll()
    .then((result) => {
      if (result.length == 0) {
        return res.json({ message: "Genre not found" });
      } else {
        return res.json({
          status: 1,
          message: "Genre retrieve successfully",
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
const editGenre = (req, res) => {
  const GenreData = req.body;
  Genres.update(GenreData, { where: { id: req.params.id } })
    .then((result) => {
      if (result[0] == 1) {
        return res.json({ status: 1, message: "Genre updated successfully" });
      } else {
        return res.json({ status: 0, message: "Genre not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.json({ status: 0, message: error });
    });
};

//Delete User By User ID
const deleteGenre = (req, res) => {
  Genres.destroy({ where: { id: req.params.id } })
    .then((result) => {
      if (result == [1]) {
        return res.json({ status: 1, message: "Genre deleted successfully" });
      } else {
        return res.json({ status: 0, message: "Genre not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.json({ status: 0, message: error });
    });
};

module.exports = {
  createGenre,
  getGenre,
  getAllGenres,
  editGenre,
  deleteGenre,
};
