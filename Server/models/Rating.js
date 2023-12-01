const db = require("../lib/db");

// async function createRating(user_id, product_id, rating, comment) {
//   try {
//     const hasPurchased = await db.query(
//       `SELECT * FROM userpaymentbridge  WHERE payment_id = $1 AND user_id=$2 `,
//       [user_id, product_id]
//     );

//     if (hasPurchased.rows.length === 0) {
//       return { error: "User has not purchased the product." };
//     }

//     const newRating = await db.query(
//       "INSERT INTO ratings(user_id, product_id, rating, comment, created_at) VALUES($1, $2, $3, $4, $5) RETURNING *",
//       [user_id, product_id, rating, comment, new Date()]
//     );

//     const updatedProduct = await db.query(
//       "UPDATE products SET product_rating = (SELECT ROUND(AVG(rating), 1) FROM ratings WHERE product_id = $1) WHERE product_id = $1 ",
//       [product_id]
//     );

//     return {
//       newRating: newRating.rows[0],
//       updatedProduct: updatedProduct.rows[0],
//     };
//   } catch (error) {
//     throw error;
//   }
// }

async function createRating(user_id, product_id, rating, comment) {
  console.log(product_id);
  try {
    const hasPurchased = await db.query(
      `SELECT * FROM payment WHERE user_id = $1 AND $2 = ANY(product_id)`,
      [user_id, product_id]
    );

    if (hasPurchased?.rows?.length == 0) {
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
  return db.query("SELECT * FROM ratings");
}

function getRatingByUserAndProduct(user_id, product_id) {
  const queryText =
    "SELECT * FROM ratings WHERE user_id = $1 AND product_id = $2";

  // "SELECT c.comment_text, u.username FROM comments c " +
  // "JOIN users u ON c.user_id = u.user_id " +
  // "WHERE c.user_id = $1 AND c.product_id = $2",
  const valuse = [user_id, product_id];

  return db.query(queryText, valuse);
}
function getRatingByUser(user_id) {
  const queryText = "SELECT * FROM ratings WHERE user_id = $1 ";

  // "SELECT c.comment_text, u.username FROM comments c " +
  // "JOIN users u ON c.user_id = u.user_id " +
  // "WHERE c.user_id = $1 AND c.product_id = $2",
  const valuse = [user_id];

  return db.query(queryText, valuse);
}

function getRatingByproduct(product_id) {
  const queryText = "SELECT * FROM ratings WHERE product_id = $1 ";

  // "SELECT c.comment_text, u.username FROM comments c " +
  // "JOIN users u ON c.user_id = u.user_id " +
  // "WHERE c.user_id = $1 AND c.product_id = $2",
  const valuse = [product_id];

  return db.query(queryText, valuse);
}

function updateproducts(user_id, product_id, comment) {
  const queryText = `
    UPDATE ratings 
    SET 
      user_id = COALESCE($1, user_id), 
      product_id = COALESCE($2, product_id), 
      comment = COALESCE($3, comment)
    WHERE 
      user_id = $1 AND product_id = $2
    RETURNING *`;

  const values = [user_id, product_id, comment];
  return db.query(queryText, values);
}

async function deleteRating(product_id) {
  const queryText =
    "UPDATE ratings SET is_deleted = true WHERE product_id = $1 AND is_deleted = false RETURNING *";
  const values = [product_id];

  try {
    const result = await db.query(queryText, values);

    if (result.rowCount === 0) {
      throw new Error("Product not found or already deleted.");
    }

    return true; // Return true to indicate a successful deletion
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createRating,
  getAllRating,
  getRatingByUserAndProduct,
  getRatingByUser,
  getRatingByproduct,
  updateproducts,
  deleteRating
};
