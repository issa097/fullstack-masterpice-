const db = require("../lib/db");

function getAllBlog() {
  return db.query(
    "SELECT * FROM Blog WHERE is_deleted = false AND approved = false "
  );
}

function getBlog(blog_id) {
  const queryText =
    "SELECT * FROM Blog WHERE blog_id = $1 AND is_deleted = false";
  const value = [blog_id];
  return db.query(queryText, value);
}

function getBlogidUser(user_id) {
  const queryText = "SELECT * FROM Blog WHERE user_id = $1";
  const value = [user_id];
  return db.query(queryText, value);
}

function newblog(title, content, user_id, blog_img) {
  // console.log(title, content, user_id, created_at, blog_img);

  const queryText =
    "INSERT INTO Blog ( title, content, user_id, blog_img) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [title, content, user_id, blog_img];
  return db.query(queryText, values);
}

async function Deleteblog(blog_id) {
  const queryText =
    "UPDATE Blog SET is_deleted = true WHERE blog_id = $1 AND is_deleted = false RETURNING *";
  const values = [blog_id];

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
function updateblog(
  blog_id,
  title,
  content,
  user_id,
  created_at,
  blog_img,
  is_deleted
) {
  const queryText = `
      UPDATE Blog 
      SET 
      title = COALESCE($2, title), 
      content = COALESCE($3, content), 
      user_id = COALESCE($4, user_id), 
      created_at = COALESCE($5, created_at), 
      blog_img = COALESCE($6, blog_img), 
      is_deleted = COALESCE($7, is_deleted)
       
      WHERE 
        blog_id = $1 
      RETURNING *`;

  const values = [
    blog_id,
    title,
    content,
    user_id,
    created_at,
    blog_img,
    is_deleted,
  ];
  return db.query(queryText, values);
}

//DashBoard
function approved(blog_id) {
  const queryText = `SELECT * FROM Blog WHERE blog_id = $1 AND approved = true`;
  const result = [blog_id];

  return db.query(queryText, result);
}
//DashBoard
function approvedUpdate(blog_id) {
  const queryText = `UPDATE blog SET approved = false WHERE blog_id = $1 RETURNING *`;
  const result = [blog_id];

  return db.query(queryText, result);
}
function approvedReject(blog_id) {
  const queryText = `UPDATE blog SET approved = true WHERE blog_id = $1 RETURNING *`;
  const result = [blog_id];

  return db.query(queryText, result);
}

module.exports = {
  getAllBlog,
  getBlog,
  getBlogidUser,
  newblog,
  Deleteblog,
  updateblog,
  approvedUpdate,
  approved,
  approvedReject,
};
