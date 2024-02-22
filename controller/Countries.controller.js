const { Countries } = require("../models");

//Create a new User
const createCountry = (req, res) => {
  const countryData = req.body;
  Countries.create(countryData)
    .then((result) => {
      return res.json({
        status: 1,
        message: "Country created successfully",
      });
    })
    .catch((error) => {
      console.log("Error Code : " + error.original.code);
      if (error.original.code == "ER_DUP_ENTRY") {
        return res.json({
          status: 0,
          message: "Country already existed",
        });
      } else {
        return res.json({
          status: 0,
          message: "Can not create country",
        });
      }
    });
};

//Get User by User ID
const getCountry = async (req, res) => {
  await Countries.findAll({ where: { id: req.params.id } })
    .then((result) => {
      if (result.length == 0) {
        return res
          .status(404)
          .json({ status: 0, message: "Country not found" });
      } else {
        result = result[0];
        return res.json({
          status: 1,
          message: "Country retrieve successfully",
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
const getAllCountries = async (req, res) => {
  await Countries.findAll()
    .then((result) => {
      if (result.length == 0) {
        return res.json({ message: "Country not found" });
      } else {
        return res.json({
          status: 1,
          message: "Country retrieve successfully",
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
const editCountry = (req, res) => {
  const CountryData = req.body;
  Countries.update(CountryData, { where: { id: req.params.id } })
    .then((result) => {
      if (result[0] == 1) {
        return res.json({ status: 1, message: "Country updated successfully" });
      } else {
        return res.json({ status: 0, message: "Country not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.json({ status: 0, message: error });
    });
};

//Delete User By User ID
const deleteCountry = (req, res) => {
  Countries.destroy({ where: { id: req.params.id } })
    .then((result) => {
      if (result == [1]) {
        return res.json({ status: 1, message: "Country deleted successfully" });
      } else {
        return res.json({ status: 0, message: "Country not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.json({ status: 0, message: error });
    });
};

module.exports = {
  createCountry,
  getCountry,
  getAllCountries,
  editCountry,
  deleteCountry,
};
