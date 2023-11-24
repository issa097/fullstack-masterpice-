// const express = require("express");
// const router = express.Router();
// const RatingControler = require("../controlers/RatingControler");

// router.post("/NewRating", RatingControler.NewRating);

// module.exports = router;

// في ملف routes/ratingRoutes.js

const express = require("express");
const router = express.Router();
const RatingController = require("../controlers/RatingControler");

// router.post('/create', RatingController.createRating);
// router.get('/read/:id', RatingController.getRatingsByProduct);
router.post("/addRating", RatingController.addRating);
router.get("/gitRating", RatingController.getAllRating);

module.exports = router;
