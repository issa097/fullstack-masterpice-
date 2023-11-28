const ratingModel = require("../models/Rating");

async function addRating(req, res) {
  const  user_id = req.user
  console.log(user_id)
  const {product_id, rating, comment } = req.body;

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
    const user_id=req.user
    const {  product_id } = req.params;
  
    try {
      const comments = await ratingModel.getRatingByUserAndProduct( user_id, product_id);
      return res.status(200).json(comments.rows);
      
    } catch (error) {
      console.error("Error in commentController:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  const getRatingByUser = async (req, res) => {
    const user_id=req.user
    // const {  product_id } = req.params;
  
    try {
      const comments = await ratingModel.getRatingByUser(user_id);
      return res.status(200).json(comments.rows);
      
    } catch (error) {
      console.error("Error in commentController:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
module.exports = { addRating ,getAllRating,getRatingByUserAndProduct,getRatingByUser};
