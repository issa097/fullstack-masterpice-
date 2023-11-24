const express = require("express");

const router = express.Router();
const workshop_bookingsController = require("../controlers/workshop_bookingsController");
const { upload } = require("../middlewares/MulterMiddlewares");

router.get(
  "/getworkshop_bookings",
  workshop_bookingsController.getworkshop_bookings
);
router.get(
  "/getworkshop_bookingsId/:id",
  workshop_bookingsController.getworkshop_bookingsId
);
router.get(
  "/getworkshop_bookingsByWorkShopid/:workshop_id",
  workshop_bookingsController.workshop
);

router.post(
  "/Newworkshop_bookings",
  workshop_bookingsController.Newworkshop_bookings
);

router.put(
  "/deleteworkshop_bookings/:id",
  workshop_bookingsController.deleteworkshop_bookings
);
router.put(
  "/updateworkshop_bookings/:id",
  workshop_bookingsController.updateworkshop_bookings
);

module.exports = router;
