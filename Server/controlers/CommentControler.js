const comment = require("../models/comment");

const getComments = async (req, res) => {
  try {
    const result = await comment.getAllCOMMENT();
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const getCommentid = async (req, res) => {
  const comment_id = req.params.comment_id;
  try {
    const result = await comment.getCommentid(comment_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const CreateComment = async (req, res) => {
  try {
    const { user_id, product_id, content, created_at} = req.body;
    // const product_img = req?.file?.path ? req.file.path : "majdi";
    const result = await comment.CreateComment(
      user_id,
      product_id,
      content,
      created_at,
     
    );
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const SoftDelete = async (req, res) => {
  const comment_id = req.params.comment_id;
  try {
    const result = await comment.SoftDelete(comment_id);
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
const update = async (req, res) => {
  const comment_id = req.params.comment_id;
  const { user_id, product_id, content, created_at, is_deleted } = req.body;
  console.log(user_id, product_id, content, created_at, is_deleted, comment_id);

  try {
    const result = await comment.update(
      comment_id,
      user_id,
      product_id,
      content,
      created_at,
      is_deleted
    );
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
const getCommentsByUserAndProduct = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const comments = await comment.getCommentsByUserAndProduct(userId, productId);
    res.json(comments.rows);
  } catch (error) {
    console.error("Error in commentController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getComments,
  getCommentid,
  CreateComment,
  SoftDelete,
  update,
  getCommentsByUserAndProduct,
};
