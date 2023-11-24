const db = require("../lib/db");

function getAllCategory() {
  return db.query("SELECT * FROM categories WHERE is_deleted = false");
}

function getcategoruid(category_id) {
  const queryText =
    "SELECT * FROM categories WHERE category_id = $1 AND is_deleted = false";
  const value = [category_id];
  return db.query(queryText, value);
}

function newCategory(category_name, img) {
  const queryText =
    "INSERT INTO categories (category_name , img) VALUES ($1,$2) RETURNING *";
  const values = [category_name, img];
  return db.query(queryText, values);
}

async function deletecategory(category_id) {
  const queryText =
    "UPDATE categories SET is_deleted = true WHERE category_id = $1 AND is_deleted = false RETURNING *";
  const values = [category_id];

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

// function updatecategory(category_id,category_name,is_deleted) {
//   const queryText =
//     "UPDATE categories SET category_name = $2 , is_deleted = $3 WHERE category_id = $1  RETURNING *";
//   const value = [category_id,category_name,is_deleted];
//   return db.query(queryText, value);
// }

function updatecategory(category_id, category_name, is_deleted) {
  const queryText = `
    UPDATE categories 
    SET 
      category_name = COALESCE($2, category_name),
      is_deleted = COALESCE($3, is_deleted)
    WHERE 
      category_id = $1 
    RETURNING *`;

  const values = [category_id, category_name, is_deleted];

  return db.query(queryText, values);
}

module.exports = {
  getAllCategory,
  newCategory,
  getcategoruid,
  deletecategory,
  updatecategory,
};
