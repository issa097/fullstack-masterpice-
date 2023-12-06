const db = require("../lib/db");
const jwt = require("jsonwebtoken");
const key = "issa";
const bcrypt = require("bcrypt");

function getAllData() {
  return db.query("SELECT * FROM users  WHERE is_deleted=false");
}
function getUser(user_id) {
  const queryText =
    "SELECT * FROM users WHERE user_id = $1 AND is_deleted = false";
  const value = [user_id];
  return db.query(queryText, value);
}

const getUserById = async (user_id) => {
  const queryText = 'SELECT * FROM users WHERE user_id = $1';
  const values = [user_id];
  const result = await db.query(queryText, values);
  return result.rows[0]; // Assuming user_id is unique, so only one row is expected
};

function getEmail(email) {
  const queryText = "SELECT * FROM users WHERE email = $1";
  const value = [email];
  return db.query(queryText, value);
}
function getEmailAdmin(email) {
  const queryText = "SELECT * FROM users WHERE email = $1";
  const value = [email];
  return db.query(queryText, value);
}
// function newUser(username, email, password) {
//   const queryText =
//     "INSERT INTO users (username, email, password) VALUES ($1,$2,$3)";
//   const values = [username, email, password];
//   return db.query(queryText, values);
// }

function newUser(username, email, password, role) {
  // Hash the password before inserting it into the database
  return bcrypt.hash(password, 10).then((hashedPassword) => {
    const queryText =
      "INSERT INTO users (username, email, password , role)  VALUES ($1, $2, $3 ,$4) ";
    const values = [username, email, hashedPassword, role];
    return db.query(queryText, values);
  });
}

function deleteUser(user_id) {
  const queryText = "UPDATE users SET is_deleted = true WHERE user_id = $1";
  const value = [user_id];
  return db.query(queryText, value);
}

// function updateUser(user_id, username, email, password) {
//   const queryText =
//     "UPDATE users  SET username = $2, email = $3, password = $4  WHERE user_id = $1   RETURNING * ";
//   const value = [user_id, username, email, password];
//   return db.query(queryText, value);
// }
function updateUser(
  user_id,
  username,
  email,
  
  user_img,
  phone_number,
  birthday
) {
  const queryText = `
    UPDATE users 
    SET 
      username = COALESCE($2, username), 
      email = COALESCE($3, email), 
     
      user_img = COALESCE($4, user_img),
      phone_number = COALESCE($5, phone_number),
      birthday = COALESCE($6, birthday)
    WHERE 
      user_id = $1 
    RETURNING *`;

  const values = [
    user_id,
    username,
    email,
    
    user_img,
    phone_number,
    birthday,
  ];
  return db.query(queryText, values);
}

const updatePassword = async (user_id, hashedPassword) => {
  const queryText = `
    UPDATE users 
    SET 
      password = $2
    WHERE 
      user_id = $1 
    RETURNING *`;

  const values = [user_id, hashedPassword];
  return db.query(queryText, values);
};

function decodeToken(token, key) {
  let userData = {};
  jwt.verify(token, key, (err, decoded) => {
    // console.log("token");
    // console.log(token);
    // console.log(key);
    // console.log(decoded);
    // console.log("decoded");
    userData = decoded;
    return decoded;
  });

  return userData;
}
function loginUser(user_id, email, password) {
  const queryText =
    "UPDATE users  SET  email = $3, password = $4  WHERE user_id = $1";
  const value = [user_id, email, password];
  return db.query(queryText, value);
}

async function UserProfile(user_id) {
  const queryText =
    "SELECT  workshops.workshop_name as workshop_name, workshops.workshop_dis as workshop_dis, workshops.workshop_title as workshop_title ,workshops.workshop_start as workshop_start,workshops.workshop_end as workshop_end " +
    "FROM workshop_bookings " +
    "JOIN workshops ON workshop_bookings.workshop_id = workshops.workshop_id " +
    "WHERE (user_id = $1 )";
  const values = [user_id];

  return db.query(queryText, values);
}

module.exports = {
  getAllData,
  newUser,
  getUser,
  deleteUser,
  updateUser,
  getEmail,
  decodeToken,
  loginUser,
  UserProfile,
  updatePassword,
  getUserById,
  getEmailAdmin
};
