const db = require("../lib/db");

async function createRating(user_id, product_id, rating, comment) {
  try {
    const hasPurchased = await db.query(
      `SELECT * FROM payment WHERE user_id = $1 AND product_id = $2`,
      [user_id, product_id]
    );

    if (hasPurchased.rows.length === 0) {
      return { error: "User has not purchased the product." };
    }

    const newRating = await db.query(
      "INSERT INTO ratings(user_id, product_id, rating, comment, created_at) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [user_id, product_id, rating, comment, new Date()]
    );

    const updatedProduct = await db.query(
      "UPDATE products SET product_rating = (SELECT ROUND(AVG(rating), 1) FROM ratings WHERE product_id = $1) WHERE product_id = $1 ",
      [product_id]
    );

    return {
      newRating: newRating.rows[0],
      updatedProduct: updatedProduct.rows[0],
    };
  } catch (error) {
    throw error;
  }
}

function getAllRating() {
  return db.query("SELECT * FROM ratings  ");
}

module.exports = { createRating, getAllRating };
