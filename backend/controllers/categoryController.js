const { category } = require("./../models");
const fs = require("fs");

// const generateTable = async (req, res) => {
//   User.sync({ alter: true });
//   res.send();
// };

const checkCategory = async (name = "") => {
  return await category.findOne({
    where: {
      category_name: name,
    },
  });
};

const getCategories = async (req, res) => {
  try {
    console.log("running");
    const { count, rows } = await category.findAndCountAll({
      //   limit: 2,
      //   offset: 1,
    });
    if (!rows) throw { message: "No Category Exist!", code: 400 };

    return res.status(200).send({
      success: true,
      message: "get user success",
      data: rows,
      pagination: {
        pageCount: Math.ceil(count / 2),
      },
    });
  } catch (error) {
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryy = await category.findByPk(req.params.id);

    if (!categoryy) throw { message: "category not found!", code: 400 };

    return res.status(200).send({
      success: true,
      message: "get category success",
      data: categoryy,
    });
  } catch (error) {
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    const category_image = req.file.filename;

    if (!category_name || !category_image)
      throw { message: "Fill all data", code: 400 };

    const isNameExist = await checkCategory(category_name);

    if (isNameExist) throw { message: "category is already exists", code: 400 };

    let newCategory = await category.create({
      category_name,
      category_image,
    });

    return res.status(201).send({
      success: true,
      message: "add Category Success!",
      data: newCategory,
    });
  } catch (error) {
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { category_name } = req.body;
    const category_image = req.file?.filename;
    console.log(id, category_name, category_image, "============>>");

    // let user = await User.findByPk(userId);

    if (user.role_id != 1) throw { message: "Unauthorize Request", code: 400 };

    const result = await category.findByPk(id);

    if (!result) throw { message: "category not found", code: 400 };

    //hapus image dari public
    console.log(user, id, result, "test");

    const nameValid = await category.findOne({
      where: {
        category_name: category_name ? category_name : "",
      },
    });

    if (nameValid) throw { message: "category already registered", code: 400 };

    if (category_image && result.category_image)
      fs.unlinkSync(`public/category_image/${result.category_image}`);

    const resultUpdate = await category.update(
      {
        category_name: category_name ? category_name : category.category_name,
        category_image: category_image
          ? category_image
          : category.category_image,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (!resultUpdate[0]) throw { message: "No Changes Detected", code: 400 };

    const newCategory = await category.findByPk(id);

    return res.status(200).send({
      success: true,
      message: "Update Category success",
      data: newCategory,
    });
  } catch (error) {
    // console.log(error);
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    console.log("masokkk");
    const { id } = req.params;
    // const { token } = req.

    const deleteCat = await category.destroy({
      where: {
        id: id,
      },
    });

    if (!deleteCat) throw { message: "category Not Found", code: 400 };

    return res.status(200).send({
      success: true,
      message: "delete category success",
      data: deleteCat,
    });
  } catch (error) {
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
