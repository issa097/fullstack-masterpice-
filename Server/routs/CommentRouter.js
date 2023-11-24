const express = require("express");

const router = express.Router();
const CommentController = require("../controlers/CommentControler");

router.get("/comments", CommentController.getComments);

router.get(
  "/user/:userId/product/:productId/comments",
  CommentController.getCommentsByUserAndProduct
);

router.get("/commentid/:comment_id", CommentController.getCommentid);

router.post("/CreateComment", CommentController.CreateComment);
router.put("/SoftDelete/:comment_id", CommentController.SoftDelete);
router.put("/update/:comment_id", CommentController.update);

module.exports = router;
