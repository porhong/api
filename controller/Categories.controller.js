const { Categories } = require("../models");

//Create a new User
const createCategory = (req, res) => {
  const CategoryData = req.body;
  Categories.create(CategoryData)
    .then((result) => {
      return res.json({
        status: 1,
        message: "Category created successfully",
      });
    })
    .catch((error) => {
      console.log("Error Code : " + error.original.code);
      if (error.original.code == "ER_DUP_ENTRY") {
        return res.json({
          status: 0,
          message: "Category already existed",
        });
      } else {
        return res.json({
          status: 0,
          message: "Can not create category",
        });
      }
    });
};

//Get User by User ID
const getCategory = async (req, res) => {
  await Categories.findAll({ where: { id: req.params.id } })
    .then((result) => {
      if (result.length == 0) {
        return res
          .status(404)
          .json({ status: 0, message: "Category not found" });
      } else {
        result = result[0];
        return res.json({
          status: 1,
          message: "Category retrieve successfully",
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
const getAllCategories = async (req, res) => {
  await Categories.findAll()
    .then((result) => {
      if (result.length == 0) {
        return res.json({ message: "Category not found" });
      } else {
        return res.json({
          status: 1,
          message: "Category retrieve successfully",
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
const editCategory = (req, res) => {
  const CategoryData = req.body;
  Categories.update(CategoryData, { where: { id: req.params.id } })
    .then((result) => {
      if (result[0] == 1) {
        return res.json({
          status: 1,
          message: "Category updated successfully",
        });
      } else {
        return res.json({ status: 0, message: "Category not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.json({ status: 0, message: error });
    });
};

//Delete User By User ID
const deleteCategory = (req, res) => {
  Categories.destroy({ where: { id: req.params.id } })
    .then((result) => {
      if (result == [1]) {
        return res.json({
          status: 1,
          message: "Category deleted successfully",
        });
      } else {
        return res.json({ status: 0, message: "Category not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.json({ status: 0, message: error });
    });
};

module.exports = {
  createCategory,
  getCategory,
  getAllCategories,
  editCategory,
  deleteCategory,
};
