const db = require("../lib/db");

function getAllShop() {
  return db.query("SELECT * FROM workshops WHERE is_deleted = false");
}

function getShopid(workshop_id) {
  const queryText =
    "SELECT * FROM workshops WHERE workshop_id = $1 AND is_deleted = false";
  const value = [workshop_id];
  return db.query(queryText, value);
}

function newShop(
  workshop_name,
  workshop_dis,
  workshop_title,
  workshop_start,
  workshop_end
) {
  const queryText =
    "INSERT INTO workshops (workshop_name, workshop_dis, workshop_title, workshop_start, workshop_end) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const values = [
    workshop_name,
    workshop_dis,
    workshop_title,
    workshop_start,
    workshop_end,
  ];
  return db.query(queryText, values);
}

async function deleteShop(workshop_id) {
  const queryText =
    "UPDATE workshops SET is_deleted = true WHERE workshop_id = $1 AND is_deleted = false RETURNING *";
  const values = [workshop_id];

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

// function updateShop(
//   workshop_id,
//   workshop_name,
//   workshop_dis,
//   workshop_title,
//   workshop_start,
//   workshop_end,
//   is_deleted
// ) {
//   const queryText =
//     "UPDATE workshops SET workshop_name = $2, workshop_dis = $3, workshop_title = $4, workshop_start = $5, workshop_end = $6,is_deleted=$7 WHERE workshop_id  = $1  RETURNING *";
//   const value = [
//     workshop_id,
//     workshop_name,
//     workshop_dis,
//     workshop_title,
//     workshop_start,
//     workshop_end,
//     is_deleted,
//   ];
//   return db.query(queryText, value);
// }
function updateShop(
  workshop_id,
  workshop_name,
  workshop_dis,
  workshop_title,
  workshop_start,
  workshop_end,
  is_deleted
) {
  const queryText = `
    UPDATE workshops 
    SET 
      workshop_name = COALESCE($2, workshop_name),
      workshop_dis = COALESCE($3, workshop_dis),
      workshop_title = COALESCE($4, workshop_title),
      workshop_start = COALESCE($5, workshop_start),
      workshop_end = COALESCE($6, workshop_end),
      is_deleted = COALESCE($7, is_deleted)
    WHERE 
      workshop_id = $1 
    RETURNING *`;

  const values = [
    workshop_id,
    workshop_name,
    workshop_dis,
    workshop_title,
    workshop_start,
    workshop_end,
    is_deleted,
  ];

  return db.query(queryText, values);
}


module.exports = {
  getAllShop,
  getShopid,
  newShop,
  deleteShop,
  updateShop,
};
