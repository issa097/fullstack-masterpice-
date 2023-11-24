const workshop_bookings = require("../models/workshop_bookings");

const getworkshop_bookings = async (req, res) => {
  try {
    const result = await workshop_bookings.getworkshop_bookings();
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
const getworkshop_bookingsId = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await workshop_bookings.getworkshop_bookingsId(id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const Newworkshop_bookings = async (req, res) => {
  try {
    const { user_id, workshop_id, booking_date, booking_time } = req.body;
    //   const product_img = req?.file?.path ? req.file.path : "majdi";
    console.log(user_id, workshop_id, booking_date, booking_time);
    const newblog = await workshop_bookings.Newworkshop_bookings(
      user_id,
      workshop_id,
      booking_date,
      booking_time
    );

    return res.status(200).json(newblog.rows);
  } catch (error) {
    return res.status(500).json("internal server error");
  }
};

const deleteworkshop_bookings = async (req, res) => {
  const id = req.params.id;
  // const userid = req.user.user_id
  try {
    const result = await workshop_bookings.deleteworkshop_bookings(id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const updateworkshop_bookings = async (req, res) => {
    const id = req.params.id;
    const {
         user_id, workshop_id, booking_date, booking_time, is_deleted
    } = req.body;
    try {
      const result = await workshop_bookings.updateworkshop_bookings(
        id, user_id, workshop_id, booking_date, booking_time, is_deleted
      );
      return res.status(200).json(result.rows);
    } catch (error) {
      throw error;
    }
  };
  const workshop = async (req, res) => {
    const workshop_id = req.params.workshop_id;
    try {
      const result = await workshop_bookings.workshop(workshop_id);
      return res.status(200).json(result.rows);
    } catch (error) {
      throw error;
    }
  };
  

module.exports = {
  getworkshop_bookings,
  getworkshop_bookingsId,
  Newworkshop_bookings,
  deleteworkshop_bookings,
  updateworkshop_bookings,
  workshop}
