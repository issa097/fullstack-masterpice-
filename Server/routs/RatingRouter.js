// const express = require("express");
// const router = express.Router();
// const RatingControler = require("../controlers/RatingControler");

// router.post("/NewRating", RatingControler.NewRating);

// module.exports = router;

// في ملف routes/ratingRoutes.js

const express = require("express");
const router = express.Router();
const RatingController = require("../controlers/RatingControler");
const authentication = require("../middlewares/authMiddleware");

// router.post('/create', RatingController.createRating);
// router.get('/read/:id', RatingController.getRatingsByProduct);
//   authentication.authenticateToken,
router.post(
  "/addRating",
  authentication.authenticateToken,
  RatingController.addRating
);
router.get("/gitRating", RatingController.getAllRating);
router.get(
  "/getRatingByUser",
  authentication.authenticateToken,
  RatingController.getRatingByUser
);
router.get(
  "/getRatingByUserAndProduct/:product_id",
  authentication.authenticateToken,

  RatingController.getRatingByUserAndProduct
);

module.exports = router;
