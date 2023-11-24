const express = require("express");

const router = express.Router();
const ProductsController = require("../controlers/ProductsControler");
const uploadImg = require("../middlewares/MulterMiddlewares");
// const updateImg = require("../middlewares/update");
const decode = require("../middlewares/auth");

router.post("/product", uploadImg.uploadImg, ProductsController.newblog);

// router.get("/products/:page/:limit", ProductsController.getBlogs);
router.get("/products", ProductsController.getBlogs);
router.get("/blog/:id", ProductsController.getblog);
router.get("/product/:category_id", ProductsController.product);
// GET /blogs?page=2&pageSize=5

router.put("/deleteproduct/:id", ProductsController.deleteproduct);
router.put(
  "/updateproduct/:id",
  uploadImg.uploadImg,
  ProductsController.updateproduct
);

module.exports = router;
