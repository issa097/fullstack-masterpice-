const express = require("express");
const router = express.Router();
const WishListController = require("../controlers/WishListController");
const authentication = require("../middlewares/authMiddleware");
const uploadImg = require("../middlewares/MulterMiddlewares");

router.post("/AddWishlist", authentication.authenticateToken, WishListController.AddWishlist);
router.get(
  "/getWishlist",
  authentication.authenticateToken,
  WishListController.getWishlist
);


module.exports = router;
