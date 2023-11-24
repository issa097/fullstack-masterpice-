const db = require("../lib/db");

function getAllCOMMENT() {
  return db.query("SELECT * FROM comments WHERE is_deleted = false");
}

function getCommentid(comment_id) {
  const queryText =
    "SELECT * FROM comments WHERE comment_id = $1 AND is_deleted = false";
  const value = [comment_id];
  return db.query(queryText, value);
}

function CreateComment(user_id, product_id, content, created_at) {
  const queryText =
    "INSERT INTO comments(user_id,product_id ,content,created_at) VALUES($1,$2,$3,$4)RETURNING*";
  const values = [user_id, product_id, content, created_at];
  return db.query(queryText, values);
}

function SoftDelete(comment_id) {
  const queryText =
    "UPDATE comments SET is_deleted = true WHERE comment_id = $1 AND is_deleted = false RETURNING *";
  const valuse = [comment_id];
  return db.query(queryText, valuse);
}

// function update(
//   comment_id,
//   user_id,
//   product_id,
//   content,
//   created_at,
//   is_deleted
// ) {
//   const queryText =
//     "UPDATE comments SET user_id = $2, product_id = $3, content = $4, created_at = $5, is_deleted = $6 WHERE comment_id = $1  RETURNING *";

//   const valuse = [
//     comment_id,
//     user_id,
//     product_id,
//     content,
//     created_at,
//     is_deleted,
//   ];
//   return db.query(queryText, valuse);
// }

function update(
  comment_id,
  user_id,
  product_id,
  content,
  created_at,
  is_deleted
) {
  const queryText = `
    UPDATE comments 
    SET 
      user_id = COALESCE($2, user_id),
      product_id = COALESCE($3, product_id),
      content = COALESCE($4, content),
      created_at = COALESCE($5, created_at),
      is_deleted = COALESCE($6, is_deleted)
    WHERE 
      comment_id = $1 
    RETURNING *`;

  const values = [
    comment_id,
    user_id,
    product_id,
    content,
    created_at,
    is_deleted,
  ];

  return db.query(queryText, values);
}

function getCommentsByUserAndProduct(userId, productId) {
  const queryText =
    "SELECT * FROM comments WHERE user_id = $1 AND product_id = $2";

  // "SELECT c.comment_text, u.username FROM comments c " +
  // "JOIN users u ON c.user_id = u.user_id " +
  // "WHERE c.user_id = $1 AND c.product_id = $2",
  const valuse = [userId, productId];

  return db.query(queryText, valuse);
}

module.exports = {
  getAllCOMMENT,
  getCommentid,
  CreateComment,
  SoftDelete,
  update,
  getCommentsByUserAndProduct,
};
