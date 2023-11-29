const db = require("../lib/db");

function getAllContact() {
  return db.query(
    "SELECT *, sendertype FROM contacts WHERE is_deleted = false AND sendertype = 'user' "
  );
}

function getContactid(contact_id) {
  const queryText =
    "SELECT * FROM contacts WHERE contact_id = $1 AND is_deleted = false";
  const value = [contact_id];
  return db.query(queryText, value);
}

function getCommentUser_di(user_id) {
  const queryText = "SELECT * FROM contacts WHERE user_id = $1";
  const value = [user_id];
  return db.query(queryText, value);
}

function NewContact(user_id, contact_name, contact_email, contact_message) {
  const queryText =
    "INSERT INTO contacts (user_id, contact_name, contact_email, contact_message) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [user_id, contact_name, contact_email, contact_message];
  return db.query(queryText, values);
}

async function deleteContact(contact_id) {
  const queryText =
    "UPDATE contacts SET is_deleted = true WHERE contact_id = $1 AND is_deleted = false RETURNING *";
  const values = [contact_id];

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

function updateContact(
  contact_id,
  user_id,
  contact_name,
  contact_email,
  contact_message,
  is_deleted
) {
  const queryText = `
      UPDATE contacts 
      SET 
      user_id = COALESCE($2, user_id), 
      contact_name = COALESCE($3, contact_name), 
      contact_email = COALESCE($4, contact_email), 
      contact_message = COALESCE($5, contact_message),
      is_deleted = COALESCE($6, is_deleted)
    

      WHERE 
      contact_id = $1 
      RETURNING *`;

  const values = [
    contact_id,
    user_id,
    contact_name,
    contact_email,
    contact_message,
    is_deleted,
  ];
  return db.query(queryText, values);
}

// const db = require('../your-db-connection-file'); // Adjust this to your database connection file

function getAllUserMessages() {
  return db.query(
    "SELECT *, sendertype FROM contacts WHERE is_deleted = false AND sendertype = 'admin'"
  );
}
function getAllAdminMessages() {
  return db.query(
    "SELECT *, sendertype FROM contacts WHERE is_deleted = false AND sendertype = 'user'"
  );
}

function addMessage(
  user_id,
  contact_name,
  contact_email,
  contact_message,
  sendertype
) {
  try {
    const queryText = `
  INSERT INTO contacts(user_id,contact_name, contact_email, contact_message, sendertype)
  VALUES($1, $2, $3, $4, $5)
  RETURNING *`;
    const result = [
      user_id,
      contact_name,
      contact_email,
      contact_message,
      sendertype,
    ];
    return db.query(queryText, result);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getAllContact,
  NewContact,
  getContactid,
  getCommentUser_di,
  deleteContact,
  updateContact,
  addMessage,
  getAllAdminMessages,
  getAllUserMessages,
};
