const category = require("../models/category");

const getCategory = async (req, res) => {
  try {
    const results = await category.getAllCategory();
    console.log(results);
    return res.status(200).json(results.rows);
  } catch (error) {
    throw error;
  }
};

const getcategoruid = async (req, res) => {
  const category_id = req.params.category_id;
  try {
    const result = await category.getcategoruid(category_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const newCategory = async (req, res) => {
  try {
    const { category_name, img } = req.body;
    //   const product_img = req?.file?.path ? req.file.path : "majdi";
    // console.log(
    //   product_name,
    //   category_id,
    //   price,
    //   user_id,
    //   product_img,
    //   product_dis
    // );
    const newCategory = await category.newCategory(category_name, img);

    return res.status(200).json(newCategory.rows);
  } catch (error) {
    return res.status(500).json("internal server error");
  }
};

const deletecategory = async (req, res) => {
  const category_id = req.params.category_id;
  try {
    const result = await category.deletecategory(category_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const updatecategory = async (req, res) => {
  const category_id = req.params.category_id;
  const { category_name, is_deleted } = req.body;
  try {
    const result = await category.updatecategory(
      category_id,
      category_name,
      is_deleted
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCategory,
  newCategory,
  getcategoruid,
  deletecategory,
  updatecategory,
};
