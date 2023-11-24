const ratingModel = require("../models/Rating");

async function addRating(req, res) {
  const { user_id, product_id, rating, comment } = req.body;

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

module.exports = { addRating ,getAllRating};
