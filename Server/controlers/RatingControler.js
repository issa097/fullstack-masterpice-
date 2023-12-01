const ratingModel = require("../models/Rating");

async function addRating(req, res) {
  const user_id = req.user;

  const { product_id, rating, comment } = req.body;

  try {
    const { newRating, updatedProduct, error } = await ratingModel.createRating(
      user_id,
      product_id,
      rating,
      comment
    );

    if (error) {
      return res.status(400).json({ error });
    }

    res.json({
      message: "Rating added successfully",
      newRating,
      updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const getAllRating = async (req, res) => {
  try {
    console.log("issa");
    const result = await ratingModel.getAllRating();
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const getRatingByUserAndProduct = async (req, res) => {
  const user_id = req.user;
  const { product_id } = req.params;

  try {
    const comments = await ratingModel.getRatingByUserAndProduct(
      user_id,
      product_id
    );
    return res.status(200).json(comments.rows);
  } catch (error) {
    console.error("Error in commentController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getRatingByUser = async (req, res) => {
  const user_id = req.user;
  // const {  product_id } = req.params;

  try {
    const comments = await ratingModel.getRatingByUser(user_id);
    return res.status(200).json(comments.rows);
  } catch (error) {
    console.error("Error in commentController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRatingByproduct = async (req, res) => {
    // const user_id = req.user;
    // const user_id=req.user
  const { product_id } = req.params;

  try {
    const comments = await ratingModel.getRatingByproduct(product_id);
    const comment = comments.rows;
    console.log(req.user);
    return res.status(200).json( comment );
  } catch (error) {
    console.error("Error in commentController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateproducts = async (req, res) => {
  // const product_img = res.locals.site;
  // const imagePath = req.file.path; // This assumes the Multer middleware is used
  // console.log("product_img😜");
  // console.log(product_img);
  // console.log("product_img😜");
  const user_id = req.user;
  console.log("000000", user_id);
  const { product_id, comment } = req.body;
  console.log(product_id);
  console.log(comment);
  try {
    const result = await ratingModel.updateproducts(
      user_id,
      product_id,
      comment
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteRating = async (req, res) => {

  const user_id = req.user;
  
  const { product_id } = req.body;
  
  try {
    const result = await ratingModel.deleteRating(
      user_id,
      product_id,
      
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = {
  addRating,
  getAllRating,
  getRatingByUserAndProduct,
  getRatingByUser,
  getRatingByproduct,
  updateproducts,
  deleteRating
};
