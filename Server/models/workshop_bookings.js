const db = require("../lib/db");

function getworkshop_bookings() {
  return db.query("SELECT * FROM workshop_bookings WHERE is_deleted = false");
}

function getworkshop_bookingsId(id) {
  const queryText =
    "SELECT * FROM workshop_bookings WHERE id = $1 AND is_deleted = false";
  const value = [id];
  return db.query(queryText, value);
}

function Newworkshop_bookings(user_id, workshop_id) {
  const queryText =
    "INSERT INTO workshop_bookings (user_id, workshop_id) VALUES ($1, $2) RETURNING *";
  const values = [user_id, workshop_id];
  return db.query(queryText, values);
}

function workshop(workshop_id) {
  const queryText =
    "SELECT * FROM workshop_bookings WHERE workshop_id = $1 AND is_deleted = false";
  const value = [workshop_id];
  return db.query(queryText, value);
}

async function deleteworkshop_bookings(id) {
  const queryText =
    "UPDATE workshop_bookings SET is_deleted = true WHERE id = $1 AND is_deleted = false RETURNING *";
  const values = [id];

  try {
    const result = await db.query(queryText, values);

    if (result.rowCount === 0) {
      throw new Error("Product not found or already deleted.");
    }

    return true; // Return true to indicate a successful deletion
  } catch (error) {
    throw error;
  }
}

function updateworkshop_bookings(
  id,
  user_id,
  workshop_id,
  booking_date,
  booking_time,
  is_deleted
) {
  const queryText = `
      UPDATE workshop_bookings 
      SET 
      user_id = COALESCE($2, user_id), 
      workshop_id = COALESCE($3, workshop_id), 
      booking_date = COALESCE($4, booking_date), 
      booking_time = COALESCE($5, booking_time), 
     
        is_deleted = COALESCE($6, is_deleted)
      WHERE 
      id = $1 
      RETURNING *`;

  const values = [
    id,
    user_id,
    workshop_id,
    booking_date,
    booking_time,
    is_deleted,
  ];
  return db.query(queryText, values);
}

module.exports = {
  getworkshop_bookings,
  getworkshop_bookingsId,
  Newworkshop_bookings,
  deleteworkshop_bookings,
  workshop,
  updateworkshop_bookings,
};
