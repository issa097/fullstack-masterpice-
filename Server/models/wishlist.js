const db = require("../lib/db");

function AddWishlist(product_id, user_id) {
  const queryText = `INSERT INTO wishlist (product_id, user_id) VALUES ($1, $2) RETURNING *`;
  const result = [product_id, user_id];
  return db.query(queryText, result);
}

function getWishlist(user_id) {
  const queryText = `SELECT products.product_name, products.price, products.product_img FROM wishlist
    JOIN products ON wishlist.product_id = products.product_id
    WHERE wishlist.user_id = $1;`;
  const result = [user_id];
  return db.query(queryText, result);
}

module.exports = {
  AddWishlist,
  getWishlist,
};
