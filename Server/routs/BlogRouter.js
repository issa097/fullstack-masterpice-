const express = require("express");
const router = express.Router();
const BlogController = require("../controlers/BlogController");

router.get("/getAllBlog", BlogController.getAllBlog);
router.get("/getBlog/:blog_id", BlogController.getBlog);
router.get("/getBlogidUser/:user_id", BlogController.getBlogidUser);

router.post("/newblog", BlogController.newblog);
router.put("/Deleteblog/:blog_id", BlogController.Deleteblog);
router.put("/updateblog/:blog_id", BlogController.updateblog);

router.get("/approvedblog/:blog_id", BlogController.approved);
router.put("/approvedUpdate/:blog_id", BlogController.approvedUpdate);
router.put("/approvedReject/:blog_id", BlogController.approvedReject);

module.exports = router;
