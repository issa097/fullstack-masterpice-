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
// const jj = require("../middlewares/jj");

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

// authentication.authenticateToken,
router.get(
  "/gitRatings/:product_id",
  // authentication.authenticateToken,
  RatingController.getRatingByproduct
);
router.put(
  "/updateRating",
  authentication.authenticateToken,
  RatingController.updateproduct
);
router.put(
  "/updateRatingid/:rating_id",
  authentication.authenticateToken,
  RatingController.updateratingid
);

router.put(
  "/deleteRating/:rating_id",
  authentication.authenticateToken,
  RatingController.deleterating
);

module.exports = router;
