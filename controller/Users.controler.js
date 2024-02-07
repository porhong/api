const { Users } = require("../models");

//Create a new User
const createUser = (req, res) => {
  const userData = req.body;
  Users.create(userData)
    .then((result) => {
      return res.json({
        success: 1,
        message: "Record created successfully!",
      });
    })
    .catch((error) => {
      console.log("Error Code : " + error.original.code);
      return res.json({
        success: 0,
        message: "Can not create user",
      });
    });
};

//Get User by User ID
const getUser = async (req, res) => {
  await Users.findAll({ where: { id: req.params.id } })
    .then((result) => {
      if (result.length == 0) {
        return res
          .status(404)
          .json({ success: 0, message: "Record not found" });
      } else {
        return res.json({
          result,
        });
      }
    })
    .catch((error) => {
      console.log("Error Code : " + error.original.code);
      return () => {
        res.json({
          message: "Error : " + error.original.sqlMessage,
        }),
          res.status(500);
      };
    });
};
//Get All User
const getAllUsers = async (req, res) => {
  await Users.findAll()
    .then((result) => {
      if (result.length == 0) {
        return res.json({ message: "Record not found" });
      } else {
        return res.json({
          result,
        });
      }
    })
    .catch((error) => {
      console.log("Error Code : " + error.original.code);
      return () => {
        res.json({
          message: "Error : " + error.original.sqlMessage,
        }),
          res.status(500);
      };
    });
};
//Edit User By User ID
const editUser = (req, res) => {
  const userData = req.body;
  Users.update(userData, { where: { id: req.params.id } })
    .then((result) => {
      console.log(result);
      if (result[0] == 1) {
        return res.json({ success: 1, message: "User updated successfully." });
      } else {
        return res.json({ success: 0, message: "User not found." });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.json({ success: 0, message: error });
    });
};
//Delete User By User ID
const deleteUser = (req, res) => {
  Users.destroy({ where: { id: req.params.id } })
    .then((result) => {
      if (result == [1]) {
        return res.json({ success: 1, message: "User deleted successfully." });
      } else {
        return res.json({ success: 0, message: "User not found." });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.json({ success: 0, message: error });
    });
};

module.exports = { createUser, getUser, getAllUsers, editUser, deleteUser };
