const express = require("express");
const router = express.Router();
const cartController = require("../controlers/CartController");
const authentication = require("../middlewares/authMiddleware");
const uploadImg = require("../middlewares/MulterMiddlewares");

router.post("/items", authentication.authenticateToken, cartController.additem);
router.get(
  "/getitems",
  authentication.authenticateToken,
  cartController.GetItem
);


module.exports = router;
